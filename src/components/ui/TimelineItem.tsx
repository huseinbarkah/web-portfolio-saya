import { motion } from 'framer-motion'
import type { ExperienceItem } from '../../data/experience'
import { useI18n } from '../../i18n/context'
import { Briefcase, GraduationCap, Users } from 'lucide-react'

interface TimelineItemProps {
  item: ExperienceItem
  index: number
}

const typeIcons = {
  work: Briefcase,
  education: GraduationCap,
  organization: Users,
  internship: Briefcase,
}

const typeColors = {
  work: '#3B82F6',
  education: '#8B5CF6',
  organization: '#06B6D4',
  internship: '#F59E0B',
}

export function TimelineItem({ item, index }: TimelineItemProps) {
  const { locale } = useI18n()
  const Icon = typeIcons[item.type]
  const color = typeColors[item.type]
  const title = locale === 'id' && item.titleId ? item.titleId : item.title
  const description = locale === 'id' && item.descriptionId ? item.descriptionId : item.description
  const highlights = locale === 'id' && item.highlightsId ? item.highlightsId : item.highlights

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-8 md:pl-12 pb-12 last:pb-0 group"
    >
      {/* Vertical line */}
      <div
        className="absolute left-0 md:left-3 top-0 bottom-0 w-px"
        style={{ background: `linear-gradient(180deg, ${color}44, transparent)` }}
      />

      {/* Dot */}
      <div
        className="absolute left-[-5px] md:left-[7px] top-1 w-[11px] h-[11px] rounded-full border-2 bg-background z-10 transition-all duration-normal group-hover:scale-125"
        style={{ borderColor: color }}
      />

      {/* Content */}
      <div className="glass rounded-card p-6 glass-hover transition-all duration-normal">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-8 h-8 rounded-badge flex items-center justify-center"
            style={{ backgroundColor: `${color}15` }}
          >
            <Icon size={16} style={{ color }} />
          </div>
          <span className="text-xs font-medium tracking-wider uppercase text-foreground-muted">
            {item.period}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-accent mb-3">{item.company}</p>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4">{description}</p>

        <ul className="space-y-1.5">
          {highlights.map((highlight, i) => (
            <li key={i} className="text-xs text-foreground-subtle flex items-start gap-2">
              <span style={{ color }} className="mt-0.5">▸</span>
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
