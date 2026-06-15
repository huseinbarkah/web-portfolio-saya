import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Badge } from './Badge'
import { useI18n } from '../../i18n/context'
import type { Project } from '../../data/projects'

interface ProjectCardProps {
  project: Project
  index: number
  viewProjectLabel: string
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { locale } = useI18n()
  const isEven = index % 2 === 0
  const title = locale === 'id' && project.titleId ? project.titleId : project.title
  const longDescription = locale === 'id' && project.longDescriptionId ? project.longDescriptionId : project.longDescription

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
        !isEven ? 'lg:direction-rtl' : ''
      }`}
    >
      {/* Info */}
      <div className={`space-y-5 ${!isEven ? 'lg:order-2' : ''}`}>
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-foreground-subtle">{project.number}</span>
          <span className="w-8 h-px bg-border" />
          <span className="text-xs font-medium tracking-wider uppercase text-foreground-muted">
            {project.category}
          </span>
        </div>

        <h3 className="font-display text-3xl md:text-4xl text-foreground">{title}</h3>

        <p className="text-foreground-muted leading-relaxed">{longDescription}</p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        {project.liveUrl && (
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 4 }}
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
          >
            View Project <ArrowRight size={16} />
          </motion.a>
        )}
      </div>

      {/* Thumbnail */}
      <div className={`${!isEven ? 'lg:order-1' : ''}`}>
        <motion.div
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
          className="glass rounded-card overflow-hidden relative group border border-glass-border shadow-card flex flex-col"
        >
          {/* Browser / Laptop Top Bar */}
          <div className="bg-background-secondary border-b border-glass-border px-4 py-3 flex items-center gap-2 relative">
            <div className="w-2.5 h-2.5 rounded-full bg-error/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-warning/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-success/80" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-1/3 max-w-[200px] h-4 rounded-full bg-background-tertiary/50" />
            </div>
          </div>

          <div className="aspect-[16/10] relative overflow-hidden bg-background">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent-purple/5 z-10 pointer-events-none" />
            <img
              src={project.thumbnail}
              alt={title}
              className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
              onError={(e) => {
                // Fallback if image doesn't load
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                target.parentElement!.querySelector('.fallback')?.classList.remove('hidden')
              }}
            />
            <div className="fallback hidden w-full h-full flex items-center justify-center text-foreground-subtle absolute inset-0">
              <div className="text-center space-y-3 p-8">
                <div className="w-16 h-16 mx-auto rounded-card bg-glass border border-glass-border flex items-center justify-center">
                  <span className="font-display text-2xl text-gradient">{project.number}</span>
                </div>
                <p className="font-display text-xl">{title}</p>
                <p className="text-xs text-foreground-subtle">{project.category}</p>
              </div>
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-normal z-20 pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
