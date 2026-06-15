import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowRight, Download, Sparkles } from 'lucide-react'
import { useI18n } from '../i18n/context'
import { Button } from '../components/ui/Button'
import { GlassCard } from '../components/ui/GlassCard'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ServiceCard } from '../components/ui/ServiceCard'
import { ParticleBackground } from '../components/ui/ParticleBackground'
import { projects } from '../data/projects'
import { services } from '../data/services'
import { Badge } from '../components/ui/Badge'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Husein Barkah Pambudi — Building Digital Experiences for UMKM' },
      { name: 'description', content: 'I help businesses grow with modern landing pages, digital solutions, and AI-powered strategies. Digital Business student based in Sumbawa, Indonesia.' },
      { property: 'og:title', content: 'Husein Barkah Pambudi — Building Digital Experiences for UMKM' },
      { property: 'og:description', content: 'I help businesses grow with modern landing pages, digital solutions, and AI-powered strategies.' },
    ],
  }),
  component: HomePage,
})

function HomePage() {
  const { t, locale } = useI18n()

  return (
    <div>
      {/* === HERO === */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden glow-horizon">
        {/* Particle Background */}
        <div className="absolute inset-0 z-0">
          <ParticleBackground />
        </div>

        {/* Radial glow */}
        <div className="absolute inset-0 bg-radial-glow z-0" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Inline avatar + greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-accent/30">
              <img src="/images/profile-photo.jpg" alt="Husein Barkah" className="w-full h-full object-cover" />
            </div>
            <span className="text-sm text-foreground-muted">{t.hero.greeting}</span>
            <span className="text-xs text-foreground-subtle px-2 py-0.5 rounded-pill glass border border-glass-border">
              {t.hero.role}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6"
          >
            {t.hero.headline}{' '}
            <em className="italic text-gradient">{t.hero.headlineAccent}</em>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg md:text-xl text-foreground-muted max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t.hero.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Button as="link" to="/projects" variant="primary" size="lg" iconRight={<ArrowRight size={18} />}>
              {t.hero.viewProjects}
            </Button>
            <Button as="link" to="/contact" variant="secondary" size="lg">
              {t.hero.hireMe}
            </Button>
            <Button
              as="a"
              href="/husein-cv.pdf"
              target="_blank"
              download
              variant="ghost"
              size="lg"
              icon={<Download size={18} />}
            >
              {t.hero.downloadCV}
            </Button>
          </motion.div>
        </div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-[10%] hidden lg:block z-0"
        >
          <div className="glass rounded-card p-3 border border-glass-border">
            <Sparkles size={20} className="text-accent" />
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 right-[12%] hidden lg:block z-0"
        >
          <div className="glass rounded-card p-3 border border-glass-border font-mono text-xs text-accent">
            {'<AI />'}
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [-8, 12, -8] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/3 left-[15%] hidden lg:block z-0"
        >
          <div className="glass rounded-card p-3 border border-glass-border">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-accent-purple animate-spin-slow" />
          </div>
        </motion.div>
      </section>

      {/* === ABOUT PREVIEW === */}
      <section className="section-padding px-6 bg-grid">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading label={t.about.label} title={t.about.title} accent={t.about.titleAccent} />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-foreground-muted leading-relaxed max-w-2xl mx-auto mb-8"
          >
            {t.about.bio1}
          </motion.p>
          <Button as="link" to="/about" variant="secondary" iconRight={<ArrowRight size={16} />}>
            {t.common.learnMore}
          </Button>
        </div>
      </section>

      {/* === SERVICES PREVIEW === */}
      <section className="section-padding px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading label={t.services.label} title={t.services.title} accent={t.services.titleAccent} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button as="link" to="/services" variant="ghost" iconRight={<ArrowRight size={16} />}>
              {t.common.viewAll}
            </Button>
          </div>
        </div>
      </section>

      {/* === PROJECTS PREVIEW === */}
      <section className="section-padding px-6 bg-grid">
        <div className="max-w-6xl mx-auto">
          <SectionHeading label={t.projects.label} title={t.projects.title} accent={t.projects.titleAccent} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <GlassCard key={project.id} delay={i * 0.1}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-foreground-subtle">{project.number}</span>
                    <Badge>{project.category}</Badge>
                  </div>
                  <h3 className="font-display text-xl text-foreground">
                    {locale === 'id' && project.titleId ? project.titleId : project.title}
                  </h3>
                  <p className="text-sm text-foreground-muted">
                    {locale === 'id' && project.descriptionId ? project.descriptionId : project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-hover transition-colors"
                  >
                    {t.projects.viewProject} <ArrowRight size={14} />
                  </Link>
                </div>
              </GlassCard>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button as="link" to="/projects" variant="secondary" iconRight={<ArrowRight size={16} />}>
              {t.projects.viewAll}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
