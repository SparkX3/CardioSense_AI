'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, X, RefreshCw } from 'lucide-react';

export default function AuditHistoryModal({ isOpen, onClose }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/history');
      const data = await res.json();
      if (data.success) {
        setHistory(data.history || []);
      }
    } catch (err) {
      console.error('Failed to load history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchHistory();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#1C3326]/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', stiffness: 280, damping: 25 }}
          className="relative w-full max-w-3xl rounded-3xl bg-[#F4F1EA] text-[#1C3326] border border-[#1C3326]/15 shadow-2xl overflow-hidden z-10 my-8"
        >
          {/* Header */}
          <div className="p-6 bg-[#ECE8E1] border-b border-[#1C3326]/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-[#1C3326]/10 text-[#1C3326]">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-medium text-[#1C3326] flex items-center gap-2">
                  SQLite Persistent Clinical Audit
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-[#1C3326]/10 text-[#1C3326]">
                    Active DB
                  </span>
                </h3>
                <p className="text-xs text-[#556358]">
                  Timestamped submissions recorded in cardiosense.db
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={fetchHistory}
                disabled={loading}
                className="p-2 rounded-full text-[#556358] hover:text-[#1C3326] hover:bg-[#1C3326]/5 transition-colors"
                title="Refresh"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-[#556358] hover:text-[#1C3326] hover:bg-[#1C3326]/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {history.length === 0 ? (
              <div className="text-center py-12 text-[#556358] text-xs">
                No clinical submissions logged yet. Complete a survey to register an entry.
              </div>
            ) : (
              <div className="space-y-3">
                {history.map((record) => (
                  <div
                    key={record.id}
                    className="p-4 rounded-2xl bg-[#ECE8E1] border border-[#1C3326]/10 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[#1C3326] font-bold">#LOG-{record.id}</span>
                        <span className="text-[#78827A]">|</span>
                        <span className="text-[#556358] font-sans">
                          {new Date(record.created_at).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#556358] font-sans flex flex-wrap gap-x-3 gap-y-1 pt-1">
                        <span>Age: <strong className="text-[#1C3326]">{record.age}</strong></span>
                        <span>Sex: <strong className="text-[#1C3326]">{record.sex === 1 ? 'Male' : 'Female'}</strong></span>
                        <span>Resting BP: <strong className="text-[#1C3326]">{record.trestbps} mmHg</strong></span>
                        <span>Chol: <strong className="text-[#1C3326]">{record.chol} mg/dL</strong></span>
                        <span>Max HR: <strong className="text-[#1C3326]">{record.thalach} bpm</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <div className="text-sm font-bold text-[#1C3326] font-mono">
                          {record.risk_score}%
                        </div>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                            record.risk_tier === 'HIGH'
                              ? 'bg-[#9E3B30]/10 text-[#9E3B30] border-[#9E3B30]/30'
                              : record.risk_tier === 'MODERATE'
                              ? 'bg-[#A6822B]/10 text-[#6B5218] border-[#A6822B]/30'
                              : 'bg-[#1C3326]/10 text-[#1C3326] border-[#1C3326]/20'
                          }`}
                        >
                          {record.risk_tier}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
