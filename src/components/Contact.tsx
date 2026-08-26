import React from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <footer
      id="contact"
      className="relative w-full py-32 md:py-48 bg-gradient-to-b from-transparent via-[#07140F]/70 to-[#040A08]/95 text-[#FAF9F5] border-t border-white/10 overflow-hidden"
    >
      {/* Subtle Warm Botanical Ambient Glow */}
      <div className="absolute bottom-0 right-0 w-96 md:w-[36rem] h-96 md:h-[36rem] bg-radial-gradient from-[#E8754D]/10 via-[#17382D]/15 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Editorial Main Headline */}
        <div className="mb-16 md:mb-24">
          <motion.h2
            id="contact-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#FAF9F5] leading-[0.95] mb-4"
          >
            LET'S BUILD <br />
            <span className="text-[#E8754D]">SOMETHING.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-[#BACBBF] font-normal"
          >
            I’m available here.
          </motion.p>
        </div>

        {/* Primary Contact Action - Email (Largest & Most Prominent) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20 pb-12 border-b border-white/10"
        >
          <span className="block text-xs font-semibold tracking-[0.25em] text-[#8EA898] uppercase mb-3">
            DIRECT EMAIL
          </span>
          <a
            id="contact-primary-email"
            href={`mailto:${PERSONAL_INFO.email}`}
            className="group inline-flex items-center gap-3 sm:gap-4 text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tight text-[#FAF9F5] hover:text-[#E8754D] transition-colors duration-300"
          >
            <span className="relative">
              {PERSONAL_INFO.email}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#E8754D] transition-all duration-300 group-hover:w-full" />
            </span>
            <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#E8754D] transform transition-transform duration-300 group-hover:translate-x-2 shrink-0" />
          </a>
        </motion.div>

        {/* Primary Profiles - GitHub & LinkedIn (Asymmetric Editorial Layout) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 md:mb-28 grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12"
        >
          {/* GitHub */}
          <div>
            <span className="block text-xs font-semibold tracking-[0.25em] text-[#8EA898] uppercase mb-2">
              OPEN SOURCE
            </span>
            <a
              id="contact-github-link"
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-medium text-[#FAF9F5] hover:text-[#E8754D] transition-colors duration-300"
            >
              <span className="relative">
                github.com/NiranjanKJ304
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#E8754D] transition-all duration-300 group-hover:w-full" />
              </span>
              <ArrowUpRight className="w-5 h-5 text-[#8EA898] group-hover:text-[#E8754D] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0" />
            </a>
          </div>

          {/* LinkedIn */}
          <div>
            <span className="block text-xs font-semibold tracking-[0.25em] text-[#8EA898] uppercase mb-2">
              PROFESSIONAL NETWORK
            </span>
            <a
              id="contact-linkedin-link"
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-medium text-[#FAF9F5] hover:text-[#E8754D] transition-colors duration-300"
            >
              <span className="relative">
                linkedin.com/in/niranjan-kj
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#E8754D] transition-all duration-300 group-hover:w-full" />
              </span>
              <ArrowUpRight className="w-5 h-5 text-[#8EA898] group-hover:text-[#E8754D] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0" />
            </a>
          </div>
        </motion.div>

        {/* Secondary Understated Contacts & Minimal Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="pt-10 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          {/* Secondary Understated Links: Instagram · X · Reddit */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm font-medium tracking-wider text-[#8EA898]">
            <a
              id="contact-instagram-link"
              href={PERSONAL_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FAF9F5] hover:text-[#E8754D] transition-colors duration-200"
            >
              Instagram
            </a>
            <span className="text-[#3D6653] select-none">·</span>
            <a
              id="contact-x-link"
              href={PERSONAL_INFO.x}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FAF9F5] hover:text-[#E8754D] transition-colors duration-200"
            >
              X
            </a>
            <span className="text-[#3D6653] select-none">·</span>
            <a
              id="contact-reddit-link"
              href={PERSONAL_INFO.reddit}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FAF9F5] hover:text-[#E8754D] transition-colors duration-200"
            >
              Reddit
            </a>
          </div>

          {/* Quiet Footer Note */}
          <div className="text-xs font-mono tracking-[0.15em] text-[#6A8574]">
            © {new Date().getFullYear()} NIRANJAN
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

