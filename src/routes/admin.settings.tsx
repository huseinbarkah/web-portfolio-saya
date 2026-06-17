import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { changeAdminPassword } from '../server/auth'
import { useServerFn } from '@tanstack/react-start'
import { Save, AlertCircle, CheckCircle2 } from 'lucide-react'

export const Route = createFileRoute('/admin/settings')({
  component: AdminSettingsPage,
})

function AdminSettingsPage() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  
  const changePassword = useServerFn(changeAdminPassword)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (newPassword !== confirmPassword) {
      setStatus('error')
      setMessage('New passwords do not match')
      return
    }

    if (newPassword.length < 6) {
      setStatus('error')
      setMessage('New password must be at least 6 characters long')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const res = await changePassword({
        data: {
          currentPassword,
          newPassword
        }
      })
      
      if (res.success) {
        setStatus('success')
        setMessage('Password changed successfully')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      }
    } catch (err: any) {
      setStatus('error')
      setMessage(err.message || 'Failed to change password')
    }
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-display text-foreground mb-2">Account Settings</h1>
        <p className="text-foreground-muted">Update your admin password here to keep your account secure.</p>
      </div>

      <div className="glass rounded-card p-6 md:p-8 border border-glass-border">
        <h2 className="text-xl font-display text-foreground mb-6">Change Password</h2>
        
        {status === 'error' && (
          <div className="mb-6 p-4 rounded-badge bg-error/10 border border-error/20 flex items-start gap-3 text-error">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <p className="text-sm font-medium">{message}</p>
          </div>
        )}

        {status === 'success' && (
          <div className="mb-6 p-4 rounded-badge bg-success/10 border border-success/20 flex items-start gap-3 text-success">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
            <p className="text-sm font-medium">{message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground-muted">Current Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-input bg-background-secondary border border-border text-foreground outline-none focus:border-accent"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <div className="h-px w-full bg-border my-6" />

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground-muted">New Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-input bg-background-secondary border border-border text-foreground outline-none focus:border-accent"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground-muted">Confirm New Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-input bg-background-secondary border border-border text-foreground outline-none focus:border-accent"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent text-white px-6 py-3 rounded-pill font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Save size={16} />
              {status === 'loading' ? 'Saving...' : 'Save Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
