import { createFileRoute, Outlet, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { loginAdmin, verifyAuth } from '../server/auth'
import { useServerFn } from '@tanstack/react-start'

export const Route = createFileRoute('/admin')({
  head: () => ({
    meta: [
      { name: 'robots', content: 'noindex, nofollow' }
    ]
  }),
  loader: async () => {
    const authStatus = await verifyAuth()
    return authStatus
  },
  component: AdminLayout,
})

function AdminLayout() {
  const { isAuthenticated } = Route.useLoaderData()
  const router = useRouter()
  const login = useServerFn(loginAdmin)
  
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-grid">
        <div className="glass rounded-card p-8 w-full max-w-md">
          <h1 className="text-2xl font-display mb-6 text-foreground">Admin Access</h1>
          {error && (
            <div className="bg-error/10 text-error px-4 py-3 rounded-badge text-sm mb-4 border border-error/20">
              {error}
            </div>
          )}
          <form 
            onSubmit={async (e) => {
              e.preventDefault();
              setIsSubmitting(true)
              setError('')
              try {
                const res = await login({ data: { password } })
                if (res.success) {
                  router.invalidate() // Reload loader data to show admin dashboard
                } else {
                  setError(res.error || 'Invalid password')
                }
              } catch (err) {
                setError('An error occurred during login')
              } finally {
                setIsSubmitting(false)
              }
            }}
          >
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-input bg-background-secondary border border-border text-foreground mb-4 outline-none focus:border-accent"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent text-white px-4 py-3 rounded-pill font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <Outlet />
      </div>
    </div>
  )
}

