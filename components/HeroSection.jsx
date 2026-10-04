'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Stethoscope, Activity, Sparkles } from 'lucide-react';
import EcgHeartbeat from './EcgHeartbeat';

export default function HeroSection({ onStartAssessment, onConsultSpecialists }) {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-14 px-6 sm:px-10 lg:px-16 overflow-hidden bg-[#ECE8E1] text-[#1C3326]"
    >
      {/* Dynamic Animated Heartbeat Line Running Right Behind the Hero Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 opacity-45">
        <EcgHeartbeat />
      </div>

      {/* Subtle organic micro-dots / atmospheric accents */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-[22%] left-[18%] w-1.5 h-1.5 rounded-full bg-[#1C3326]/20" />
        <div className="absolute top-[38%] left-[10%] w-1 h-1 rounded-full bg-[#1C3326]/15" />
        <div className="absolute top-[68%] left-[14%] w-1.5 h-1.5 rounded-full bg-[#1C3326]/20" />
        <div className="absolute top-[24%] right-[22%] w-1 h-1 rounded-full bg-[#1C3326]/20" />
        <div className="absolute top-[58%] right-[16%] w-1.5 h-1.5 rounded-full bg-[#1C3326]/15" />
        <div className="absolute top-[72%] right-[26%] w-1 h-1 rounded-full bg-[#1C3326]/20" />
      </div>

      {/* Top Right Navigation Text Block (from reference layout) */}
      <div className="relative z-10 flex justify-end">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-right space-y-1 text-xs sm:text-sm font-semibold text-[#1C3326] tracking-tight"
        >
          <p className="hover:opacity-75 transition-opacity cursor-pointer">CardioSense AI</p>
          <p className="hover:opacity-75 transition-opacity cursor-pointer">An AI Healthcare Project</p>
          <p className="hover:opacity-75 transition-opacity cursor-pointer">By Sanchit Shingole</p>
          <p className="hover:opacity-75 transition-opacity cursor-pointer">Lokmanya Tilak College of Engineering</p>
        </motion.div>
      </div>

      {/* Center Hero Area */}
      <div className="relative z-10 max-w-6xl w-full mx-auto my-auto pt-8 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          {/* Main Headline with Serif Typography */}
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C3326]/5 border border-[#1C3326]/15 text-[#1C3326] text-[11px] font-mono tracking-widest uppercase mb-6">
              <Sparkles className="w-3 h-3 text-[#1C3326]" />
              CardioSense AI · Clinical Intelligence
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-normal tracking-tight text-[#1C3326] leading-[0.94]"
            >
              Predicting risk <br />
              <span className="italic font-light">before it matters.</span>
            </motion.h1>

            {/* Assessment CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="flex flex-wrap items-center gap-4 mt-8 sm:mt-10"
            >
              <button
                onClick={onStartAssessment}
                className="px-7 py-3 rounded-full bg-[#1C3326] hover:bg-[#284836] text-[#ECE8E1] text-xs font-semibold tracking-wider uppercase transition-all shadow-[0_4px_16px_rgba(28,51,38,0.15)] hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 group"
                id="hero-btn-start"
              >
                <Activity className="w-4 h-4 text-[#ECE8E1]" />
                <span>Start Clinical Assessment</span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onConsultSpecialists}
                className="px-6 py-3 rounded-full bg-transparent hover:bg-[#1C3326]/5 text-[#1C3326] border border-[#1C3326]/30 hover:border-[#1C3326] text-xs font-semibold tracking-wider uppercase transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
                id="hero-btn-specialists"
              >
                <Stethoscope className="w-4 h-4 text-[#1C3326]" />
                <span>Consult Specialists</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Editorial Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="lg:col-span-4 space-y-6 pt-4 lg:pt-0"
          >
            {/* The future of health / brought to you today */}
            <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm font-semibold text-[#1C3326] tracking-tight leading-snug">
              <div>
                The future <br />
                of health
              </div>
              <div>
                brought to <br />
                you today.
              </div>
            </div>

            {/* Paragraph Text */}
            <p className="text-xs sm:text-sm text-[#4E5C52] leading-relaxed font-normal">
              Leveraging artificial intelligence and machine learning to predict cardiovascular risk, facilitate early intervention, and advance preventive healthcare.
            </p>

            {/* Clinical Metadata */}
            <div className="pt-3 border-t border-[#1C3326]/15 flex items-center justify-between text-[11px] font-mono text-[#556358]">
              <span>13 Biomarkers</span>
              <span>•</span>
              <span>Random Forest ML</span>
              <span>•</span>
              <span>Zero Hardcoding</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Minimal Scroll Indicator */}
      <div className="relative z-10 w-full flex items-center justify-between pt-6 border-t border-[#1C3326]/10 text-[11px] font-mono text-[#556358]">
        <span>Predicting heart health risks today for a healthier tomorrow.</span>
        <button
          onClick={onStartAssessment}
          className="hover:text-[#1C3326] uppercase tracking-widest flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>Scroll to Vitals</span>
          <ArrowDown className="w-3 h-3 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
