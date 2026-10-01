'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import SurveySection from '../components/SurveySection';
import VerdictSection from '../components/VerdictSection';
import SpecialistsSection from '../components/SpecialistsSection';
import Toast from '../components/Toast';
import AuditHistoryModal from '../components/AuditHistoryModal';
import Footer from '../components/Footer';

export default function Home() {
  const [latestVerdict, setLatestVerdict] = useState(null);
  const [latestSurveyData, setLatestSurveyData] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [auditModalOpen, setAuditModalOpen] = useState(false);

  // Toast notification helper
  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Scroll helpers
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAnalysisComplete = (predictionResult, surveyInputs) => {
    setLatestVerdict(predictionResult);
    setLatestSurveyData(surveyInputs);
  };

  return (
    <main className="relative min-h-screen bg-[#ECE8E1] text-[#1C3326] selection:bg-[#1C3326]/15 selection:text-[#1C3326]">
      {/* Fixed Navigation Header */}
      <Navbar onOpenAudit={() => setAuditModalOpen(true)} />

      {/* SECTION 1: Hero & Welcome View */}
      <HeroSection
        onStartAssessment={() => scrollToSection('vitals')}
        onConsultSpecialists={() => scrollToSection('specialists')}
      />

      {/* SECTION 2: Interactive Diagnostic Survey (Vitals Collection) */}
      <SurveySection
        onAnalysisComplete={handleAnalysisComplete}
        showToast={showToast}
      />

      {/* SECTION 3: Animated Risk Assessment & Clinical Guidance */}
      <VerdictSection
        result={latestVerdict}
        surveyData={latestSurveyData}
        onConsultSpecialists={() => scrollToSection('specialists')}
        onScrollToSurvey={() => scrollToSection('vitals')}
      />

      {/* SECTION 4: Specialist Directory & Appointment Booking */}
      <SpecialistsSection
        latestVerdict={latestVerdict}
        showToast={showToast}
      />

      {/* Global Toast Notification System */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* SQLite Telemetry Audit Modal */}
      <AuditHistoryModal
        isOpen={auditModalOpen}
        onClose={() => setAuditModalOpen(false)}
      />

      {/* Global Footer */}
      <Footer onOpenAudit={() => setAuditModalOpen(true)} />
    </main>
  );
}
