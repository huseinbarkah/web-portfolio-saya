import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { getBlogPosts, deleteBlogPost } from '../server/blog'
import { logoutAdmin } from '../server/auth'
import { useServerFn } from '@tanstack/react-start'
import { Plus, Trash2, Settings, LogOut, Pencil } from 'lucide-react'

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
  loader: async () => {
    const posts = await getBlogPosts()
    return { posts }
  }
})

function AdminDashboard() {
  const { posts } = Route.useLoaderData()
  const router = useRouter()
  const deleteFn = useServerFn(deleteBlogPost)
  const logout = useServerFn(logoutAdmin)

  async function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this post?')) {
      await deleteFn({ data: id })
      router.invalidate()
    }
  }

  async function handleLogout() {
    await logout()
    router.invalidate()
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-display text-foreground">Blog Admin</h1>
        <div className="flex flex-wrap items-center gap-3">
          <Link 
            to="/admin/settings" 
            className="glass border border-glass-border text-foreground-muted hover:text-foreground px-4 py-2 rounded-pill font-medium text-sm flex items-center gap-2 hover:border-accent/50 transition-all"
          >
            <Settings size={16} /> Settings
          </Link>
          <button 
            onClick={handleLogout}
            className="glass border border-glass-border text-foreground-muted hover:text-error px-4 py-2 rounded-pill font-medium text-sm flex items-center gap-2 hover:border-error/50 transition-all cursor-pointer"
          >
            <LogOut size={16} /> Logout
          </button>
          <Link 
            to="/admin/blog/new" 
            className="bg-accent text-white px-4 py-2 rounded-pill font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Plus size={16} /> New Post
          </Link>
        </div>
      </div>

      <div className="glass rounded-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-background-secondary/50">
                <th className="p-4 text-sm font-medium text-foreground-muted">Title</th>
                <th className="p-4 text-sm font-medium text-foreground-muted">Category</th>
                <th className="p-4 text-sm font-medium text-foreground-muted">Date</th>
                <th className="p-4 text-sm font-medium text-foreground-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-foreground-muted">
                    No posts yet. Write your first blog post!
                  </td>
                </tr>
              ) : posts.map(post => (
                <tr key={post.id} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                  <td className="p-4 text-sm text-foreground font-medium">{post.title}</td>
                  <td className="p-4 text-sm text-foreground-subtle">{post.category}</td>
                  <td className="p-4 text-sm text-foreground-subtle">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <Link
                      to="/admin/blog/edit/$slug"
                      params={{ slug: post.slug }}
                      className="p-2 text-foreground-muted hover:text-accent transition-colors rounded-full hover:bg-accent/10"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </Link>
                    <button 
                      className="p-2 text-foreground-muted hover:text-error transition-colors rounded-full hover:bg-error/10"
                      onClick={() => handleDelete(post.id)}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
