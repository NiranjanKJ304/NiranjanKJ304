import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';
import { EXPERIENCES } from '../data/portfolioData';

export const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Track scroll strictly through the Experience section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end 85%'],
  });

  const smoothTimelineProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  });

  // Precise 0 -> 100% drawing height scale for the vertical timeline
  const timelineScaleY = useTransform(
    smoothTimelineProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [0, 1]
  );

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full py-32 md:py-48 bg-transparent text-[#F3F0E7]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-20 md:mb-32">
          <motion.h2
            id="experience-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs font-semibold tracking-[0.25em] text-[#E8754D] uppercase mb-4"
          >
            EXPERIENCE
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-[2px] bg-[#E8754D] origin-left"
          />
        </div>

        {/* Editorial Vertical Cinematic Timeline */}
        <div className="relative pl-8 sm:pl-12 md:pl-16">
          {/* Base Inactive Track (Subtle Atmospheric Guide) */}
          <div className="absolute left-[3px] sm:left-[5px] md:left-[7px] top-4 bottom-8 w-[1px] bg-white/10" />

          {/* Active Scroll-Drawn Timeline Line (Glows in Terracotta / Emerald Gradient) */}
          <motion.div
            style={{ scaleY: timelineScaleY }}
            className="absolute left-[3px] sm:left-[5px] md:left-[7px] top-4 bottom-8 w-[2px] bg-gradient-to-b from-[#E8754D] via-[#E8754D]/90 to-[#8EA898]/40 origin-top shadow-[0_0_12px_rgba(232,117,77,0.4)]"
          />

          <div className="space-y-28 md:space-y-40">
            {EXPERIENCES.map((exp, index) => (
              <motion.div
                key={exp.id}
                id={`experience-item-${exp.id}`}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-90px' }}
                transition={{ duration: 0.9, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
              >
                {/* Timeline Node - Circular Beacon anchored to the vertical line */}
                <div className="absolute -left-[35px] sm:-left-[51px] md:-left-[67px] top-2 flex items-center justify-center">
                  {/* Active Ripple / Glow for Current Role or in-view items */}
                  {exp.isCurrent && (
                    <span className="absolute w-8 h-8 rounded-full bg-[#E8754D]/20 animate-ping pointer-events-none" />
                  )}

                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.5, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-5 h-5 rounded-full bg-[#07140F] border-2 border-[#E8754D] group-hover:bg-[#E8754D] group-hover:border-[#FAF9F5] transition-all duration-300 shadow-[0_0_10px_rgba(232,117,77,0.5)] flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E8754D] group-hover:bg-[#07140F] transition-colors" />
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-baseline">
                  {/* Left Column: Large Year Typography & Status */}
                  <div className="lg:col-span-4">
                    <div className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F3F0E7] group-hover:text-[#FAF9F5] transition-colors drop-shadow-sm font-sans">
                      {exp.year || exp.period.split(' ')[0]}
                    </div>
                    <div className="mt-1 text-sm font-medium tracking-wide text-[#E8754D]">
                      {exp.period}
                    </div>
                    {exp.duration && (
                      <div className="mt-2 text-xs font-semibold tracking-[0.16em] text-[#A5BDAE] uppercase">
                        Duration: {exp.duration}
                      </div>
                    )}
                    {exp.isCurrent && (
                      <div className="mt-3 inline-flex items-center space-x-2 px-2.5 py-1 bg-[#E8754D]/15 border border-[#E8754D]/40 rounded-full text-[11px] font-semibold tracking-wider text-[#FAF9F5] uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E8754D] animate-pulse" />
                        <span>Current Role</span>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Role Title, Company & Structured Narrative */}
                  <div className="lg:col-span-8">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#FAF9F5] tracking-tight mb-2 group-hover:text-[#E8754D] transition-colors">
                      {exp.role}
                    </h3>
                    <div className="text-base sm:text-lg font-medium text-[#C8DCD0] mb-6">
                      {exp.company}
                    </div>

                    {/* Specific Highlights / Details */}
                    {exp.details && exp.details.length > 0 && (
                      <div className="space-y-3 mb-8 text-[#D5E2D8] text-base sm:text-lg leading-relaxed font-normal">
                        {exp.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <span className="text-[#E8754D] mt-1.5 text-xs">◆</span>
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Editorial Technology Tags Flow */}
                    <div className="pt-2 border-t border-white/10">
                      <div className="text-xs font-semibold tracking-[0.2em] text-[#8EA898] uppercase mb-3.5">
                        Technologies & Work Context
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIdx) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{
                              duration: 0.45,
                              delay: index * 0.08 + techIdx * 0.03,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="inline-block px-3 py-1.5 text-xs font-medium tracking-wide text-[#E8EFE6] bg-[#0C231B]/70 backdrop-blur-xs border border-[#1E4535] rounded-sm transition-all duration-200 hover:border-[#E8754D] hover:bg-[#15382B] hover:text-[#FAF9F5]"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

