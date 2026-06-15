import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Github, Linkedin, Instagram, MapPin, GraduationCap } from 'lucide-react'
import { useI18n } from '../i18n/context'
import { SectionHeading } from '../components/ui/SectionHeading'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'About — Husein Barkah Pambudi' },
      { name: 'description', content: 'Digital Business student at Universitas Teknologi Sumbawa, passionate about bridging technology and small businesses through web development and AI solutions.' },
      { property: 'og:title', content: 'About — Husein Barkah Pambudi' },
      { property: 'og:description', content: 'Digital Business student & tech enthusiast based in Sumbawa, Indonesia.' },
    ],
  }),
  component: AboutPage,
})

const socials = [
  { icon: Github, href: 'https://github.com/huseinbarkah', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/huseinbarkah', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com/huseinbarkah', label: 'Instagram' },
]

function AboutPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <div>
            <SectionHeading label={t.about.label} title={t.about.title} accent={t.about.titleAccent} align="left" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-5 text-foreground-muted leading-relaxed"
            >
              <p>{t.about.bio1}</p>
              <p>{t.about.bio2}</p>
              <p className="text-foreground font-medium italic">{t.about.bio3}</p>
            </motion.div>

            {/* Info pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-pill glass border border-glass-border text-sm text-foreground-muted">
                <MapPin size={14} className="text-accent" />
                Sumbawa, Indonesia
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-pill glass border border-glass-border text-sm text-foreground-muted">
                <GraduationCap size={14} className="text-accent-purple" />
                UTS — Digital Business
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex items-center gap-3 mt-8"
            >
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-pill glass border border-glass-border flex items-center justify-center text-foreground-muted hover:text-foreground hover:border-glass-border-hover transition-all duration-fast"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow behind */}
              <div className="absolute inset-0 blur-3xl bg-gradient-to-br from-accent/20 to-accent-purple/20 rounded-card" />

              {/* Photo frame */}
              <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-card overflow-hidden border-2 border-glass-border glass">
                <img
                  src="/images/profile-photo.jpg"
                  alt="Husein Barkah Pambudi"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative corner */}
              <div className="absolute -bottom-3 -right-3 w-20 h-20 border-r-2 border-b-2 border-accent/30 rounded-br-card" />
              <div className="absolute -top-3 -left-3 w-20 h-20 border-l-2 border-t-2 border-accent-purple/30 rounded-tl-card" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
