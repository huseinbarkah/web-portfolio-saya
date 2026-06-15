export interface Project {
  id: string
  number: string
  title: string
  titleId?: string
  category: string
  tech: string[]
  description: string
  descriptionId?: string
  longDescription: string
  longDescriptionId?: string
  liveUrl?: string
  thumbnail: string
}

export const projects: Project[] = [
  {
    id: 'kebab-pak-ewok',
    number: '01',
    title: 'Kebab Pak Ewok',
    category: 'LANDING PAGE',
    tech: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    description: 'A modern landing page for a local kebab business in Sumbawa, designed to increase online visibility and drive customer engagement.',
    descriptionId: 'Landing page modern buat Kebab Pak Ewok, biar usahanya makin gampang dicari dan dikenal pelanggan secara online.',
    longDescription: 'Kebab Pak Ewok is a beloved local food business in Sumbawa. I designed and developed a clean, appetizing landing page that showcases their menu, location, and story — helping them reach more customers through digital presence.',
    longDescriptionId: 'Kebab Pak Ewok itu salah satu jajanan favorit di Sumbawa. Saya bantuin bikin landing page yang simpel tapi bikin ngiler, nampilin menu, lokasi, dan ceritanya. Tujuannya simpel: biar pelanggannya nambah lewat internet.',
    liveUrl: 'https://kebabpakewok.lovable.app/',
    thumbnail: '/images/projects/kebab-pak-ewok.png',
  },
  {
    id: '86-shoes-care',
    number: '02',
    title: '86 Shoes Care',
    category: 'LANDING PAGE',
    tech: ['HTML', 'CSS', 'JavaScript', 'UI/UX Design'],
    description: 'A professional landing page for a shoe cleaning and care service, featuring service packages and online booking flow.',
    descriptionId: 'Landing page profesional buat jasa cuci sepatu, lengkap sama pilihan paket dan cara booking online yang gampang.',
    longDescription: '86 Shoes Care offers premium shoe cleaning services. I built a sleek, trust-building landing page with clear service tiers, before/after galleries, and a streamlined contact flow that converted visitors into customers.',
    longDescriptionId: '86 Shoes Care ini spesialis cuci sepatu premium. Saya buatin landing page yang kelihatan profesional dan terpercaya. Ada detail layanan, galeri before-after, dan alur kontak yang langsung nyambung ke WA biar pengunjung gampang jadi pelanggan.',
    liveUrl: 'https://86shoescare.vercel.app/',
    thumbnail: '/images/projects/86-shoes-care.png',
  },
  {
    id: 'riskita-laundry',
    number: '03',
    title: 'Riskita Laundry',
    category: 'DIGITAL SOLUTION',
    tech: ['HTML', 'CSS', 'JavaScript', 'Digital Strategy'],
    description: 'A comprehensive digital solution for a laundry business, combining a landing page with digital marketing strategy.',
    descriptionId: 'Solusi digital komprehensif buat bisnis laundry, gabungin landing page sama strategi marketing digital.',
    longDescription: 'Riskita Laundry needed a complete digital transformation. I created an attractive landing page paired with a digital content strategy, helping them establish a professional online presence and attract new customers through social media integration.',
    longDescriptionId: 'Riskita Laundry butuh wajah baru di dunia maya. Jadi, saya buatin landing page yang menarik ditambah strategi konten digital. Hasilnya, mereka punya identitas online yang rapi dan bisa dapet pelanggan baru dari media sosial.',
    liveUrl: 'https://riskitalaundry.netlify.app/',
    thumbnail: '/images/projects/riskita-laundry.png',
  },
]
