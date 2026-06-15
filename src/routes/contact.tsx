import { createFileRoute } from '@tanstack/react-router'
import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Mail, Copy, Check, MessageCircle } from 'lucide-react'
import { useI18n } from '../i18n/context'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'
import { GlassCard } from '../components/ui/GlassCard'

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      { title: 'Contact — Husein Barkah Pambudi' },
      { name: 'description', content: 'Get in touch for project inquiries, collaborations, or just to say hello. Available via email, WhatsApp, and social media.' },
      { property: 'og:title', content: 'Contact — Husein Barkah Pambudi' },
    ],
  }),
  component: ContactPage,
})

const EMAIL = 'husein12332111@gmail.com'
const WA_NUMBER = '6282339265052'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.name.trim()) errors.name = 'Name is required'
  if (!data.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Invalid email'
  if (!data.subject.trim()) errors.subject = 'Subject is required'
  if (!data.message.trim()) errors.message = 'Message is required'
  else if (data.message.trim().length < 10) errors.message = 'Message too short'
  return errors
}

const contactLinks = [
  { icon: Mail, label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: MessageCircle, label: 'WhatsApp', value: '+62 823-3926-5052', href: `https://wa.me/${WA_NUMBER}` },
]

function ContactPage() {
  const { t } = useI18n()
  const [form, setForm] = useState<FormData>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [copied, setCopied] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validateForm(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // Open mailto
    const mailtoUrl = `mailto:${EMAIL}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )}`
    window.open(mailtoUrl, '_blank')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading label={t.contact.label} title={t.contact.title} accent={t.contact.titleAccent} />
        <p className="text-center text-foreground-muted max-w-xl mx-auto mb-12">{t.contact.description}</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form */}
          <GlassCard hover={false} padding="lg">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm text-foreground-muted mb-1.5">{t.contact.nameLabel}</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t.contact.namePlaceholder}
                  className={`w-full px-4 py-3 rounded-input bg-background-secondary border text-foreground text-sm outline-none transition-colors placeholder:text-foreground-subtle focus:border-accent ${errors.name ? 'border-error' : 'border-border'
                    }`}
                />
                {errors.name && <p className="text-xs text-error mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm text-foreground-muted mb-1.5">{t.contact.emailLabel}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t.contact.emailPlaceholder}
                  className={`w-full px-4 py-3 rounded-input bg-background-secondary border text-foreground text-sm outline-none transition-colors placeholder:text-foreground-subtle focus:border-accent ${errors.email ? 'border-error' : 'border-border'
                    }`}
                />
                {errors.email && <p className="text-xs text-error mt-1">{errors.email}</p>}
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm text-foreground-muted mb-1.5">{t.contact.subjectLabel}</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder={t.contact.subjectPlaceholder}
                  className={`w-full px-4 py-3 rounded-input bg-background-secondary border text-foreground text-sm outline-none transition-colors placeholder:text-foreground-subtle focus:border-accent ${errors.subject ? 'border-error' : 'border-border'
                    }`}
                />
                {errors.subject && <p className="text-xs text-error mt-1">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm text-foreground-muted mb-1.5">{t.contact.messageLabel}</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t.contact.messagePlaceholder}
                  className={`w-full px-4 py-3 rounded-input bg-background-secondary border text-foreground text-sm outline-none transition-colors resize-none placeholder:text-foreground-subtle focus:border-accent ${errors.message ? 'border-error' : 'border-border'
                    }`}
                />
                {errors.message && <p className="text-xs text-error mt-1">{errors.message}</p>}
              </div>

              <Button type="submit" variant="primary" size="lg" icon={<Send size={16} />} className="w-full">
                {t.contact.send}
              </Button>

              <AnimatePresence>
                {submitted && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-success text-center"
                  >
                    {t.contact.success}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </GlassCard>

          {/* Contact links */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium tracking-wider uppercase text-foreground-muted mb-6">{t.contact.orReachOut}</h3>

            {contactLinks.map((link, i) => (
              <GlassCard key={link.label} delay={i * 0.1} padding="sm">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-2"
                >
                  <div className="w-10 h-10 rounded-pill bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <link.icon size={18} className="text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{link.label}</p>
                    <p className="text-xs text-foreground-muted truncate">{link.value}</p>
                  </div>
                </a>
              </GlassCard>
            ))}

            {/* Copy email button */}
            <motion.button
              onClick={copyEmail}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-card glass border border-glass-border text-sm text-foreground-muted hover:text-foreground hover:border-glass-border-hover transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={16} className="text-success" />
                  {t.contact.copied}
                </>
              ) : (
                <>
                  <Copy size={16} />
                  {t.contact.copyEmail}
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}
