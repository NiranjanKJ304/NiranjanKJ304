import React from 'react';
import { motion, MotionValue } from 'motion/react';

interface GreenhouseHeroVisualProps {
  imageScale?: MotionValue<number>;
  imageY?: MotionValue<string>;
  darkenOpacity?: MotionValue<number>;
}

export const GreenhouseHeroVisual: React.FC<GreenhouseHeroVisualProps> = ({
  imageScale,
  imageY,
  darkenOpacity,
}) => {
  return (
    <div
      id="hero-visual-container"
      className="relative w-full h-full overflow-hidden bg-[#0C1410]"
    >
      {/* Exact Original Bundled Hero Photograph with camera zoom & parallax */}
      <motion.img
        id="hero-custom-portrait"
        src="/hero.png"
        alt="Niranjan Greenhouse Portrait"
        referrerPolicy="no-referrer"
        style={{
          scale: imageScale,
          y: imageY,
        }}
        className="w-full h-full object-cover object-center origin-center select-none"
      />

      {/* Dynamic Scroll Darkening Layer (gradually dims photograph as camera travels inward) */}
      {darkenOpacity && (
        <motion.div
          id="hero-scroll-darkener"
          style={{ opacity: darkenOpacity }}
          className="absolute inset-0 bg-[#07140F] pointer-events-none z-10"
        />
      )}

      {/* Cinematic Vignette & Ambient Light Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C1410] via-transparent to-[#0C1410]/50 pointer-events-none z-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0C1410]/80 via-transparent to-[#0C1410]/60 pointer-events-none z-20" />
    </div>
  );
};

