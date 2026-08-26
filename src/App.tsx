import { useState, useEffect } from 'react';
import { useScroll } from 'motion/react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { ScrollGreenhouseAtmosphere } from './components/ScrollGreenhouseAtmosphere';
import { ResumePage } from './components/ResumePage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname.toLowerCase();
  });
  const [activeSection, setActiveSection] = useState<string>('home');
  const { scrollYProgress } = useScroll();

  // Listen to browser history changes (back/forward navigation)
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname.toLowerCase());
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path.toLowerCase());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (currentPath === '/resume') return;

    const sections = ['home', 'experience', 'skills', 'projects', 'about', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  // Dedicated Standalone Resume Page View
  if (currentPath === '/resume') {
    return <ResumePage onBackToPortfolio={() => navigateTo('/')} />;
  }

  return (
    <div className="relative min-h-screen bg-[#07140F] text-[#F3F0E7] font-sans selection:bg-[#E8754D]/35 selection:text-[#FAF9F5] bg-grain">
      {/* Dynamic Secondary Greenhouse Cinematic Layer (Emerges after scrolling past Hero) */}
      <ScrollGreenhouseAtmosphere />

      {/* Floating Minimal Navigation */}
      <Navigation activeSection={activeSection} onNavigate={navigateTo} />

      {/* Main Single-Page Editorial Flow */}
      <main id="portfolio-main-content" className="relative z-10">
        {/* 1. HOME / HERO */}
        <Hero scrollYProgress={scrollYProgress} />

        {/* 2. EXPERIENCE */}
        <Experience />

        {/* 3. SKILLS */}
        <Skills />

        {/* 4. PROJECTS */}
        <Projects />

        {/* 5. ABOUT */}
        <About />

        {/* 6. CONTACT */}
        <Contact />
      </main>
    </div>
  );
}

