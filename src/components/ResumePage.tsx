import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, Download, ExternalLink, FileText } from 'lucide-react';
import { PdfViewer } from './PdfViewer';

interface ResumePageProps {
  onBackToPortfolio: () => void;
}

export const ResumePage: React.FC<ResumePageProps> = ({ onBackToPortfolio }) => {
  const shouldReduceMotion = useReducedMotion();
  const pdfUrl = '/Niranjan-Resume.pdf';

  return (
    <div className="relative min-h-screen w-full bg-[#07140F] text-[#F3F0E7] font-sans selection:bg-[#E8754D]/35 selection:text-[#FAF9F5] overflow-x-hidden bg-grain">
      {/* Subtle Atmospheric Greenhouse Background (Dark, Blurred, Low Opacity) */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <img
          src="/background.png"
          alt="Atmospheric Greenhouse"
          className="w-full h-full object-cover object-center filter blur-md opacity-25 scale-105 select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07140F]/90 via-[#07140F]/85 to-[#07140F]/95" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 sm:py-16 flex flex-col justify-between min-h-screen">
        {/* Top Bar: Back to Portfolio Navigation */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-16"
        >
          <button
            id="back-to-portfolio-btn"
            type="button"
            onClick={onBackToPortfolio}
            className="group inline-flex items-center space-x-3 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-[#A5BDAE] hover:text-[#FAF9F5] transition-colors focus:outline-none"
          >
            <ArrowLeft className="w-4 h-4 text-[#E8754D] group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO PORTFOLIO</span>
          </button>
        </motion.div>

        {/* Hero Banner: OPEN TO WORK & DOWNLOAD RESUME BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 sm:gap-12 pb-12 border-b border-white/10"
        >
          {/* Primary Statement: OPEN TO WORK */}
          <div>
            <div className="text-xs font-semibold tracking-[0.28em] text-[#E8754D] uppercase mb-3 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#E8754D] animate-pulse" />
              <span>AVAILABILITY</span>
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[#FAF9F5] leading-[0.92] uppercase font-sans drop-shadow-sm select-none">
              OPEN<br />
              TO<br />
              WORK
            </h1>
          </div>

          {/* Download Action Area */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              id="download-resume-btn"
              href={pdfUrl}
              download="Niranjan-Resume.pdf"
              className="inline-flex items-center justify-center space-x-3 px-7 py-4 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#07140F] bg-[#E8754D] hover:bg-[#FAF9F5] transition-all duration-300 rounded-sm shadow-xl group"
            >
              <span>DOWNLOAD RESUME</span>
              <Download className="w-4 h-4 text-[#07140F] group-hover:translate-y-0.5 transition-transform" />
            </a>

            <a
              id="view-resume-tab-btn"
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 px-5 py-4 text-xs font-semibold tracking-[0.18em] uppercase text-[#BACBBF] hover:text-[#FAF9F5] bg-[#0C231B]/70 hover:bg-[#133327] border border-[#1E4535] hover:border-[#E8754D]/60 transition-all rounded-sm"
              title="Open raw PDF in new browser tab"
            >
              <ExternalLink className="w-4 h-4 text-[#A5BDAE]" />
              <span className="hidden sm:inline">OPEN IN TAB</span>
            </a>
          </div>
        </motion.div>

        {/* RESUME PREVIEW SECTION */}
        <motion.section
          id="resume-preview-section"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="my-12 sm:my-16"
        >
          {/* Glass Container Framing the Resume Document */}
          <div className="relative p-2 sm:p-4 md:p-6 bg-[#0C231B]/55 backdrop-blur-xl border border-[#B4D2C3]/15 rounded-lg shadow-[0_25px_60px_rgba(0,0,0,0.7)]">
            {/* Document Header Bar */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 px-2">
              <div className="flex items-center space-x-3">
                <FileText className="w-4 h-4 text-[#E8754D]" />
                <span className="text-xs font-mono tracking-widest text-[#E8EFE6] uppercase">
                  Niranjan-Resume.pdf
                </span>
              </div>
              <div className="flex items-center space-x-3 text-xs font-mono text-[#8EA898]">
                <span className="hidden sm:inline">CANVAS ENGINE PREVIEW</span>
                <span className="px-2 py-0.5 bg-[#17382D] border border-white/10 rounded text-[#FAF9F5] text-[11px]">
                  PDF
                </span>
              </div>
            </div>

            {/* Embedded Canvas-based PDF Viewer */}
            <div className="relative w-full rounded-md overflow-hidden bg-[#0A1A14] border border-white/10 shadow-inner">
              <PdfViewer url={pdfUrl} />
            </div>
          </div>
        </motion.section>

        {/* Footer info */}
        <footer className="pt-8 pb-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#8EA898] gap-4">
          <span>NIRANJAN • PORTFOLIO</span>
          <span className="text-[#A5BDAE]">RESUME • STANDALONE VIEW</span>
        </footer>
      </div>
    </div>
  );
};
