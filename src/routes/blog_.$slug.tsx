import { createFileRoute, Link } from '@tanstack/react-router'
import { getBlogPostBySlug } from '../server/blog'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'

export const Route = createFileRoute('/blog_/$slug')({
  loader: async ({ params }) => {
    const post = await getBlogPostBySlug({ data: params.slug })
    if (!post) {
      throw new Error('Post not found')
    }
    return { post }
  },
  errorComponent: () => (
    <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-display mb-4">Post Not Found</h1>
      <Link to="/blog" className="text-accent hover:underline flex items-center gap-2">
        <ArrowLeft size={16} /> Back to Blog
      </Link>
    </div>
  ),
  component: BlogPostPage,
})

function BlogPostPage() {
  const { post } = Route.useLoaderData()

  return (
    <article className="min-h-screen pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>
        
        {post.thumbnail && (
          <div className="w-full h-[400px] rounded-2xl overflow-hidden mb-8 border border-glass-border">
            <img 
              src={post.thumbnail} 
              alt={post.title} 
              className="w-full h-full object-cover" 
            />
          </div>
        )}

        <div className="flex items-center gap-4 text-sm text-foreground-subtle mb-6">
          <div className="flex items-center gap-1.5">
            <Tag size={14} />
            <span className="bg-accent/10 text-accent px-2 py-0.5 rounded-full text-xs font-medium">
              {post.category}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-display text-foreground mb-12 leading-tight">
          {post.title}
        </h1>

        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-a:text-accent hover:prose-a:text-accent-hover prose-img:rounded-xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  )
}
