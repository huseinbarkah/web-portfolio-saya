import { createFileRoute } from '@tanstack/react-router'
import { useI18n } from '../i18n/context'
import { SectionHeading } from '../components/ui/SectionHeading'
import { TimelineItem } from '../components/ui/TimelineItem'
import { experiences } from '../data/experience'

export const Route = createFileRoute('/experience')({
  head: () => ({
    meta: [
      { title: 'Experience — Husein Barkah Pambudi' },
      { name: 'description', content: 'Professional journey including work at Geomineup, peer mentoring at UTS, and digital leadership at DIGNITY organization.' },
      { property: 'og:title', content: 'Experience — Husein Barkah Pambudi' },
    ],
  }),
  component: ExperiencePage,
})

function ExperiencePage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeading label={t.experience.label} title={t.experience.title} accent={t.experience.titleAccent} />

        <div className="mt-12">
          {experiences.map((exp, i) => (
            <TimelineItem key={exp.id} item={exp} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
