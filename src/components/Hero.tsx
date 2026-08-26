import React from 'react';
import { motion, MotionValue, useTransform, useReducedMotion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GreenhouseHeroVisual } from './GreenhouseHeroVisual';

interface HeroProps {
  scrollYProgress: MotionValue<number>;
}

export const Hero: React.FC<HeroProps> = ({ scrollYProgress }) => {
  const shouldReduceMotion = useReducedMotion();

  // 1. Slowly zoom the Hero photograph
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.22],
    shouldReduceMotion ? [1, 1] : [1.02, 1.18]
  );

  // 2. Move Hero photograph slightly upward (subtle parallax)
  const imageY = useTransform(
    scrollYProgress,
    [0, 0.22],
    shouldReduceMotion ? ['0%', '0%'] : ['0%', '-10%']
  );

  // 3. Very gradually darken the Hero image
  const darkenOpacity = useTransform(
    scrollYProgress,
    [0.02, 0.18],
    [0, 0.85]
  );

  // 4. Hero overall container fade out to seamlessly reveal greenhouse background underneath
  const containerOpacity = useTransform(
    scrollYProgress,
    [0.12, 0.22],
    [1, 0]
  );

  // 5. Hero text slowly moves and fades away
  const contentOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.12], [0, -60]);

  return (
    <motion.section
      id="home"
      style={{ opacity: containerOpacity }}
      className="relative w-full min-h-screen flex flex-col justify-start overflow-hidden bg-[#0C1410]"
    >
      {/* Background Cinematic Visual with Smooth Scroll Parallax, Zoom & Darkening */}
      <div className="absolute inset-0 w-full h-full z-0">
        <GreenhouseHeroVisual
          imageScale={imageScale}
          imageY={imageY}
          darkenOpacity={darkenOpacity}
        />
      </div>

      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C1410] via-transparent to-[#0C1410]/40 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0C1410]/20 to-[#0C1410]/80 pointer-events-none z-10" />

      {/* Upper Left / Middle Hero Content positioned across the upper greenhouse roof area */}
      <motion.div
        id="hero-content"
        className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-16"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="max-w-xl md:max-w-2xl">
          {/* Main Name */}
          <motion.h1
            id="hero-name"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#EDF0EB] mb-4 sm:mb-5 leading-tight drop-shadow-lg"
          >
            {PERSONAL_INFO.name}
          </motion.h1>

          {/* Primary Tagline */}
          <motion.p
            id="hero-tagline"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-normal italic text-[#D7DFD8] leading-relaxed max-w-xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]"
          >
            “I turn ideas into interfaces, problems into systems,
            <br className="hidden sm:inline" />{' '}
            and curiosity into things that work.”
          </motion.p>
        </div>
      </motion.div>
    </motion.section>
  );
};

