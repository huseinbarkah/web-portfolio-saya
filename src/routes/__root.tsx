import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { LanguageProvider } from '../i18n/context'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { CursorGlow } from '../components/ui/CursorGlow'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Husein Barkah Pambudi — Digital Business & Tech' },
      { name: 'description', content: 'Digital Business student & tech enthusiast helping UMKM grow with modern web solutions and AI-powered strategies. Based in Sumbawa, Indonesia.' },
      { name: 'theme-color', content: '#0A0A0A' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Husein Barkah Pambudi' },
    ],
    links: [
      { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'shortcut icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap',
      },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Husein Barkah Pambudi',
          jobTitle: 'Digital Business Student & Tech Enthusiast',
          url: 'https://www.huseinbarkah.xyz',
          sameAs: [
            'https://github.com/huseinbarkah',
            'https://linkedin.com/in/huseinbarkah',
            'https://instagram.com/huseinbarkah',
          ],
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Sumbawa',
            addressCountry: 'ID',
          },
        }),
      },
    ],
  }),
  component: RootComponent,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground font-body bg-noise">
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function RootComponent() {
  return (
    <LanguageProvider>
      <CursorGlow />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </LanguageProvider>
  )
}
