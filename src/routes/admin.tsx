import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/admin')({
  head: () => ({
    meta: [
      { name: 'robots', content: 'noindex, nofollow' }
    ]
  }),
  component: AdminLayout,
})

function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-grid">
        <div className="glass rounded-card p-8 w-full max-w-md">
          <h1 className="text-2xl font-display mb-6 text-foreground">Admin Access</h1>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (password === 'admin123') setIsAuthenticated(true)
              else alert('Wrong password')
            }}
          >
            <input
              type="password"
              className="w-full px-4 py-3 rounded-input bg-background-secondary border border-border text-foreground mb-4 outline-none focus:border-accent"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button 
              type="submit"
              className="w-full bg-accent text-white px-4 py-3 rounded-pill font-medium hover:opacity-90 transition-opacity"
            >
              Login
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
