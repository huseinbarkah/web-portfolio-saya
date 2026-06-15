import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SectionHeadingProps {
  label: string
  title: string
  accent: string
  align?: 'left' | 'center'
  className?: string
  children?: ReactNode
}

export function SectionHeading({ label, title, accent, align = 'center', className = '' }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'} ${className}`}
    >
      <span className="text-xs font-medium tracking-[0.2em] uppercase text-foreground-muted mb-4 block">
        {label}
      </span>
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
        {title}{' '}
        <em className="text-gradient not-italic font-display italic">{accent}</em>
      </h2>
    </motion.div>
  )
}
