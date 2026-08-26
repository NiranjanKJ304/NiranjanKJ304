import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

type FilterType = 'all' | 'ai-ml' | 'full-stack' | 'data' | 'tools';

const FILTER_BUTTONS: { id: FilterType; label: string }[] = [
  { id: 'all', label: 'ALL' },
  { id: 'ai-ml', label: 'AI / ML' },
  { id: 'full-stack', label: 'FULL STACK' },
  { id: 'data', label: 'DATA' },
  { id: 'tools', label: 'TOOLS' }
];

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<FilterType>('all');

  const filteredCategories = SKILL_CATEGORIES.filter(
    (cat) => activeCategory === 'all' || cat.id === activeCategory
  );

  return (
    <section
      id="skills"
      className="relative w-full py-32 md:py-44 bg-transparent text-[#F3F0E7]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header & Category Filter Bar */}
        <div className="mb-16 md:mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <motion.h2
              id="skills-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs font-semibold tracking-[0.25em] text-[#E8754D] uppercase mb-4"
            >
              TECHNICAL VOCABULARY
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-16 h-[2px] bg-[#E8754D] origin-left"
            />
          </div>

          {/* Interactive Category Filter Switchers */}
          <div
            id="skills-filter-bar"
            className="flex flex-wrap items-center gap-2 p-1.5 bg-[#07140F]/80 backdrop-blur-md border border-[#17382D] rounded-sm"
          >
            {FILTER_BUTTONS.map((btn) => {
              const isActive = activeCategory === btn.id;
              return (
                <button
                  key={btn.id}
                  id={`filter-btn-${btn.id}`}
                  type="button"
                  onClick={() => setActiveCategory(btn.id)}
                  className={`relative px-4 py-2 text-xs font-medium tracking-[0.15em] transition-colors duration-200 rounded-xs cursor-pointer select-none ${
                    isActive
                      ? 'text-[#FAF9F5]'
                      : 'text-[#8EA898] hover:text-[#FAF9F5]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-[#E8754D] rounded-xs -z-10 shadow-xs"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {btn.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Curated Technical Vocabulary Panels */}
        <motion.div
          layout
          className={`grid gap-6 md:gap-8 ${
            activeCategory === 'all'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
              : 'grid-cols-1 max-w-2xl'
          }`}
        >
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category) => (
              <motion.div
                key={category.id}
                id={`skill-group-${category.id}`}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 md:p-8 bg-[#0C231B]/40 backdrop-blur-md border border-[#B4D2C3]/15 rounded-sm shadow-lg hover:border-[#E8754D]/40 transition-colors duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
                    <h3 className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#FAF9F5] uppercase group-hover:text-[#E8754D] transition-colors">
                      {category.title}
                    </h3>
                    <span className="text-xs font-mono font-medium text-[#E8754D]">
                      {category.skills.length.toString().padStart(2, '0')}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-block px-3 py-1.5 text-xs sm:text-sm font-medium tracking-wide text-[#E0EBE2] bg-[#07140F]/70 border border-[#17382D] rounded-sm transition-colors hover:border-[#E8754D]/70 hover:text-[#FAF9F5] cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
