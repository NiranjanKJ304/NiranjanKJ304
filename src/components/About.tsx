import React from 'react';
import { motion } from 'motion/react';

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative w-full py-32 md:py-48 bg-transparent text-[#F3F0E7]"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-20 md:mb-28">
          <motion.h2
            id="about-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs font-semibold tracking-[0.25em] text-[#E8754D] uppercase mb-4"
          >
            ABOUT
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-[2px] bg-[#E8754D] origin-left"
          />
        </div>

        {/* Quiet, Spacious, Typography-Led Editorial Content */}
        <motion.div
          id="about-statement"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-12 md:space-y-16 text-xl sm:text-2xl md:text-3xl text-[#D5E2D8] leading-relaxed font-normal"
        >
          {/* Paragraph 1 */}
          <p className="leading-snug md:leading-normal">
            I’m <strong className="font-semibold text-[#FAF9F5]">Niranjan</strong>, a developer who enjoys turning ideas into things people can actually use.
          </p>

          {/* Paragraph 2 */}
          <p className="leading-snug md:leading-normal">
            I’m drawn to the space where <strong className="font-semibold text-[#FAF9F5]">design, technology, and problem-solving</strong> meet. I care about how a product looks, how it behaves, and what happens behind the interface. From building modern web interfaces and management systems to exploring AI, hardware, and real-world automation, I like taking an idea from <span className="italic text-[#BACBBF]">“What if we built this?”</span> to <span className="italic font-medium text-[#E8754D]">“Here it is.”</span>
          </p>

          {/* Paragraph 3 */}
          <p className="leading-snug md:leading-normal">
            I’m especially interested in creating <strong className="font-semibold text-[#FAF9F5]">clean, dynamic, practical digital experiences</strong> rather than building software just for the sake of building software. I experiment, break things, debug them, redesign them, and keep refining until the result feels right.
          </p>

          {/* Paragraph 4 */}
          <p className="leading-snug md:leading-normal pt-8 border-t border-white/15">
            My work is a collection of that process: <strong className="font-semibold text-[#FAF9F5]">interfaces I’ve designed, systems I’ve built, problems I’ve solved, and ideas I’ve turned into working projects.</strong>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
