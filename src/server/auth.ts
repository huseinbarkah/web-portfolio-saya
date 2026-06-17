import { createServerFn } from '@tanstack/react-start'
import { getCookie, setCookie, deleteCookie } from '@tanstack/react-start/server'
import { z } from 'zod'
import { supabase } from './supabase'
import bcrypt from 'bcryptjs'

const SESSION_COOKIE = 'admin_session_token'
const DEFAULT_PASSWORD = 'admin' // Initial password if not set

// Utility to get the hashed password from the database
async function getAdminPasswordHash(): Promise<string> {
  const { data, error } = await supabase
    .from('settings')
    .select('value')
    .eq('key', 'admin_password')
    .single()

  if (error || !data) {
    // If not found (e.g. first run), we can fallback to hashing the default password.
    // In a real scenario, you'd insert this default hash into the DB.
    // Note: If the 'settings' table doesn't exist, this will fail gracefully.
    return bcrypt.hashSync(DEFAULT_PASSWORD, 10)
  }

  return data.value
}

// Ensure the user is authenticated via cookie
export const verifyAuth = createServerFn({ method: 'GET' })
  .handler(async () => {
    const sessionToken = getCookie(SESSION_COOKIE)
    if (sessionToken === 'authenticated') {
      return { isAuthenticated: true }
    }
    return { isAuthenticated: false }
  })

const loginSchema = z.object({
  password: z.string()
})

// Login function
export const loginAdmin = createServerFn({ method: 'POST' })
  .validator((data: z.infer<typeof loginSchema>) => loginSchema.parse(data))
  .handler(async ({ data }) => {
    const hash = await getAdminPasswordHash()
    
    const isValid = bcrypt.compareSync(data.password, hash)
    
    if (isValid) {
      setCookie(SESSION_COOKIE, 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
      })
      return { success: true }
    }
    
    return { success: false, error: 'Invalid password' }
  })

// Logout function
export const logoutAdmin = createServerFn({ method: 'POST' })
  .handler(async () => {
    deleteCookie(SESSION_COOKIE, { path: '/' })
    return { success: true }
  })

const changePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(6, 'Password must be at least 6 characters')
})

// Change password function
export const changeAdminPassword = createServerFn({ method: 'POST' })
  .validator((data: z.infer<typeof changePasswordSchema>) => changePasswordSchema.parse(data))
  .handler(async ({ data }) => {
    // 1. Verify session
    const sessionToken = getCookie(SESSION_COOKIE)
    if (sessionToken !== 'authenticated') {
      throw new Error('Unauthorized')
    }

    // 2. Verify current password
    const hash = await getAdminPasswordHash()
    const isValid = bcrypt.compareSync(data.currentPassword, hash)
    if (!isValid) {
      throw new Error('Current password is incorrect')
    }

    // 3. Hash new password and save
    const newHash = bcrypt.hashSync(data.newPassword, 10)
    
    // Check if the setting exists first
    const { data: existing } = await supabase
      .from('settings')
      .select('id')
      .eq('key', 'admin_password')
      .single()

    if (existing) {
      const { error } = await supabase
        .from('settings')
        .update({ value: newHash })
        .eq('key', 'admin_password')
      
      if (error) throw new Error('Failed to update password: ' + error.message)
    } else {
      const { error } = await supabase
        .from('settings')
        .insert({ key: 'admin_password', value: newHash })
      
      if (error) throw new Error('Failed to create password setting. Make sure the settings table exists.')
    }

    return { success: true }
  })
