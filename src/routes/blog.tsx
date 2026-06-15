import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Search, Command, BookOpen, ArrowRight } from 'lucide-react'
import { useI18n } from '../i18n/context'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Badge } from '../components/ui/Badge'
import { getBlogPosts } from '../server/blog'
import { useState } from 'react'

export const Route = createFileRoute('/blog')({
  head: () => ({
    meta: [
      { title: 'Blog — Husein Barkah Pambudi' },
      { name: 'description', content: 'Handpicked insights on web development, AI, digital business, and technology for UMKM.' },
      { property: 'og:title', content: 'Blog — Husein Barkah Pambudi' },
    ],
  }),
  loader: async () => {
    const posts = await getBlogPosts()
    return { posts }
  },
  component: BlogPage,
})

const categories = [
  'All', 'Web Dev', 'AI', 'Digital Business', 'Tutorial',
  'UMKM', 'Productivity', 'Career', 'Tech',
]

function BlogPage() {
  const { t } = useI18n()
  const { posts } = Route.useLoaderData()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading label={t.blog.label} title={t.blog.title} accent={t.blog.titleAccent} />

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 mt-12">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Explore header */}
            <div className="glass rounded-card p-5 mb-6 border border-glass-border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-medium tracking-wider uppercase text-foreground-muted">{t.blog.explore}</p>
                  <h3 className="text-lg font-semibold text-foreground">{t.blog.library}</h3>
                </div>
                <div className="w-8 h-8 rounded-badge glass border border-glass-border flex items-center justify-center">
                  <BookOpen size={14} className="text-foreground-muted" />
                </div>
              </div>
              <p className="text-xs text-foreground-subtle">{t.blog.showing} {filteredPosts.length} {t.blog.posts}</p>
            </div>

            {/* Search */}
            <div className="glass rounded-card p-4 mb-6 border border-glass-border focus-within:border-accent/50 transition-colors">
              <div className="flex items-center gap-3 px-3 py-2 rounded-input bg-background-secondary border border-border focus-within:border-accent">
                <Search size={14} className="text-foreground-subtle" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.blog.search}
                  className="text-sm text-foreground bg-transparent border-none outline-none flex-1 placeholder:text-foreground-subtle"
                />
                <div className="flex items-center gap-0.5 text-foreground-subtle">
                  <Command size={12} />
                  <span className="text-xs font-mono">K</span>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="glass rounded-card p-5 border border-glass-border">
              <h4 className="text-xs font-medium tracking-wider uppercase text-foreground-muted mb-4">{t.blog.categories}</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="text-left"
                  >
                    <Badge 
                      className={selectedCategory === cat ? 'bg-accent/10' : 'hover:bg-white/5 transition-colors'}
                      color={selectedCategory === cat ? 'var(--color-accent)' : undefined}
                    >
                      {cat}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          </motion.aside>

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            {filteredPosts.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] glass rounded-card border border-glass-border">
                <div className="text-center space-y-4 p-8">
                  <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
                    <BookOpen size={28} className="text-accent" />
                  </div>
                  <h3 className="font-display text-2xl text-foreground">{t.blog.emptyTitle}</h3>
                  <p className="text-sm text-foreground-muted max-w-sm">{searchQuery ? "Tidak ada artikel yang cocok dengan pencarian Anda." : t.blog.emptyDescription}</p>
                </div>
              </div>
            ) : (
              filteredPosts.map((post, i) => (
                <Link 
                  key={post.id} 
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="block group"
                >
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass rounded-card p-6 border border-glass-border flex flex-col md:flex-row gap-6 hover:border-accent/50 transition-colors"
                  >
                    {post.thumbnail && (
                      <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0">
                        <img 
                          src={post.thumbnail} 
                          alt={post.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      </div>
                    )}
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge>{post.category}</Badge>
                        <span className="text-xs text-foreground-muted">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-xl font-display text-foreground group-hover:text-accent transition-colors mb-2">
                        {post.title}
                      </h3>
                      <div className="mt-auto flex items-center gap-2 text-sm text-accent font-medium pt-2">
                        {t.blog.readArticle} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
