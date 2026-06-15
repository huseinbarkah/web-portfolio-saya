import { createFileRoute } from '@tanstack/react-router'
import { useI18n } from '../i18n/context'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ServiceCard } from '../components/ui/ServiceCard'
import { services } from '../data/services'

export const Route = createFileRoute('/services')({
  head: () => ({
    meta: [
      { title: 'Services — Husein Barkah Pambudi' },
      { name: 'description', content: 'Landing page development, AI consultation for UMKM, and digital content strategy — services designed to help small businesses thrive digitally.' },
      { property: 'og:title', content: 'Services — Husein Barkah Pambudi' },
    ],
  }),
  component: ServicesPage,
})

function ServicesPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading label={t.services.label} title={t.services.title} accent={t.services.titleAccent} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
