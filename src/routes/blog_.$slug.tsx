import { createFileRoute, Link } from '@tanstack/react-router'
import { getBlogPostBySlug, getBlogPosts } from '../server/blog'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Tag, Clock, Share2, Copy, CheckCheck, BookOpen } from 'lucide-react'
import { useI18n } from '../i18n/context'
import { useState, useMemo } from 'react'
import { Badge } from '../components/ui/Badge'

export const Route = createFileRoute('/blog_/$slug')({
  loader: async ({ params }) => {
    const post = await getBlogPostBySlug({ data: params.slug })
    if (!post) {
      throw new Error('Post not found')
    }
    // Also fetch recent posts for "Read More" section
    const allPosts = await getBlogPosts()
    const relatedPosts = allPosts
      .filter(p => p.slug !== params.slug)
      .slice(0, 3)
    return { post, relatedPosts }
  },
  head: ({ loaderData }) => {
    const title = loaderData?.post?.title ?? 'Blog Post'
    return {
      meta: [
        { title: `${title} — Husein Barkah Pambudi` },
        { name: 'description', content: title },
        { property: 'og:title', content: title },
        { property: 'og:type', content: 'article' },
      ],
    }
  },
  errorComponent: () => (
    <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
          <BookOpen size={28} className="text-accent" />
        </div>
        <h1 className="text-4xl font-display mb-4">Post Not Found</h1>
        <p className="text-foreground-muted mb-6">Artikel yang kamu cari tidak ditemukan.</p>
        <Link to="/blog" className="text-accent hover:underline flex items-center gap-2 justify-center">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>
    </div>
  ),
  component: BlogPostPage,
})

function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const headings: { id: string; text: string; level: number }[] = []
  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2].trim()
    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
    headings.push({ id, text, level: match[1].length })
  }
  return headings
}

function BlogPostPage() {
  const { post, relatedPosts } = Route.useLoaderData()
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)

  const readingTime = useMemo(() => estimateReadingTime(post.content), [post.content])
  const headings = useMemo(() => extractHeadings(post.content), [post.content])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          url: window.location.href,
        })
      } catch {
        // User cancelled share
      }
    } else {
      handleCopyLink()
    }
  }

  return (
    <article className="min-h-screen pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back navigation */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-accent mb-10 transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {t.blogDetail.backToBlog}
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mb-12"
        >
          {/* Meta badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge color="var(--color-accent)">
              <Tag size={12} className="mr-1" />
              {post.category}
            </Badge>
            <div className="flex items-center gap-1.5 text-sm text-foreground-subtle">
              <Calendar size={14} />
              <span>{new Date(post.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-foreground-subtle">
              <Clock size={14} />
              <span>{readingTime} {t.blog.minRead}</span>
            </div>
          </div>

          {/* Title (H1) */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-foreground leading-tight mb-6">
            {post.title}
          </h1>

          {/* Share button */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-pill glass border border-glass-border text-sm text-foreground-muted hover:text-foreground hover:border-accent/50 transition-all cursor-pointer"
            >
              <Share2 size={14} />
              {t.blogDetail.share}
            </button>
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-pill glass border border-glass-border text-sm text-foreground-muted hover:text-foreground hover:border-accent/50 transition-all cursor-pointer"
            >
              {copied ? <CheckCheck size={14} className="text-success" /> : <Copy size={14} />}
              {copied ? t.blogDetail.copied : t.blogDetail.copyLink}
            </button>
          </div>
        </motion.header>

        {/* Thumbnail */}
        {post.thumbnail && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl w-full h-[300px] md:h-[420px] rounded-2xl overflow-hidden mb-12 border border-glass-border"
          >
            <img 
              src={post.thumbnail} 
              alt={post.title} 
              className="w-full h-full object-cover" 
            />
          </motion.div>
        )}

        {/* Content Layout: Article + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-10 lg:gap-16 w-full">
          
          {/* Main Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full"
          >
            {/* Markdown content with custom prose styling */}
            <div className="blog-prose w-full">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => {
                    const text = String(children)
                    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
                    return <h2 id={id}>{children}</h2>
                  },
                  h3: ({ children }) => {
                    const text = String(children)
                    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
                    return <h3 id={id}>{children}</h3>
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Divider */}
            <div className="w-full my-12">
              <div className="h-px bg-gradient-to-r from-transparent via-glass-border-hover to-transparent" />
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="w-full"
            >
              {/* Share & Engage CTA */}
              <div className="glass rounded-card p-8 border border-glass-border mb-10">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-display text-foreground">
                    {t.blogDetail.ctaTitle}
                  </h3>
                  <p className="text-sm text-foreground-muted max-w-md mx-auto">
                    {t.blogDetail.ctaDescription}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      onClick={handleShare}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-pill bg-accent text-white text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      <Share2 size={14} />
                      {t.blogDetail.shareArticle}
                    </button>
                    <button
                      onClick={handleCopyLink}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-pill glass border border-glass-border text-sm text-foreground-muted hover:text-foreground hover:border-accent/50 transition-all cursor-pointer"
                    >
                      {copied ? <CheckCheck size={14} className="text-success" /> : <Copy size={14} />}
                      {copied ? t.blogDetail.copied : t.blogDetail.copyLink}
                    </button>
                  </div>
                </div>
              </div>

              {/* Related Posts - Mobile Only */}
              {relatedPosts.length > 0 && (
                <div className="block lg:hidden">
                  <h3 className="text-lg font-display text-foreground mb-6">
                    {t.blogDetail.readMore}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedPosts.map((related) => (
                      <Link
                        key={related.id}
                        to="/blog/$slug"
                        params={{ slug: related.slug }}
                        className="group block"
                      >
                        <div className="glass rounded-card p-5 border border-glass-border hover:border-accent/50 transition-colors h-full flex flex-col">
                          {related.thumbnail && (
                            <div className="w-full h-28 rounded-lg overflow-hidden mb-3">
                              <img 
                                src={related.thumbnail} 
                                alt={related.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                              />
                            </div>
                          )}
                          <Badge className="mb-2 w-fit">{related.category}</Badge>
                          <h4 className="text-sm font-display text-foreground group-hover:text-accent transition-colors line-clamp-2 flex-1">
                            {related.title}
                          </h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Back to all posts */}
              <div className="mt-10 mb-8 text-center lg:text-left">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-accent transition-colors group"
                >
                  <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                  {t.blogDetail.viewAllPosts}
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Sidebar (Desktop Only) */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden lg:block w-full"
          >
            <div className="sticky top-32 flex flex-col gap-10">
              
              {/* Table of Contents */}
              {headings.length > 0 && (
                <div>
                  <p className="text-xs font-medium tracking-wider uppercase text-foreground-subtle mb-4">
                    {t.blogDetail.tableOfContents}
                  </p>
                  <nav className="flex flex-col gap-1.5 border-l border-glass-border pl-4">
                    {headings.map((heading) => (
                      <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className="text-sm text-foreground-subtle hover:text-accent transition-colors leading-snug"
                        style={{ paddingLeft: heading.level === 3 ? '12px' : '0' }}
                      >
                        {heading.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Related Posts Sidebar */}
              {relatedPosts.length > 0 && (
                <div>
                  <p className="text-xs font-medium tracking-wider uppercase text-foreground-subtle mb-4">
                    {t.blogDetail.readMore}
                  </p>
                  <div className="flex flex-col gap-4">
                    {relatedPosts.map((related) => (
                      <Link
                        key={related.id}
                        to="/blog/$slug"
                        params={{ slug: related.slug }}
                        className="group block"
                      >
                        <div className="glass rounded-card p-4 border border-glass-border hover:border-accent/50 transition-colors flex flex-col gap-2">
                          {related.thumbnail && (
                            <div className="w-full h-24 rounded-lg overflow-hidden shrink-0">
                              <img 
                                src={related.thumbnail} 
                                alt={related.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                              />
                            </div>
                          )}
                          <div>
                            <Badge className="mb-2 inline-flex scale-[0.85] origin-left">{related.category}</Badge>
                            <h4 className="text-sm font-display text-foreground group-hover:text-accent transition-colors line-clamp-2">
                              {related.title}
                            </h4>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        </div>
      </div>
    </article>
  )
}
