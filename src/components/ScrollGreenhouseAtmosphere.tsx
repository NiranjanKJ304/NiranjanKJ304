import React from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';

export const ScrollGreenhouseAtmosphere: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  // Smooth out scroll progress for organic cinematic feeling
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    restDelta: 0.001,
  });

  // Background Opacity Progression:
  // Home (0 - 0.03): 0%
  // Transition (0.03 - 0.15): 0% -> 50%
  // Experience (0.15 - 0.30): 70% -> 90%
  // Continuous full presence throughout all subsequent chapters (0.30 - 1.0): 100%
  const bgOpacity = useTransform(
    smoothProgress,
    [0.02, 0.12, 0.22, 0.32, 1],
    [0, 0.50, 0.85, 1.0, 1.0]
  );

  // Gentle Parallax: background slowly glides vertically as user scrolls (75-85% relative speed)
  const parallaxY = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? ['0%', '0%'] : ['0%', '-15%']
  );

  // Subtle Scale: slight organic breathing motion (1.08 -> 1.0)
  const bgScale = useTransform(
    smoothProgress,
    [0, 0.4, 1],
    shouldReduceMotion ? [1, 1, 1] : [1.08, 1.03, 1.0]
  );

  // Soft cinematic blur: 8px during entry transition down to a recognizable 4-5px throughout
  // Flower pots, greenhouse roof, and structures remain crisp and recognizable
  const blurAmount = useTransform(
    smoothProgress,
    [0.02, 0.14, 0.5, 1],
    shouldReduceMotion
      ? ['none', 'none', 'none', 'none']
      : ['blur(8px)', 'blur(5px)', 'blur(4.5px)', 'blur(5px)']
  );

  // Subtle ambient light shift across different chapters
  const atmosphereOverlayOpacity = useTransform(
    smoothProgress,
    [0.1, 0.4, 0.7, 1],
    [0.62, 0.68, 0.64, 0.72]
  );

  return (
    /* Background Atmosphere Canvas */
    <div
      id="scroll-greenhouse-atmosphere-layer"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Dynamic Animated Motion Container */}
      <motion.div
        className="relative w-full h-full"
        style={{
          opacity: bgOpacity,
          filter: blurAmount,
          y: parallaxY,
          scale: bgScale,
        }}
      >
        {/* Layer 1: The Exact Permanent Bundled Dark Greenhouse Visual (/background.png) */}
        <img
          id="permanent-greenhouse-background"
          src="/background.png"
          alt="Dark Greenhouse Atmosphere"
          className="w-full h-full object-cover object-center select-none will-change-transform"
          referrerPolicy="no-referrer"
        />

        {/* Layer 2: Transparent Dark-Green Glass Atmosphere Filter with smooth ambient breathing */}
        <motion.div
          style={{ opacity: atmosphereOverlayOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-[#05120D]/65 via-[#07140F]/70 to-[#040A08]/80 pointer-events-none"
        />
        
        {/* Subtle Depth Vignette */}
        <div className="absolute inset-0 ring-1 ring-inset ring-white/5 pointer-events-none" />
      </motion.div>
    </div>
  );
};

