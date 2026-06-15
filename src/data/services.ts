export interface Service {
  id: string
  number: string
  title: string
  titleId?: string
  description: string
  descriptionId?: string
  deliverables: string[]
  deliverablesId?: string[]
  icon: string
}

export const services: Service[] = [
  {
    id: 'landing-page',
    number: '01',
    title: 'Landing Page Development',
    titleId: 'Bikin Landing Page',
    description: 'Modern, responsive, and conversion-focused landing pages tailored for UMKM. Built with clean code and optimized for performance, SEO, and mobile devices.',
    descriptionId: 'Landing page keren, responsif, dan siap nangkep pelanggan buat UMKM. Kodenya rapi, loading-nya cepet, dan pastinya SEO-friendly.',
    deliverables: [
      'Responsive design for all devices',
      'SEO-optimized structure',
      'Fast loading performance',
      'Contact form integration',
      'Social media integration',
    ],
    deliverablesId: [
      'Tampilan rapi di HP maupun laptop',
      'Struktur yang disukai Google (SEO)',
      'Website anti-lelet',
      'Nyambung langsung ke form kontak/WA',
      'Integrasi sama media sosial',
    ],
    icon: 'Monitor',
  },
  {
    id: 'ai-consultation',
    number: '02',
    title: 'AI Consultation for UMKM',
    titleId: 'Konsultasi AI buat UMKM',
    description: 'Helping small businesses understand and leverage AI tools to streamline operations, enhance customer engagement, and make data-driven decisions.',
    descriptionId: 'Bantu pebisnis lokal ngerti dan manfaatin AI biar kerjanya lebih cepet, ngelayanin pelanggan lebih gampang, dan ngambil keputusan pakai data.',
    deliverables: [
      'AI tool assessment & recommendations',
      'ChatGPT workflow integration',
      'Automated content generation setup',
      'Business process optimization',
      'Training & workshops',
    ],
    deliverablesId: [
      'Rekomendasi tools AI yang pas',
      'Seting alur kerja pakai ChatGPT',
      'Bikin konten otomatis',
      'Bikin proses bisnis lebih efisien',
      'Sesi sharing & pelatihan',
    ],
    icon: 'Brain',
  },
  {
    id: 'digital-content',
    number: '03',
    title: 'Digital Content Strategy',
    titleId: 'Strategi Konten Digital',
    description: 'Comprehensive content planning and creation for social media and digital platforms, designed to build brand awareness and drive engagement for local businesses.',
    descriptionId: 'Bantuin ngerencanain dan bikin konten buat sosmed, biar brand bisnis lokal kamu makin dikenal dan banyak yang engage.',
    deliverables: [
      'Content calendar planning',
      'Social media strategy',
      'Visual content creation',
      'Brand messaging framework',
      'Analytics & reporting',
    ],
    deliverablesId: [
      'Jadwal posting konten (Content Calendar)',
      'Strategi main sosmed yang bener',
      'Bikin desain visualnya',
      'Nentuin ciri khas brand (Messaging)',
      'Laporan dan analitik',
    ],
    icon: 'Megaphone',
  },
]
