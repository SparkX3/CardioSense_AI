'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  CheckCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  User,
  Heart,
  Gauge,
  Flame,
  Zap
} from 'lucide-react';

const PRESETS = {
  low: {
    label: 'Low Risk Profile (< 25% Risk)',
    data: {
      age: 36,
      sex: 0,
      cp: 2,
      trestbps: 118,
      chol: 185,
      fbs: 0,
      restecg: 0,
      thalach: 174,
      exang: 0,
      oldpeak: 0.2,
      slope: 0,
      ca: 0,
      thal: 2,
    }
  },
  moderate: {
    label: 'Moderate Risk Profile (35% - 64% Risk)',
    data: {
      age: 52,
      sex: 1,
      cp: 1,
      trestbps: 135,
      chol: 235,
      fbs: 0,
      restecg: 1,
      thalach: 142,
      exang: 0,
      oldpeak: 1.2,
      slope: 1,
      ca: 1,
      thal: 2,
    }
  },
  high: {
    label: 'High Risk Profile (> 75% Risk)',
    data: {
      age: 64,
      sex: 1,
      cp: 0,
      trestbps: 160,
      chol: 285,
      fbs: 1,
      restecg: 2,
      thalach: 108,
      exang: 1,
      oldpeak: 3.2,
      slope: 1,
      ca: 2,
      thal: 3,
    }
  }
};

export default function SurveySection({ onAnalysisComplete, showToast }) {
  const [formData, setFormData] = useState({
    age: 52,
    sex: 1,
    cp: 0,
    trestbps: 128,
    chol: 215,
    fbs: 0,
    restecg: 0,
    thalach: 154,
    exang: 0,
    oldpeak: 1.0,
    slope: 1,
    ca: 0,
    thal: 2,
  });

  const [isLoading, setIsLoading] = useState(false);

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const applyPreset = (key) => {
    const preset = PRESETS[key];
    if (preset) {
      setFormData(preset.data);
      if (showToast) {
        showToast(`Loaded ${preset.label} into assessment dossier`, 'info');
      }
    }
  };

  const resetDefaults = () => {
    setFormData({
      age: 50,
      sex: 1,
      cp: 0,
      trestbps: 120,
      chol: 200,
      fbs: 0,
      restecg: 0,
      thalach: 150,
      exang: 0,
      oldpeak: 0.8,
      slope: 1,
      ca: 0,
      thal: 2,
    });
    if (showToast) {
      showToast('Dossier reset to standard clinical baseline', 'info');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Server returned an invalid prediction.');
      }

      if (onAnalysisComplete) {
        onAnalysisComplete(data, formData);
      }

      if (showToast) {
        showToast(
          `Assessment complete: ${data.probability}% (${data.risk_tier} RISK)`,
          data.risk_tier === 'HIGH' ? 'error' : (data.risk_tier === 'MODERATE' ? 'warning' : 'success')
        );
      }

      setTimeout(() => {
        const verdictEl = document.getElementById('verdict');
        if (verdictEl) {
          verdictEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 350);

    } catch (err) {
      console.error('Submission failed:', err);
      if (showToast) {
        showToast('Evaluation error: ' + err.message, 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Helper for Blood Pressure Category
  const getBpCategory = (bp) => {
    if (bp < 120) return { label: 'Optimal', style: 'text-[#1C3326] bg-[#1C3326]/5 border-[#1C3326]/15' };
    if (bp < 130) return { label: 'Elevated', style: 'text-[#2D5A3F] bg-[#2D5A3F]/5 border-[#2D5A3F]/20' };
    if (bp < 140) return { label: 'Stage 1', style: 'text-[#A6822B] bg-[#A6822B]/10 border-[#A6822B]/25' };
    return { label: 'Stage 2', style: 'text-[#9E3B30] bg-[#9E3B30]/10 border-[#9E3B30]/25' };
  };

  // Helper for Cholesterol Category
  const getCholCategory = (chol) => {
    if (chol < 200) return { label: 'Desirable', style: 'text-[#1C3326] bg-[#1C3326]/5 border-[#1C3326]/15' };
    if (chol < 240) return { label: 'Borderline', style: 'text-[#A6822B] bg-[#A6822B]/10 border-[#A6822B]/25' };
    return { label: 'High', style: 'text-[#9E3B30] bg-[#9E3B30]/10 border-[#9E3B30]/25' };
  };

  const bpStatus = getBpCategory(formData.trestbps);
  const cholStatus = getCholCategory(formData.chol);

  return (
    <section
      id="vitals"
      className="relative min-h-screen py-28 px-6 sm:px-10 lg:px-16 bg-[#E6E1D8] text-[#1C3326] border-t border-[#1C3326]/10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-14"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#556358] block mb-2">
            Section 02 / Biomarker Protocol
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#1C3326] tracking-tight">
            Interactive Diagnostic Survey
          </h2>
          <p className="mt-3 text-[#4E5C52] text-sm sm:text-base leading-relaxed font-normal">
            Ingest 13 patient hemodynamic markers, resting ECG records, and stress diagnostics.
            Every metric is parsed through our audited Random Forest classifier in real time.
          </p>

          {/* Minimalist Clinical Presets */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#1C3326] mr-1">
              Sample Cohorts:
            </span>
            <button
              type="button"
              onClick={() => applyPreset('low')}
              className="px-3.5 py-1.5 rounded-full bg-[#F4F1EA] hover:bg-[#FAF8F5] border border-[#1C3326]/15 text-[#1C3326] text-xs font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Low Risk (Cohort A)
            </button>
            <button
              type="button"
              onClick={() => applyPreset('moderate')}
              className="px-3.5 py-1.5 rounded-full bg-[#F4F1EA] hover:bg-[#FAF8F5] border border-[#A6822B]/40 text-[#6B5218] text-xs font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Moderate Risk (Cohort B)
            </button>
            <button
              type="button"
              onClick={() => applyPreset('high')}
              className="px-3.5 py-1.5 rounded-full bg-[#F4F1EA] hover:bg-[#FAF8F5] border border-[#9E3B30]/40 text-[#9E3B30] text-xs font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              High Risk (Cohort C)
            </button>
            <button
              type="button"
              onClick={resetDefaults}
              className="px-3 py-1.5 rounded-full bg-transparent hover:bg-[#1C3326]/5 text-[#556358] text-xs font-medium transition-colors flex items-center gap-1"
              title="Reset"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>
        </motion.div>

        {/* Survey Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ============================================================== */}
            {/* SUB-CARD 1: Demographics */}
            {/* ============================================================== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#F4F1EA] rounded-2xl p-7 border border-[#1C3326]/12 shadow-[0_4px_24px_rgba(28,51,38,0.03)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#1C3326]/10 mb-6">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-[#1C3326]">Demographics</h3>
                    <p className="text-[11px] text-[#556358]">Baseline biological characteristics</p>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#556358] px-2 py-0.5 rounded bg-[#EAE5DC]">
                    Card 01
                  </span>
                </div>

                {/* Age Slider */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-[#1C3326]">
                      Patient Age
                    </label>
                    <span className="text-sm font-bold font-mono text-[#1C3326]">
                      {formData.age} <span className="text-xs font-normal text-[#556358]">years</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="85"
                    step="1"
                    value={formData.age}
                    onChange={(e) => updateField('age', parseInt(e.target.value))}
                    className="w-full"
                    id="input-slider-age"
                  />
                  <div className="flex justify-between text-[10px] text-[#7B857E] mt-1 font-mono">
                    <span>25 yrs</span>
                    <span>55 yrs</span>
                    <span>85 yrs</span>
                  </div>
                </div>

                {/* Biological Sex Toggle Pill */}
                <div className="mb-6">
                  <label className="block text-xs font-semibold text-[#1C3326] mb-2">
                    Biological Sex
                  </label>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-[#ECE8E1] rounded-full border border-[#1C3326]/10">
                    <button
                      type="button"
                      onClick={() => updateField('sex', 1)}
                      className={`py-2 px-3 rounded-full text-xs font-medium transition-all ${
                        formData.sex === 1
                          ? 'bg-[#1C3326] text-[#ECE8E1] font-semibold shadow-sm'
                          : 'text-[#4E5C52] hover:text-[#1C3326]'
                      }`}
                      id="pill-sex-male"
                    >
                      Male (1)
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField('sex', 0)}
                      className={`py-2 px-3 rounded-full text-xs font-medium transition-all ${
                        formData.sex === 0
                          ? 'bg-[#1C3326] text-[#ECE8E1] font-semibold shadow-sm'
                          : 'text-[#4E5C52] hover:text-[#1C3326]'
                      }`}
                      id="pill-sex-female"
                    >
                      Female (0)
                    </button>
                  </div>
                </div>

                {/* Chest Pain Type (4 clinical grades) */}
                <div className="mb-2">
                  <label className="block text-xs font-semibold text-[#1C3326] mb-2">
                    Chest Discomfort Classification (CP)
                  </label>
                  <div className="space-y-2">
                    {[
                      { val: 0, title: 'Typical Angina', desc: 'Exertion-induced retrosternal pressure' },
                      { val: 1, title: 'Atypical Angina', desc: 'Discomfort with atypical onset/timing' },
                      { val: 2, title: 'Non-Anginal Discomfort', desc: 'Musculoskeletal or pleuritic pain' },
                      { val: 3, title: 'Asymptomatic', desc: 'No baseline subjective distress' },
                    ].map((item) => (
                      <button
                        key={item.val}
                        type="button"
                        onClick={() => updateField('cp', item.val)}
                        className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex flex-col gap-0.5 ${
                          formData.cp === item.val
                            ? 'bg-[#ECE8E1] border-[#1C3326] shadow-sm'
                            : 'bg-transparent border-[#1C3326]/10 hover:border-[#1C3326]/30'
                        }`}
                        id={`cp-grade-${item.val}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#1C3326]">
                            {item.title} ({item.val})
                          </span>
                          {formData.cp === item.val && (
                            <CheckCircle className="w-3.5 h-3.5 text-[#1C3326]" />
                          )}
                        </div>
                        <span className="text-[11px] text-[#556358]">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ============================================================== */}
            {/* SUB-CARD 2: Baseline Vitals */}
            {/* ============================================================== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#F4F1EA] rounded-2xl p-7 border border-[#1C3326]/12 shadow-[0_4px_24px_rgba(28,51,38,0.03)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#1C3326]/10 mb-6">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-[#1C3326]">Baseline Vitals</h3>
                    <p className="text-[11px] text-[#556358]">Hemodynamics and metabolic status</p>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#556358] px-2 py-0.5 rounded bg-[#EAE5DC]">
                    Card 02
                  </span>
                </div>

                {/* Resting Blood Pressure */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-semibold text-[#1C3326]">
                      Resting Blood Pressure
                    </label>
                    <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${bpStatus.style}`}>
                      {bpStatus.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="80"
                      max="210"
                      step="1"
                      value={formData.trestbps}
                      onChange={(e) => updateField('trestbps', parseInt(e.target.value))}
                      className="flex-1"
                      id="input-slider-trestbps"
                    />
                    <span className="text-sm font-bold font-mono text-[#1C3326] w-20 text-right">
                      {formData.trestbps} <span className="text-[10px] text-[#556358] font-normal">mmHg</span>
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] text-[#7B857E] mt-1 font-mono">
                    <span>80 mmHg</span>
                    <span>120 (Optimal)</span>
                    <span>210 mmHg</span>
                  </div>
                </div>

                {/* Serum Cholesterol */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-semibold text-[#1C3326]">
                      Serum Cholesterol
                    </label>
                    <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${cholStatus.style}`}>
                      {cholStatus.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="100"
                      max="550"
                      step="1"
                      value={formData.chol}
                      onChange={(e) => updateField('chol', parseInt(e.target.value))}
                      className="flex-1"
                      id="input-slider-chol"
                    />
                    <span className="text-sm font-bold font-mono text-[#1C3326] w-20 text-right">
                      {formData.chol} <span className="text-[10px] text-[#556358] font-normal">mg/dL</span>
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] text-[#7B857E] mt-1 font-mono">
                    <span>100 mg/dL</span>
                    <span>200 (Threshold)</span>
                    <span>550 mg/dL</span>
                  </div>
                </div>

                {/* Fasting Blood Sugar > 120 mg/dl */}
                <div className="mb-6">
                  <label className="block text-xs font-semibold text-[#1C3326] mb-2">
                    Fasting Blood Sugar &gt; 120 mg/dL
                  </label>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-[#ECE8E1] rounded-full border border-[#1C3326]/10">
                    <button
                      type="button"
                      onClick={() => updateField('fbs', 0)}
                      className={`py-2 px-3 rounded-full text-xs font-medium transition-all ${
                        formData.fbs === 0
                          ? 'bg-[#1C3326] text-[#ECE8E1] font-semibold shadow-sm'
                          : 'text-[#4E5C52] hover:text-[#1C3326]'
                      }`}
                      id="pill-fbs-normal"
                    >
                      No (≤ 120 mg/dL)
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField('fbs', 1)}
                      className={`py-2 px-3 rounded-full text-xs font-medium transition-all ${
                        formData.fbs === 1
                          ? 'bg-[#1C3326] text-[#ECE8E1] font-semibold shadow-sm'
                          : 'text-[#4E5C52] hover:text-[#1C3326]'
                      }`}
                      id="pill-fbs-high"
                    >
                      Yes (&gt; 120 mg/dL)
                    </button>
                  </div>
                </div>

                {/* Resting ECG Result */}
                <div className="mb-2">
                  <label className="block text-xs font-semibold text-[#1C3326] mb-2">
                    Resting ECG Waveform
                  </label>
                  <div className="space-y-1.5">
                    {[
                      { val: 0, label: '0: Normal Waveform' },
                      { val: 1, label: '1: ST-T Wave Abnormality' },
                      { val: 2, label: '2: Left Ventricular Hypertrophy (LVH)' },
                    ].map((item) => (
                      <button
                        key={item.val}
                        type="button"
                        onClick={() => updateField('restecg', item.val)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs border transition-all flex items-center justify-between ${
                          formData.restecg === item.val
                            ? 'bg-[#ECE8E1] border-[#1C3326] font-semibold text-[#1C3326]'
                            : 'bg-transparent border-[#1C3326]/10 text-[#4E5C52] hover:border-[#1C3326]/20'
                        }`}
                        id={`restecg-opt-${item.val}`}
                      >
                        <span>{item.label}</span>
                        {formData.restecg === item.val && (
                          <CheckCircle className="w-3.5 h-3.5 text-[#1C3326]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ============================================================== */}
            {/* SUB-CARD 3: Stress Diagnostics */}
            {/* ============================================================== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#F4F1EA] rounded-2xl p-7 border border-[#1C3326]/12 shadow-[0_4px_24px_rgba(28,51,38,0.03)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#1C3326]/10 mb-6">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-[#1C3326]">Stress Diagnostics</h3>
                    <p className="text-[11px] text-[#556358]">Functional exertion and fluoroscopy</p>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#556358] px-2 py-0.5 rounded bg-[#EAE5DC]">
                    Card 03
                  </span>
                </div>

                {/* Max Heart Rate Achieved (thalach) */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-semibold text-[#1C3326]">
                      Max Heart Rate Achieved
                    </label>
                    <span className="text-sm font-bold font-mono text-[#1C3326]">
                      {formData.thalach} <span className="text-[10px] text-[#556358] font-normal">bpm</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="220"
                    step="1"
                    value={formData.thalach}
                    onChange={(e) => updateField('thalach', parseInt(e.target.value))}
                    className="w-full"
                    id="input-slider-thalach"
                  />
                  <div className="flex justify-between text-[10px] text-[#7B857E] mt-1 font-mono">
                    <span>60 bpm</span>
                    <span>140 bpm</span>
                    <span>220 bpm</span>
                  </div>
                </div>

                {/* Exercise-Induced Angina Toggle Pill */}
                <div className="mb-6">
                  <label className="block text-xs font-semibold text-[#1C3326] mb-2">
                    Exercise-Induced Angina
                  </label>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-[#ECE8E1] rounded-full border border-[#1C3326]/10">
                    <button
                      type="button"
                      onClick={() => updateField('exang', 0)}
                      className={`py-2 px-3 rounded-full text-xs font-medium transition-all ${
                        formData.exang === 0
                          ? 'bg-[#1C3326] text-[#ECE8E1] font-semibold shadow-sm'
                          : 'text-[#4E5C52] hover:text-[#1C3326]'
                      }`}
                      id="pill-exang-no"
                    >
                      No Angina (0)
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField('exang', 1)}
                      className={`py-2 px-3 rounded-full text-xs font-medium transition-all ${
                        formData.exang === 1
                          ? 'bg-[#9E3B30] text-[#ECE8E1] font-semibold shadow-sm'
                          : 'text-[#4E5C52] hover:text-[#1C3326]'
                      }`}
                      id="pill-exang-yes"
                    >
                      Angina Present (1)
                    </button>
                  </div>
                </div>

                {/* ST Depression (oldpeak) */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-semibold text-[#1C3326]">
                      ST Depression (Oldpeak)
                    </label>
                    <span className="text-sm font-bold font-mono text-[#1C3326]">
                      {formData.oldpeak.toFixed(1)} <span className="text-[10px] text-[#556358] font-normal">mm</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="6.2"
                    step="0.1"
                    value={formData.oldpeak}
                    onChange={(e) => updateField('oldpeak', parseFloat(e.target.value))}
                    className="w-full"
                    id="input-slider-oldpeak"
                  />
                  <div className="flex justify-between text-[10px] text-[#7B857E] mt-1 font-mono">
                    <span>0.0 mm (Baseline)</span>
                    <span>3.0 mm</span>
                    <span>6.2 mm</span>
                  </div>
                </div>

                {/* ST Slope */}
                <div className="mb-6">
                  <label className="block text-xs font-semibold text-[#1C3326] mb-2">
                    Peak Exercise ST Slope
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { val: 0, label: '0: Upsloping' },
                      { val: 1, label: '1: Flat' },
                      { val: 2, label: '2: Downsloping' },
                    ].map((item) => (
                      <button
                        key={item.val}
                        type="button"
                        onClick={() => updateField('slope', item.val)}
                        className={`py-2 px-2 rounded-xl text-xs font-medium border text-center transition-all ${
                          formData.slope === item.val
                            ? 'bg-[#1C3326] text-[#ECE8E1] border-[#1C3326] font-semibold shadow-sm'
                            : 'bg-transparent border-[#1C3326]/10 text-[#4E5C52] hover:border-[#1C3326]/20'
                        }`}
                        id={`slope-opt-${item.val}`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Major Vessels Colored (Fluoroscopy, ca) */}
                <div className="mb-6">
                  <label className="block text-xs font-semibold text-[#1C3326] mb-2">
                    Major Vessels Colored (Fluoroscopy: 0–3)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[0, 1, 2, 3].map((vesselCount) => (
                      <button
                        key={vesselCount}
                        type="button"
                        onClick={() => updateField('ca', vesselCount)}
                        className={`py-2 px-2 rounded-xl text-xs font-medium border text-center transition-all ${
                          formData.ca === vesselCount
                            ? 'bg-[#1C3326] text-[#ECE8E1] border-[#1C3326] font-semibold shadow-sm'
                            : 'bg-transparent border-[#1C3326]/10 text-[#4E5C52] hover:border-[#1C3326]/20'
                        }`}
                        id={`ca-opt-${vesselCount}`}
                      >
                        {vesselCount} {vesselCount === 1 ? 'Vessel' : 'Vessels'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Thalassemia Status */}
                <div className="mb-2">
                  <label className="block text-xs font-semibold text-[#1C3326] mb-2">
                    Thalassemia Scan Status
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { val: 1, label: 'Normal (1)' },
                      { val: 2, label: 'Fixed (2)' },
                      { val: 3, label: 'Reversible (3)' },
                    ].map((item) => (
                      <button
                        key={item.val}
                        type="button"
                        onClick={() => updateField('thal', item.val)}
                        className={`py-2 px-2 rounded-xl text-xs font-medium border text-center transition-all ${
                          formData.thal === item.val
                            ? 'bg-[#1C3326] text-[#ECE8E1] border-[#1C3326] font-semibold shadow-sm'
                            : 'bg-transparent border-[#1C3326]/10 text-[#4E5C52] hover:border-[#1C3326]/20'
                        }`}
                        id={`thal-opt-${item.val}`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Minimalist Submit Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-between p-6 sm:p-7 rounded-2xl bg-[#F4F1EA] border border-[#1C3326]/12 shadow-[0_4px_24px_rgba(28,51,38,0.03)] gap-4"
          >
            <div>
              <p className="text-sm font-semibold text-[#1C3326]">
                Scientific Validation & SQLite Persistence
              </p>
              <p className="text-xs text-[#556358]">
                Instantaneous evaluation across 100 decision trees with timestamped audit trail.
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-[0_4px_16px_rgba(28,51,38,0.15)] flex items-center justify-center gap-2.5 ${
                isLoading
                  ? 'bg-[#3A5343] text-white cursor-not-allowed opacity-90'
                  : 'bg-[#1C3326] hover:bg-[#2A4837] text-[#ECE8E1] hover:scale-[1.02] active:scale-[0.98]'
              }`}
              id="survey-submit-button"
            >
              {isLoading ? (
                <>
                  <Activity className="w-4 h-4 animate-spin text-[#ECE8E1]" />
                  <span>Processing Dossier...</span>
                </>
              ) : (
                <>
                  <span>Analyze Health Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </motion.div>
        </form>
      </div>
    </section>
  );
}
