import { createServerFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'
import { z } from 'zod'
import { supabase } from './supabase'

export interface BlogPost {
  id: string
  title: string
  slug: string
  category: string
  content: string // Markdown
  thumbnail?: string
  created_at: string
  updated_at: string
}

// We map from snake_case (Supabase) to camelCase if needed, but it's simpler to just adapt the frontend to expect created_at, or map it here.
// For backwards compatibility with the current frontend components, we'll map created_at to createdAt
export interface FrontendBlogPost {
  id: string
  title: string
  slug: string
  category: string
  content: string
  thumbnail?: string
  createdAt: string
  updatedAt: string
}

function mapToFrontend(post: BlogPost): FrontendBlogPost {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    category: post.category,
    content: post.content,
    thumbnail: post.thumbnail,
    createdAt: post.created_at,
    updatedAt: post.updated_at
  }
}

export const getBlogPosts = createServerFn({ method: 'GET' })
  .handler(async () => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching posts from Supabase:', error)
      return []
    }
    
    return (data as BlogPost[]).map(mapToFrontend)
  })

export const getBlogPostBySlug = createServerFn({ method: 'GET' })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error || !data) {
      console.error('Error fetching post by slug:', error)
      return null
    }

    return mapToFrontend(data as BlogPost)
  })

const createPostSchema = z.object({
  title: z.string(),
  slug: z.string(),
  category: z.string(),
  content: z.string(),
  thumbnail: z.string().optional()
})

export const createBlogPost = createServerFn({ method: 'POST' })
  .validator((data: z.infer<typeof createPostSchema>) => createPostSchema.parse(data))
  .handler(async ({ data }) => {
    // Auth Check
    const sessionToken = getCookie('admin_session_token')
    if (sessionToken !== 'authenticated') {
      throw new Error('Unauthorized')
    }

    const { data: insertedData, error } = await supabase
      .from('blogs')
      .insert({
        title: data.title,
        slug: data.slug,
        category: data.category,
        content: data.content,
        thumbnail: data.thumbnail
      })
      .select()
      .single()

    if (error) {
      console.error('Error inserting post:', error)
      throw new Error(error.message)
    }

    return mapToFrontend(insertedData as BlogPost)
  })

const updatePostSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  category: z.string(),
  content: z.string(),
  thumbnail: z.string().optional()
})

export const updateBlogPost = createServerFn({ method: 'POST' })
  .validator((data: z.infer<typeof updatePostSchema>) => updatePostSchema.parse(data))
  .handler(async ({ data }) => {
    // Auth Check
    const sessionToken = getCookie('admin_session_token')
    if (sessionToken !== 'authenticated') {
      throw new Error('Unauthorized')
    }

    const { data: updatedData, error } = await supabase
      .from('blogs')
      .update({
        title: data.title,
        slug: data.slug,
        category: data.category,
        content: data.content,
        thumbnail: data.thumbnail,
        updated_at: new Date().toISOString()
      })
      .eq('id', data.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating post:', error)
      throw new Error(error.message)
    }

    return mapToFrontend(updatedData as BlogPost)
  })

export const deleteBlogPost = createServerFn({ method: 'POST' })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    // Auth Check
    const sessionToken = getCookie('admin_session_token')
    if (sessionToken !== 'authenticated') {
      throw new Error('Unauthorized')
    }

    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting post:', error)
      throw new Error(error.message)
    }

    return { success: true }
  })
