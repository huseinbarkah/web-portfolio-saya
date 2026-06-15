import { motion } from 'framer-motion'
import { Monitor, Brain, Megaphone } from 'lucide-react'
import { useI18n } from '../../i18n/context'
import type { Service } from '../../data/services'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Monitor,
  Brain,
  Megaphone,
}

interface ServiceCardProps {
  service: Service
  index: number
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const { locale } = useI18n()
  const Icon = iconMap[service.icon] || Monitor
  const title = locale === 'id' && service.titleId ? service.titleId : service.title
  const description = locale === 'id' && service.descriptionId ? service.descriptionId : service.description
  const deliverables = locale === 'id' && service.deliverablesId ? service.deliverablesId : service.deliverables

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="glass glass-hover rounded-card p-8 relative overflow-hidden group transition-all duration-normal"
    >
      {/* Number watermark */}
      <span className="absolute top-4 right-6 font-display text-6xl text-foreground/[0.03] select-none">
        {service.number}
      </span>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-card opacity-0 group-hover:opacity-100 transition-opacity duration-slow pointer-events-none"
        style={{ boxShadow: 'inset 0 0 60px rgba(59, 130, 246, 0.06)' }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-card bg-accent/10 flex items-center justify-center">
            <Icon size={22} className="text-accent" />
          </div>
          <span className="text-xs font-mono text-foreground-subtle">{service.number}</span>
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6">{description}</p>

        <ul className="space-y-2">
          {deliverables.map((item, i) => (
            <li key={i} className="text-xs text-foreground-subtle flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
