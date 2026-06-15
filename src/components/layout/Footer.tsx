import { Link } from '@tanstack/react-router'
import { Github, Linkedin, Instagram, Mail, ArrowUp } from 'lucide-react'
import { useI18n } from '../../i18n/context'

const socials = [
  { icon: Github, href: 'https://github.com/huseinbarkah', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/huseinbarkah', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com/huseinbarkah', label: 'Instagram' },
  { icon: Mail, href: 'mailto:huseinbarkah@example.com', label: 'Email' },
]

export function Footer() {
  const { t } = useI18n()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left — Brand */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Link to="/" className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center">
                <img src="/images/profile-photo.jpg" alt="Husein Barkah" className="w-full h-full object-cover" />
              </span>
              <span className="font-display text-lg text-foreground">Husein Barkah</span>
            </Link>
            <p className="text-xs text-foreground-subtle">{t.footer.builtWith}</p>
          </div>

          {/* Center — Socials */}
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-pill glass border border-glass-border flex items-center justify-center text-foreground-muted hover:text-foreground hover:border-glass-border-hover transition-all duration-fast"
                aria-label={label}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          {/* Right — Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
          >
            {t.footer.backToTop}
            <ArrowUp size={14} />
          </button>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center">
          <p className="text-xs text-foreground-subtle">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
