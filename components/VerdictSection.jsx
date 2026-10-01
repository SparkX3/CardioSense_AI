'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Stethoscope,
  HeartPulse,
  Clock,
  Database,
  CheckCircle2
} from 'lucide-react';
import RadialGauge from './RadialGauge';

export default function VerdictSection({ result, surveyData, onConsultSpecialists, onScrollToSurvey }) {
  const hasResult = !!result;
  const score = hasResult ? result.probability : 24.5;
  const riskTier = hasResult ? result.risk_tier : 'LOW';
  const isHighRisk = riskTier === 'HIGH';
  const isModerateRisk = riskTier === 'MODERATE';
  const isLowRisk = riskTier === 'LOW';

  const riskFactors = result?.risk_factors || [];

  return (
    <section
      id="verdict"
      className="relative min-h-screen py-28 px-6 sm:px-10 lg:px-16 bg-[#ECE8E1] text-[#1C3326] border-t border-[#1C3326]/10"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-14"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#556358] block mb-2">
            Section 03 / Clinical Guidance
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#1C3326] tracking-tight">
            Diagnostic Verdict & Biomarker Synthesis
          </h2>
          <p className="mt-3 text-[#4E5C52] text-sm sm:text-base leading-relaxed font-normal">
            Correlating resting hemodynamics, stress fluoroscopy, and metabolic markers into a
            rigorously calibrated cardiovascular risk index.
          </p>
        </motion.div>

        {/* Dynamic Result Panel */}
        <AnimatePresence mode="wait">
          {hasResult ? (
            <motion.div
              key="result-card"
              initial={{ opacity: 0, scale: 0.96, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{
                type: 'spring',
                stiffness: 240,
                damping: 24,
              }}
              className="space-y-8"
            >
              {/* Main Card Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Left: Gauge Card */}
                <div className="lg:col-span-5 bg-[#F4F1EA] rounded-3xl p-8 border border-[#1C3326]/12 shadow-[0_4px_24px_rgba(28,51,38,0.03)] flex flex-col items-center justify-between">
                  <div className="w-full flex items-center justify-between pb-3 border-b border-[#1C3326]/10">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#556358]">
                      Calculated Risk Index
                    </span>
                    <span className="text-[11px] font-mono text-[#1C3326] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#556358]" />
                      {new Date(result.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div className="my-5">
                    <RadialGauge score={score} riskTier={riskTier} />
                  </div>

                  <div className="w-full pt-4 border-t border-[#1C3326]/10 flex items-center justify-between text-xs text-[#556358]">
                    <span className="flex items-center gap-1.5 font-mono">
                      <Database className="w-3.5 h-3.5 text-[#1C3326]" />
                      DB ID: #{result.id || 'SYNC'}
                    </span>
                    <span className="font-mono text-[#1C3326]">100 Estimators</span>
                  </div>
                </div>

                {/* Right: Synthesis Details */}
                <div className="lg:col-span-7 bg-[#F4F1EA] rounded-3xl p-8 border border-[#1C3326]/12 shadow-[0_4px_24px_rgba(28,51,38,0.03)] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-serif text-2xl font-medium text-[#1C3326]">
                        Clinical Summary
                      </h3>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider border ${
                          isHighRisk
                            ? 'bg-[#9E3B30]/10 text-[#9E3B30] border-[#9E3B30]/30'
                            : isModerateRisk
                            ? 'bg-[#A6822B]/10 text-[#6B5218] border-[#A6822B]/30'
                            : 'bg-[#1C3326]/10 text-[#1C3326] border-[#1C3326]/20'
                        }`}
                      >
                        {riskTier} Risk Cohort
                      </span>
                    </div>

                    <p className="text-[#4E5C52] text-sm leading-relaxed mb-6 font-normal">
                      {isHighRisk &&
                        'Elevated risk markers detected across exertion angina and ST depression. Early preventative clinical consultation with an accredited cardiologist is strongly advised.'}
                      {isModerateRisk &&
                        'Moderate cardiovascular risk profile detected. Baseline blood pressure or lipid values indicate active monitoring and targeted lifestyle modification are prudent.'}
                      {isLowRisk &&
                        'Cardiovascular markers present within normal normative physiological bands. Continue routine annual preventative screening and heart-healthy lifestyle.'}
                    </p>

                    {/* Contributing Factors */}
                    <div className="space-y-3 mb-6">
                      <h4 className="text-xs font-semibold text-[#1C3326] uppercase tracking-wider">
                        Biomarker Indicators:
                      </h4>

                      {riskFactors.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {riskFactors.map((factor, idx) => (
                            <div
                              key={idx}
                              className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                                factor.severity === 'high'
                                  ? 'bg-[#FAF6F4] border-[#9E3B30]/30 text-[#9E3B30]'
                                  : 'bg-[#FAF8F2] border-[#A6822B]/30 text-[#6B5218]'
                              }`}
                            >
                              <span className="font-medium flex items-center gap-1.5">
                                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                                {factor.name}
                              </span>
                              <span className="font-mono font-bold bg-[#ECE8E1] px-2 py-0.5 rounded text-[#1C3326]">
                                {factor.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-3.5 rounded-xl bg-[#ECE8E1] border border-[#1C3326]/15 text-[#1C3326] text-xs flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#1C3326] shrink-0" />
                          <span>No acute elevated risk thresholds crossed. Markers remain within target clinical bands.</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Immediate Action */}
                  <div className="pt-6 border-t border-[#1C3326]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold text-[#1C3326]">
                        Consult with an affiliated specialist
                      </p>
                      <p className="text-[11px] text-[#556358]">
                        Schedule a direct consultation with our verified clinical network.
                      </p>
                    </div>

                    <button
                      onClick={onConsultSpecialists}
                      className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#1C3326] hover:bg-[#2A4837] text-[#ECE8E1] text-xs font-semibold tracking-wider uppercase transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
                      id="verdict-btn-schedule"
                    >
                      <span>Schedule Consultation</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

              {/* ========================================================== */}
              {/* MANDATORY MEDICAL DISCLAIMER BOX (Styled Prominently) */}
              {/* ========================================================== */}
              <div
                className={`p-7 rounded-3xl border shadow-sm transition-all ${
                  isHighRisk || isModerateRisk
                    ? 'bg-[#FAF3F2] border-[#9E3B30]/30 text-[#4D1B15]'
                    : 'bg-[#F2F5F3] border-[#1C3326]/20 text-[#152B1E]'
                }`}
                id="medical-disclaimer-box"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-2xl shrink-0 ${
                      isHighRisk || isModerateRisk
                        ? 'bg-[#9E3B30]/10 text-[#9E3B30]'
                        : 'bg-[#1C3326]/10 text-[#1C3326]'
                    }`}
                  >
                    {isHighRisk || isModerateRisk ? (
                      <ShieldAlert className="w-6 h-6 text-[#9E3B30]" />
                    ) : (
                      <ShieldCheck className="w-6 h-6 text-[#1C3326]" />
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/70 border border-current/20">
                        {isHighRisk || isModerateRisk
                          ? 'High-Priority Clinical Advisory'
                          : 'Clinical Disclaimer & Preventative Advisory'}
                      </span>
                    </div>

                    <p className="text-sm font-medium leading-relaxed">
                      {isHighRisk || isModerateRisk ? (
                        <>
                          <strong className="font-bold">
                            Elevated risk markers detected.
                          </strong>{' '}
                          Automated screening cannot replace clinical diagnostics. Please consult a
                          cardiologist immediately for comprehensive medical evaluation.
                        </>
                      ) : (
                        <>
                          <strong className="font-bold">
                            Estimated risk is low,
                          </strong>{' '}
                          but AI screening tools are probabilistic and not 100% accurate. Regular
                          preventative check-ups with a certified physician remain essential.
                        </>
                      )}
                    </p>

                    <p className="text-xs opacity-75 leading-normal">
                      CardioSense AI uses an audited Random Forest classifier benchmarked on clinical cardiovascular datasets. It is designed to assist preventative screening and does not constitute a formal medical diagnosis.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Idle State */
            <motion.div
              key="idle-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#F4F1EA] rounded-3xl p-10 text-center max-w-xl mx-auto border border-dashed border-[#1C3326]/20 shadow-sm"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#1C3326]/10 text-[#1C3326] flex items-center justify-center mx-auto mb-4">
                <HeartPulse className="w-7 h-7 text-[#1C3326]" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-[#1C3326] mb-2">
                Awaiting Diagnostic Input
              </h3>
              <p className="text-[#556358] text-xs sm:text-sm max-w-md mx-auto mb-6 leading-relaxed">
                Complete the diagnostic survey above or select a sample cohort to generate an audited
                cardiovascular risk prediction.
              </p>
              <button
                onClick={onScrollToSurvey}
                className="px-6 py-2.5 rounded-full bg-[#1C3326] text-[#ECE8E1] text-xs font-semibold tracking-wider uppercase transition-all hover:scale-[1.02] active:scale-[0.98]"
                id="idle-btn-to-survey"
              >
                Go to Diagnostic Survey
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
