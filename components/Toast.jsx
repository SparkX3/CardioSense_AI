'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          let icon = <Info className="w-4 h-4 text-[#1C3326] shrink-0" />;
          let borderColor = 'border-[#1C3326]/20';
          let textColor = 'text-[#1C3326]';
          let bgColor = 'bg-[#F4F1EA]';

          if (toast.type === 'success') {
            icon = <CheckCircle2 className="w-4 h-4 text-[#244D34] shrink-0" />;
            borderColor = 'border-[#244D34]/30';
          } else if (toast.type === 'warning') {
            icon = <AlertTriangle className="w-4 h-4 text-[#A6822B] shrink-0" />;
            borderColor = 'border-[#A6822B]/40';
          } else if (toast.type === 'error') {
            icon = <AlertCircle className="w-4 h-4 text-[#9E3B30] shrink-0" />;
            borderColor = 'border-[#9E3B30]/40';
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className={`pointer-events-auto p-4 rounded-2xl ${bgColor} ${borderColor} ${textColor} border shadow-[0_8px_30px_rgba(28,51,38,0.08)] flex items-center justify-between gap-3 text-xs`}
            >
              <div className="flex items-center gap-2.5">
                {icon}
                <span className="font-medium">{toast.message}</span>
              </div>

              <button
                onClick={() => onDismiss(toast.id)}
                className="text-[#556358] hover:text-[#1C3326] p-1 rounded-lg hover:bg-[#1C3326]/5 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
