import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useI18n } from '../i18n/context'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SkillCard } from '../components/ui/SkillCard'
import { skillCategories } from '../data/skills'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/skills')({
  head: () => ({
    meta: [
      { title: 'Skills — Husein Barkah Pambudi' },
      { name: 'description', content: 'Technical, AI, creative, and soft skills — from web development and prompt engineering to UI/UX design and leadership.' },
      { property: 'og:title', content: 'Skills — Husein Barkah Pambudi' },
    ],
  }),
  component: SkillsPage,
})

function SkillsPage() {
  const { t } = useI18n()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredCategories = activeCategory
    ? skillCategories.filter((c) => c.id === activeCategory)
    : skillCategories

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading label={t.skills.label} title={t.skills.title} accent={t.skills.titleAccent} />

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-pill text-sm font-medium transition-all cursor-pointer ${
              !activeCategory
                ? 'bg-foreground text-background'
                : 'glass border border-glass-border text-foreground-muted hover:text-foreground'
            }`}
          >
            All
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className={`px-4 py-2 rounded-pill text-sm font-medium transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'text-white'
                  : 'glass border border-glass-border text-foreground-muted hover:text-foreground'
              }`}
              style={activeCategory === cat.id ? { backgroundColor: cat.color } : undefined}
            >
              {t.skills.categories[cat.id as keyof typeof t.skills.categories] || cat.label}
            </button>
          ))}
        </motion.div>

        {/* Skill cards */}
        {filteredCategories.map((category) => (
          <div key={category.id} className="mb-12 last:mb-0">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-sm font-medium tracking-wider uppercase mb-6 flex items-center gap-3"
              style={{ color: category.color }}
            >
              <span className="w-8 h-px" style={{ backgroundColor: category.color }} />
              {t.skills.categories[category.id as keyof typeof t.skills.categories] || category.label}
            </motion.h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {category.skills.map((skill, i) => (
                <SkillCard key={skill.name} skill={skill} color={category.color} index={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
