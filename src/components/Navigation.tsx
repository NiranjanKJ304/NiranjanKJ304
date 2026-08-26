import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NAV_LINKS } from '../data/portfolioData';

interface NavigationProps {
  activeSection: string;
  onNavigate?: (path: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href.startsWith('/')) {
      if (onNavigate) {
        onNavigate(href);
      } else {
        window.history.pushState({}, '', href);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
      return;
    }

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="site-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-4 bg-black/20 md:bg-[#07140F]/80 md:backdrop-blur-xl border-b border-white/10 shadow-lg'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand / Name */}
        <a
          id="nav-brand-link"
          href="#home"
          onClick={(e) => handleLinkClick(e, '#home')}
          className="text-sm font-semibold tracking-[0.2em] uppercase text-[#F3F0E7] hover:text-[#E8754D] transition-colors"
        >
          NIRANJAN
        </a>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav" aria-label="Main Navigation" className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {NAV_LINKS.map((link) => {
            const isResume = link.href === '/resume';
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;

            if (isResume) {
              return (
                <a
                  key={link.label}
                  id="nav-link-resume"
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="ml-2 px-3.5 py-1.5 text-xs font-semibold tracking-[0.18em] text-[#E8754D] border border-[#E8754D]/50 hover:bg-[#E8754D] hover:text-[#FAF9F5] rounded-xs transition-all duration-300 shadow-xs"
                >
                  {link.label}
                </a>
              );
            }

            return (
              <a
                key={link.label}
                id={`nav-link-${sectionId}`}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`relative px-3 py-2 text-xs font-medium tracking-[0.18em] transition-all duration-300 ${
                  isActive
                    ? 'text-[#F3F0E7] font-semibold'
                    : 'text-[#BACBBF] hover:text-[#FAF9F5]'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#E8754D]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          id="mobile-nav-toggle"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
          className="md:hidden p-2 text-[#BACBBF] hover:text-[#FAF9F5] transition-colors focus:outline-none"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span
              className={`h-0.5 w-full bg-current transition-all duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            />
            <span
              className={`h-0.5 w-full bg-current transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`h-0.5 w-full bg-current transition-all duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Drawer Menu - Transparent without blur */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/35 border-b border-white/15 px-6 py-6"
          >
            <nav className="flex flex-col space-y-3">
              {NAV_LINKS.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                const isResume = link.href === '/resume';

                return (
                  <a
                    key={link.label}
                    id={`mobile-nav-link-${sectionId}`}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`text-sm font-semibold tracking-[0.2em] py-2.5 transition-colors flex items-center justify-between drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] ${
                      isActive
                        ? 'text-[#E8754D]'
                        : isResume
                        ? 'text-[#E8754D] hover:text-[#FAF9F5]'
                        : 'text-[#E0EBE2] hover:text-[#FAF9F5]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#E8754D]" />}
                  </a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
