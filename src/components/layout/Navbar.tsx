import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Command } from 'lucide-react'
import { useI18n } from '../../i18n/context'

const mainLinks = [
  { key: 'home' as const, to: '/' },
  { key: 'about' as const, to: '/about' },
  { key: 'work' as const, to: '/projects' },
  { key: 'blog' as const, to: '/blog' },
] as const

const moreLinks = [
  { key: 'skills' as const, to: '/skills' },
  { key: 'experience' as const, to: '/experience' },
  { key: 'services' as const, to: '/services' },
] as const

export function Navbar() {
  const { t, locale, toggleLocale } = useI18n()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const moreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setMoreOpen(false)
  }, [location.pathname])

  // Close "More" dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-normal ${
          scrolled ? 'top-3' : 'top-5'
        }`}
      >
        <nav className="flex items-center gap-1 px-2 py-1.5 rounded-pill glass border border-glass-border shadow-card">
          {/* Monogram */}
          <Link
            to="/"
            className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden mr-1 hover:scale-105 transition-transform"
          >
            <img src="/images/profile-photo.jpg" alt="Husein Barkah" className="w-full h-full object-cover" />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {mainLinks.map((link) => (
              <Link
                key={link.key}
                to={link.to}
                className={`relative px-3.5 py-1.5 text-sm whitespace-nowrap rounded-pill transition-colors duration-fast ${
                  isActive(link.to)
                    ? 'text-foreground bg-glass'
                    : 'text-foreground-muted hover:text-foreground'
                }`}
              >
                {isActive(link.to) && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-foreground -mt-px"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {t.nav[link.key]}
              </Link>
            ))}

            {/* More dropdown */}
            <div ref={moreRef} className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className="flex items-center gap-1 px-3.5 py-1.5 text-sm whitespace-nowrap text-foreground-muted hover:text-foreground rounded-pill transition-colors duration-fast cursor-pointer"
              >
                {t.nav.more}
                <ChevronDown size={14} className={`transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full mt-2 left-1/2 -translate-x-1/2 min-w-[160px] py-1.5 rounded-card glass border border-glass-border shadow-card"
                  >
                    {moreLinks.map((link) => (
                      <Link
                        key={link.key}
                        to={link.to}
                        className={`block px-4 py-2 text-sm whitespace-nowrap transition-colors ${
                          isActive(link.to) ? 'text-foreground bg-glass' : 'text-foreground-muted hover:text-foreground hover:bg-glass'
                        }`}
                      >
                        {t.nav[link.key]}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Contact / Hire Me */}
            <Link
              to="/contact"
              className={`px-3.5 py-1.5 text-sm whitespace-nowrap rounded-pill transition-colors duration-fast ${
                isActive('/contact')
                  ? 'bg-foreground text-background'
                  : 'text-foreground-muted hover:text-foreground border border-glass-border hover:border-glass-border-hover'
              }`}
            >
              {t.nav.hireMe}
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-1 ml-1">
            {/* Lang toggle */}
            <button
              onClick={toggleLocale}
              className="px-2.5 py-1.5 text-xs font-medium text-foreground-muted hover:text-foreground rounded-pill transition-colors cursor-pointer"
              aria-label="Toggle language"
            >
              {locale === 'en' ? 'ID' : 'EN'}
            </button>

            {/* Cmd+K icon (cosmetic) */}
            <button
              className="hidden md:flex items-center justify-center w-8 h-8 rounded-pill text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
              aria-label="Quick search"
            >
              <Command size={16} />
            </button>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-pill text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-background-secondary border-l border-border p-6 flex flex-col gap-2 md:hidden"
            >
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-foreground-muted hover:text-foreground cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
              {[...mainLinks, ...moreLinks].map((link) => (
                <Link
                  key={link.key}
                  to={link.to}
                  className={`px-4 py-3 rounded-card text-base transition-colors ${
                    isActive(link.to)
                      ? 'text-foreground bg-glass'
                      : 'text-foreground-muted hover:text-foreground'
                  }`}
                >
                  {t.nav[link.key]}
                </Link>
              ))}
              <Link
                to="/contact"
                className="mt-4 px-4 py-3 rounded-card bg-gradient-to-r from-accent to-accent-purple text-white text-center font-medium"
              >
                {t.nav.hireMe}
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
