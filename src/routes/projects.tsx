import { createFileRoute } from '@tanstack/react-router'
import { useI18n } from '../i18n/context'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ProjectCard } from '../components/ui/ProjectCard'
import { projects } from '../data/projects'

export const Route = createFileRoute('/projects')({
  head: () => ({
    meta: [
      { title: 'Projects — Husein Barkah Pambudi' },
      { name: 'description', content: 'Curated work: Kebab Pak Ewok, 86 Shoes Care, Riskita Laundry — landing pages and digital solutions for UMKM businesses.' },
      { property: 'og:title', content: 'Projects — Husein Barkah Pambudi' },
    ],
  }),
  component: ProjectsPage,
})

function ProjectsPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Background watermark */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 select-none pointer-events-none z-0">
        <span className="font-display text-[12rem] md:text-[20rem] text-foreground/[0.02] leading-none whitespace-nowrap">
          Projects
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <SectionHeading label={t.projects.label} title={t.projects.title} accent={t.projects.titleAccent} />

        <div className="space-y-24 mt-16">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              viewProjectLabel={t.projects.viewProject}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
