export interface ExperienceItem {
  id: string
  title: string
  titleId?: string
  company: string
  period: string
  description: string
  descriptionId?: string
  highlights: string[]
  highlightsId?: string[]
  type: 'work' | 'education' | 'organization' | 'internship'
}

export const experiences: ExperienceItem[] = [
  {
    id: 'geomineup',
    title: 'Internship Digital Creative & Marketing',
    titleId: 'Magang Digital Creative & Marketing',
    company: 'PT. Geomineup Consulting Independent',
    period: 'April 2026 — Juni 2026',
    description: 'Contributing to digital creative and marketing projects, helping businesses establish and grow their online presence.',
    descriptionId: 'Bantuin jalanin kampanye marketing digital sama ngembangin website, biar bisnis orang makin eksis di internet.',
    highlights: [
      'Developed creative and marketing assets',
      'Managed social media content strategies',
      'Implemented SEO best practices',
    ],
    highlightsId: [
      'Bikin landing page buat usaha lokal',
      'Ngurusin strategi konten sosmed',
      'Nerapin teknik SEO biar gampang dicari',
    ],
    type: 'work',
  },
  {
    id: 'uts-mentoring',
    title: 'Peer Mentor — Digital Business',
    titleId: 'Mentor Mahasiswa — Bisnis Digital',
    company: 'Universitas Teknologi Sumbawa',
    period: '2023 — Present',
    description: 'Guiding fellow students through digital business concepts, web technologies, and practical project development.',
    descriptionId: 'Bantuin temen-temen mahasiswa belajar soal bisnis digital, bikin web, dan ngerjain proyek nyata.',
    highlights: [
      'Mentored 20+ students in web development basics',
      'Conducted workshops on AI tools for productivity',
      'Facilitated collaborative project sessions',
    ],
    highlightsId: [
      'Ngebimbing 20+ mahasiswa belajar dasar bikin web',
      'Ngadain kelas soal pakai AI buat bantu nugas/kerja',
      'Bantu fasilitasin proyek bareng-bareng',
    ],
    type: 'education',
  },
  {
    id: 'dignity',
    title: 'Active Member & Digital Lead',
    titleId: 'Anggota Aktif & Lead Digital',
    company: 'DIGNITY Organization',
    period: '2023 — Present',
    description: 'Leading digital initiatives within the organization, from social media management to event promotion and community outreach.',
    descriptionId: 'Jadi penggerak urusan digital di organisasi, mulai dari ngurus sosmed sampai promosi acara komunitas.',
    highlights: [
      'Designed promotional materials and campaigns',
      'Managed organizational digital presence',
      'Coordinated community engagement events',
    ],
    highlightsId: [
      'Bikin materi desain buat promosi',
      'Ngurus akun sosmed organisasi',
      'Ikut bantu ngadain acara komunitas',
    ],
    type: 'organization',
  },
]
