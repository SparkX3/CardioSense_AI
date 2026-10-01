'use client';

import React, { useState, useEffect } from 'react';
import { Database, Calendar, Activity, ShieldCheck, Stethoscope } from 'lucide-react';

export default function Navbar({ onOpenAudit }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#ECE8E1]/90 backdrop-blur-md border-b border-[#1C3326]/10 shadow-[0_4px_20px_rgba(28,51,38,0.03)] py-4'
          : 'bg-transparent py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex items-center justify-between">
        {/* Brand Logo: lowercase serif 'atria' / 'cardiosense' */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-baseline gap-2.5 text-left group focus:outline-none"
          id="nav-brand-logo"
        >
          <span className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#1C3326] transition-opacity group-hover:opacity-80">
            CardioSense<span className="italic font-light">.AI</span>
          </span>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#556358] font-medium pl-2 border-l border-[#1C3326]/20">
            Clinical AI
          </span>
        </button>

        {/* Navigation items matching the reference image */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-[#1C3326] tracking-wide">
          <button
            onClick={() => scrollToSection('vitals')}
            className="hover:opacity-70 transition-opacity flex items-center gap-1.5"
            id="nav-link-vitals"
          >
            Diagnostic Survey
          </button>

          <button
            onClick={() => scrollToSection('verdict')}
            className="hover:opacity-70 transition-opacity flex items-center gap-1.5"
            id="nav-link-verdict"
          >
            Risk Assessment
          </button>

          <button
            onClick={() => scrollToSection('specialists')}
            className="hover:opacity-70 transition-opacity flex items-center gap-1.5"
            id="nav-link-specialists"
          >
            Specialists
          </button>

          <button
            onClick={onOpenAudit}
            className="text-[#556358] hover:text-[#1C3326] transition-colors flex items-center gap-1 text-[11px] font-mono tracking-normal"
            title="Inspect Recorded SQLite Submissions"
            id="btn-inspect-sqlite"
          >
            <Database className="w-3.5 h-3.5 text-[#1C3326]" />
            <span>Audit DB</span>
          </button>
        </nav>

        {/* Primary CTA Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollToSection('specialists')}
            className="px-5 py-2.5 rounded-full bg-[#1C3326] hover:bg-[#2A4837] text-[#ECE8E1] text-xs font-medium tracking-wide transition-all shadow-[0_2px_12px_rgba(28,51,38,0.12)] hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
            id="nav-cta-book"
          >
            <Calendar className="w-3.5 h-3.5 opacity-90" />
            <span>Book a Doctor</span>
          </button>
        </div>
      </div>
    </header>
  );
}
