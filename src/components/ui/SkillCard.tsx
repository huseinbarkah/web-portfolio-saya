import { motion } from 'framer-motion'
import {
  Code2, FileCode, Atom, Palette, Server, GitBranch,
  MessageSquare, Bot, TrendingUp, BarChart3,
  Figma, Image, Film, PenTool,
  Users, Crown, Lightbulb, Handshake,
} from 'lucide-react'
import type { Skill } from '../../data/skills'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Code2, FileCode, Atom, Palette, Server, GitBranch,
  MessageSquare, Bot, TrendingUp, BarChart3,
  Figma, Image, Film, PenTool,
  Users, Crown, Lightbulb, Handshake,
}

interface SkillCardProps {
  skill: Skill
  color: string
  index: number
}

export function SkillCard({ skill, color, index }: SkillCardProps) {
  const Icon = iconMap[skill.icon] || Code2

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass glass-hover rounded-card p-5 cursor-default group transition-all duration-normal"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-badge flex items-center justify-center transition-transform duration-normal group-hover:scale-110"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon size={20} />
        </div>
        <span className="text-xs font-mono text-foreground-subtle">{skill.level}%</span>
      </div>

      <h4 className="text-sm font-medium text-foreground mb-3">{skill.name}</h4>

      {/* Proficiency bar */}
      <div className="w-full h-1 rounded-full bg-border overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
        />
      </div>
    </motion.div>
  )
}
