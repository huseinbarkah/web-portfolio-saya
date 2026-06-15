import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { createBlogPost } from '../server/blog'
import { useServerFn } from '@tanstack/react-start'
import slugify from 'slugify'

export const Route = createFileRoute('/admin/blog/new')({
  component: NewBlogPage,
})

function NewBlogPage() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [content, setContent] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  
  const createPost = useServerFn(createBlogPost)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const slug = slugify(title, { lower: true, strict: true })
      await createPost({
        data: {
          title,
          slug,
          category,
          content,
          thumbnail: thumbnail || undefined
        }
      })
      navigate({ to: '/admin' })
    } catch (err) {
      alert('Error creating post: ' + err)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display text-foreground">Write New Post</h1>
        <Link to="/admin" className="text-sm text-foreground-muted hover:text-foreground">
          Cancel
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground-muted">Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-input bg-background-secondary border border-border text-foreground outline-none focus:border-accent"
            placeholder="E.g. How to use AI in Web Development"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground-muted">Category</label>
            <input
              type="text"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-input bg-background-secondary border border-border text-foreground outline-none focus:border-accent"
              placeholder="E.g. Technology"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground-muted">Thumbnail URL (Optional)</label>
            <input
              type="url"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              className="w-full px-4 py-3 rounded-input bg-background-secondary border border-border text-foreground outline-none focus:border-accent"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground-muted">Content (Markdown)</label>
          <textarea
            required
            rows={15}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-3 rounded-input bg-background-secondary border border-border text-foreground outline-none focus:border-accent font-mono text-sm resize-y"
            placeholder="Write your markdown content here..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent text-white px-4 py-3 rounded-pill font-medium hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? 'Publishing...' : 'Publish Post'}
        </button>
      </form>
    </div>
  )
}
