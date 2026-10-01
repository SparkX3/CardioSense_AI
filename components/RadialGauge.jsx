'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function RadialGauge({ score = 0, riskTier = 'LOW' }) {
  const radius = 90;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.75;
  const offset = arcLength - (score / 100) * arcLength;

  let strokeColor = '#244D34'; // deep forest green
  let tierLabel = 'Low Risk';

  if (score >= 65) {
    strokeColor = '#9E3B30'; // terracotta rust
    tierLabel = 'High Risk';
  } else if (score >= 35) {
    strokeColor = '#A6822B'; // warm ochre sandstone
    tierLabel = 'Moderate Risk';
  }

  return (
    <div className="relative flex flex-col items-center justify-center select-none py-2">
      <svg
        className="w-60 h-60 -rotate-90 transform-gpu"
        viewBox="0 0 220 220"
      >
        {/* Background track circle */}
        <circle
          cx="110"
          cy="110"
          r={radius}
          stroke="#D8D2C5"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={arcLength}
          strokeDashoffset={0}
          strokeLinecap="round"
        />

        {/* Animated fill arc */}
        <motion.circle
          cx="110"
          cy="110"
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={arcLength}
          initial={{ strokeDashoffset: arcLength }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          strokeLinecap="round"
        />
      </svg>

      {/* Center Readout */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-serif text-5xl font-medium tracking-tight text-[#1C3326] flex items-baseline"
        >
          {score.toFixed(1)}
          <span className="text-xl font-sans text-[#556358] font-normal ml-0.5">
            %
          </span>
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-1"
        >
          <span
            className="px-3 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider border shadow-sm"
            style={{
              color: strokeColor,
              backgroundColor: `${strokeColor}10`,
              borderColor: `${strokeColor}30`,
            }}
          >
            {tierLabel}
          </span>
        </motion.div>

        <span className="text-[11px] text-[#78827A] mt-2 font-mono uppercase tracking-wider">
          Calculated Probability
        </span>
      </div>

      {/* Subtle scale thresholds */}
      <div className="flex justify-between w-52 text-[10px] font-mono text-[#78827A] mt-[-6px]">
        <span>0% (Low)</span>
        <span>35%</span>
        <span>65%+ (High)</span>
      </div>
    </div>
  );
}
