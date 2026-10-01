'use client';

import React from 'react';
import { Database, ArrowUp } from 'lucide-react';

export default function Footer({ onOpenAudit }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#1C3326]/12 bg-[#ECE8E1] text-[#556358] text-xs py-14 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & info */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <button
            onClick={scrollToTop}
            className="font-serif text-2xl font-normal text-[#1C3326] hover:opacity-80 transition-opacity"
          >
            CardioSense<span className="italic font-light">.AI</span>
          </button>
          <span className="hidden sm:inline text-[#1C3326]/20">|</span>
          <p className="text-[#556358]">
            CardioSense AI · Proactive & Preventative Cardiovascular Intelligence
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          <button
            onClick={onOpenAudit}
            className="hover:text-[#1C3326] transition-colors flex items-center gap-1 font-mono text-[11px]"
          >
            <Database className="w-3.5 h-3.5 text-[#1C3326]" />
            SQLite Telemetry Audit
          </button>

          <button
            onClick={scrollToTop}
            className="hover:text-[#1C3326] transition-colors flex items-center gap-1 uppercase tracking-wider text-[10px] font-mono"
          >
            Back to Top
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-[#1C3326]/10 text-[11px] text-[#78827A] text-center leading-relaxed">
        <p>
          CardioSense AI by Atria is an investigational decision-support interface. It operates as a probabilistic screening tool and does not substitute for certified clinical diagnostics. In case of acute cardiac distress, contact emergency medical response immediately.
        </p>
      </div>
    </footer>
  );
}
