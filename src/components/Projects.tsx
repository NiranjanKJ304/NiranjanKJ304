import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useReducedMotion } from 'motion/react';
import { PROJECTS } from '../data/portfolioData';
import { ExternalLink, Github, ArrowRight, Layers, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '../types';

export const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking for the pinned showcase track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  // Calculate active index based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const step = 1 / PROJECTS.length;
      const index = Math.min(Math.floor(latest / step), PROJECTS.length - 1);
      setActiveProjectIndex(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const activeProject = PROJECTS[activeProjectIndex] || PROJECTS[0];

  const handleSelectProject = (index: number) => {
    setActiveProjectIndex(index);
    if (containerRef.current) {
      const elementTop = containerRef.current.offsetTop;
      const elementHeight = containerRef.current.offsetHeight;
      const targetScroll = elementTop + (index / (PROJECTS.length - 1 || 1)) * (elementHeight - window.innerHeight);
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full lg:min-h-[420vh] bg-transparent text-[#F3F0E7]"
    >
      {/* Sticky Desktop Project Showcase */}
      <div className="hidden lg:flex sticky top-0 min-h-screen w-full flex-col justify-between py-12 px-8 xl:px-16 overflow-hidden z-20">
        {/* Showcase Header: Section Title & 01 -> 02 -> 03 Progress Navigation */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-sm font-bold tracking-[0.28em] text-[#E8754D] uppercase font-sans">
              PROJECTS
            </h2>
            <span className="text-white/30 text-xs">/</span>
            <span className="text-xs font-mono tracking-widest text-[#8EA898] uppercase">
              CHAPTER {activeProject.number} OF {String(PROJECTS.length).padStart(2, '0')}
            </span>
          </div>

          {/* Stepper Navigation: ● 01   ○ 02   ○ 03 */}
          <div className="flex items-center space-x-6">
            {PROJECTS.map((proj, idx) => {
              const isActive = idx === activeProjectIndex;
              return (
                <button
                  key={proj.id}
                  id={`project-step-${proj.id}`}
                  onClick={() => handleSelectProject(idx)}
                  className={`group flex items-center space-x-2 text-xs font-mono transition-all duration-300 focus:outline-none ${
                    isActive ? 'text-[#FAF9F5]' : 'text-[#8EA898]/70 hover:text-[#FAF9F5]'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-[#E8754D] scale-125 shadow-[0_0_8px_rgba(232,117,77,0.8)]'
                        : 'bg-white/20 group-hover:bg-white/40'
                    }`}
                  />
                  <span className={`tracking-wider ${isActive ? 'font-bold text-[#E8754D]' : 'font-normal'}`}>
                    {proj.number}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Pinned Chapter Content Area */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-12 xl:gap-16 items-center my-auto py-8">
          {/* Left Column: Project Typography & Information */}
          <div className="col-span-5 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -25 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                {/* Project Number Accent */}
                <div className="flex items-baseline space-x-3">
                  <span className="text-6xl xl:text-7xl font-bold font-sans text-[#E8754D] tracking-tighter drop-shadow-sm select-none">
                    {activeProject.number}
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-[#E8754D]/40 to-transparent" />
                </div>

                {/* Multiline Monumental Project Title */}
                <h3 className="text-4xl xl:text-5xl font-bold text-[#FAF9F5] tracking-tight leading-[1.08] drop-shadow-md">
                  {activeProject.title}
                </h3>

                {/* Metrics & Domain Tags */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  {activeProject.metrics && (
                    <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#E8754D]/15 border border-[#E8754D]/40 rounded-sm text-xs font-semibold tracking-wider text-[#FAF9F5]">
                      <Sparkles className="w-3.5 h-3.5 text-[#E8754D]" />
                      <span>{activeProject.metrics}</span>
                    </div>
                  )}
                  {activeProject.domainTags && (
                    <div className="px-3 py-1.5 bg-[#0C231B]/70 border border-[#17382D] rounded-sm text-xs font-medium tracking-wide text-[#A5BDAE]">
                      {activeProject.domainTags}
                    </div>
                  )}
                </div>

                {/* Project Description */}
                <p className="text-base xl:text-lg text-[#D5E2D8] font-normal leading-relaxed">
                  {activeProject.description}
                </p>

                {/* Technology Badges */}
                {activeProject.technologies && (
                  <div className="pt-2">
                    <div className="text-[11px] font-semibold tracking-[0.2em] text-[#8EA898] uppercase mb-3">
                      Core Pipeline Technologies
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-medium text-[#E8EFE6] bg-[#07140F]/80 border border-[#1E4535] rounded-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Link */}
                <div className="pt-4">
                  <a
                    id={`desktop-project-link-${activeProject.id}`}
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-3 px-6 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-[#FAF9F5] bg-[#0C231B]/90 hover:bg-[#E8754D] hover:text-[#07140F] border border-[#1E4535] hover:border-[#E8754D] transition-all duration-300 rounded-sm shadow-md group"
                  >
                    <Github className="w-4 h-4 text-[#F2B19A] group-hover:text-[#07140F] group-hover:scale-110 transition-transform" />
                    <span>VIEW CASE STUDY</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#A9B9A5] group-hover:text-[#07140F]" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Large Cinematic Visual Area */}
          <div className="col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.94, y: shouldReduceMotion ? 0 : 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.94, y: shouldReduceMotion ? 0 : -30 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-lg p-7 xl:p-9 bg-gradient-to-br from-[#0C231B]/85 via-[#07140F]/90 to-[#040A08]/95 backdrop-blur-xl border border-[#B4D2C3]/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group hover:border-[#E8754D]/60 transition-all duration-500 overflow-hidden"
              >
                {/* Ambient Radial Lighting within Card */}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#E8754D]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[#17382D]/40 rounded-full blur-3xl pointer-events-none" />

                {/* Card Header Bar */}
                <div className="relative z-10 flex items-center justify-between pb-5 mb-6 border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#E8754D]/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    </div>
                    <span className="text-xs font-mono tracking-widest text-[#A5BDAE] uppercase">
                      ARCHITECTURE WORKFLOW
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs font-mono text-[#E8754D] bg-[#17382D]/60 px-2.5 py-1 rounded-sm border border-[#E8754D]/30">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>SYSTEM PREVIEW</span>
                  </div>
                </div>

                {/* Concept Banner */}
                {activeProject.concept && (
                  <div className="relative z-10 mb-6 p-3.5 bg-[#07140F]/85 border border-[#17382D] rounded-sm text-xs font-mono text-[#FAF9F5] flex items-center justify-between">
                    <span className="text-[#8EA898]">Pipeline Concept:</span>
                    <span className="text-[#E8754D] font-semibold tracking-wide text-right">
                      {activeProject.concept}
                    </span>
                  </div>
                )}

                {/* Interactive Stage Pipeline Visualizer */}
                <div className="relative z-10 space-y-3">
                  {activeProject.architectureFlow?.map((step, idx) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.45, delay: 0.15 + idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      className="flex items-center space-x-3 group/item"
                    >
                      <div className="w-8 h-8 rounded-sm bg-[#07140F] border border-[#1E4535] text-[#E8754D] group-hover/item:border-[#E8754D] group-hover/item:bg-[#E8754D] group-hover/item:text-[#07140F] flex items-center justify-center font-mono text-xs font-bold transition-all duration-200 shrink-0">
                        0{idx + 1}
                      </div>

                      <div className="flex-1 p-3 bg-[#07140F]/70 border border-[#17382D]/80 group-hover/item:border-[#E8754D]/60 group-hover/item:bg-[#0D2119] rounded-sm flex items-center justify-between transition-all duration-200">
                        <span className="text-sm font-medium text-[#FAF9F5] tracking-wide">
                          {step}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-[#8EA898] group-hover/item:text-[#E8754D] transition-colors" />
                      </div>

                      {idx < (activeProject.architectureFlow?.length || 0) - 1 && (
                        <ArrowRight className="w-4 h-4 text-[#E8754D]/50 group-hover/item:text-[#E8754D] shrink-0 transition-colors" />
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Card Footer Status */}
                <div className="relative z-10 mt-7 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#8EA898]">
                  <span className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>PRODUCTION READY PIPELINE</span>
                  </span>
                  <span className="text-[#A5BDAE]">NIRANJAN • PORTFOLIO</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Status Ticker */}
        <div className="max-w-7xl mx-auto w-full pt-4 flex items-center justify-between text-xs font-medium tracking-[0.2em] text-[#8EA898]/70 border-t border-white/10 uppercase">
          <span>SCROLL TO ADVANCE CHAPTERS</span>
          <span>{activeProjectIndex + 1} / {PROJECTS.length} COMPLETED</span>
        </div>
      </div>

      {/* Mobile & Tablet Editorial Chapter Layout (Stacked, Highly Responsive) */}
      <div className="lg:hidden max-w-4xl mx-auto px-6 py-28 space-y-28">
        {/* Section Intro */}
        <div>
          <h2 className="text-xs font-semibold tracking-[0.25em] text-[#E8754D] uppercase mb-4">
            PROJECTS
          </h2>
          <div className="w-16 h-[2px] bg-[#E8754D] origin-left mb-8" />
          <p className="text-2xl sm:text-3xl font-bold text-[#FAF9F5] tracking-tight">
            Featured Engineering Systems
          </p>
        </div>

        {/* Sequential Mobile Project Chapters */}
        {PROJECTS.map((project, index) => (
          <article
            key={project.id}
            id={`mobile-project-${project.id}`}
            className="space-y-8 pt-8 border-t border-white/10"
          >
            {/* Number & Title */}
            <div>
              <div className="text-5xl font-bold text-[#E8754D] font-sans tracking-tight mb-2">
                {project.number}
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-[#FAF9F5] tracking-tight leading-tight">
                {project.title}
              </h3>
            </div>

            {/* Metrics & Tags */}
            <div className="flex flex-wrap gap-2">
              {project.metrics && (
                <div className="px-3 py-1.5 bg-[#E8754D]/15 border border-[#E8754D]/40 rounded-sm text-xs font-semibold text-[#FAF9F5]">
                  {project.metrics}
                </div>
              )}
              {project.domainTags && (
                <div className="px-3 py-1.5 bg-[#0C231B]/70 border border-[#17382D] rounded-sm text-xs text-[#A5BDAE]">
                  {project.domainTags}
                </div>
              )}
            </div>

            {/* Visual Case-Study Architecture Preview */}
            <div className="p-6 bg-[#0C231B]/60 backdrop-blur-md border border-[#B4D2C3]/20 rounded-md space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#A5BDAE] border-b border-white/10 pb-3">
                <span>SYSTEM PIPELINE</span>
                <span className="text-[#E8754D]">{project.number} / {String(PROJECTS.length).padStart(2, '0')}</span>
              </div>

              {project.architectureFlow && (
                <div className="space-y-2.5">
                  {project.architectureFlow.map((step, idx) => (
                    <div
                      key={step}
                      className="p-2.5 bg-[#07140F]/80 border border-[#17382D] rounded-sm flex items-center justify-between text-xs text-[#FAF9F5]"
                    >
                      <span className="font-mono text-[#E8754D] mr-2">0{idx + 1}</span>
                      <span className="flex-1 font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-base text-[#D5E2D8] leading-relaxed">
              {project.description}
            </p>

            {/* Tech stack */}
            {project.technologies && (
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-xs text-[#E8EFE6] bg-[#07140F] border border-[#1E4535] rounded-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Action CTA */}
            <div>
              <a
                id={`mobile-project-link-${project.id}`}
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 px-5 py-3 text-xs font-semibold tracking-wider uppercase text-[#FAF9F5] bg-[#0C231B] border border-[#1E4535] hover:border-[#E8754D] rounded-sm"
              >
                <Github className="w-4 h-4 text-[#F2B19A]" />
                <span>VIEW CASE STUDY</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#A9B9A5]" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};


