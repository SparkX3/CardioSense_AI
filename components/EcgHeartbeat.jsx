'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * GPU-accelerated SVG ECG heartbeat wave.
 * Positioned behind the editorial headline with smooth motion.
 */
export default function EcgHeartbeat() {
  const pathData = `
    M 0 50
    L 120 50
    L 135 50
    L 145 42
    L 155 50
    L 180 50
    L 190 58
    L 200 5
    L 215 85
    L 225 50
    L 245 50
    L 260 38
    L 280 50
    L 420 50
    L 435 50
    L 445 42
    L 455 50
    L 480 50
    L 490 58
    L 500 5
    L 515 85
    L 525 50
    L 545 50
    L 560 38
    L 580 50
    L 720 50
    L 735 50
    L 745 42
    L 755 50
    L 780 50
    L 790 58
    L 800 5
    L 815 85
    L 825 50
    L 845 50
    L 860 38
    L 880 50
    L 1000 50
  `;

  return (
    <div className="relative w-full h-36 overflow-hidden pointer-events-none select-none">
      {/* Background static baseline */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full h-[1px] bg-[#1C3326]/15" />
      </div>

      <svg
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="ecgForestGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1C3326" stopOpacity="0.15" />
            <stop offset="35%" stopColor="#2D6142" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#1C3326" stopOpacity="1" />
            <stop offset="65%" stopColor="#9E3B30" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#1C3326" stopOpacity="0.15" />
          </linearGradient>

          <filter id="ecgBlurAtria" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient background glow path */}
        <path
          d={pathData}
          fill="none"
          stroke="url(#ecgForestGlow)"
          strokeWidth="3.5"
          filter="url(#ecgBlurAtria)"
          className="opacity-30"
        />

        {/* Animated scanning pulse line */}
        <motion.path
          d={pathData}
          fill="none"
          stroke="url(#ecgForestGlow)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0.3, pathOffset: 0 }}
          animate={{ pathOffset: [0, 1] }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </svg>
    </div>
  );
}
