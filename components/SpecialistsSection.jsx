'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Stethoscope,
  Star,
  Clock,
  Calendar,
  Building,
  ArrowRight
} from 'lucide-react';
import AppointmentModal from './AppointmentModal';

const SPECIALISTS = [
  {
    id: 'doc-1',
    name: 'Dr. Evelyn Vance',
    credentials: 'MD, FACC',
    specialty: 'Interventional Cardiology Lead',
    subspecialty: 'Coronary Angioplasty & Acute Ischemia',
    hospital: 'Stanford Cardiovascular Institute',
    experience: '18+ Years Experience',
    rating: 4.9,
    nextSlot: 'Today, 3:30 PM',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'doc-2',
    name: 'Dr. Marcus Sterling',
    credentials: 'MD, FSCAI',
    specialty: 'Cardiac Electrophysiology',
    subspecialty: 'Arrhythmia Management & Holter Review',
    hospital: 'Cleveland Clinic Heart Center',
    experience: '15+ Years Experience',
    rating: 4.9,
    nextSlot: 'Tomorrow, 10:00 AM',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'doc-3',
    name: 'Dr. Priya Nair',
    credentials: 'MD, MPH',
    specialty: 'Preventative Cardiology & Lipids',
    subspecialty: 'Arteriosclerosis & Metabolic Syndrome',
    hospital: 'Johns Hopkins Medicine',
    experience: '12+ Years Experience',
    rating: 4.8,
    nextSlot: 'Today, 5:15 PM',
    image: 'https://images.unsplash.com/photo-1594824813633-89da26d40047?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'doc-4',
    name: 'Dr. Julian Chen',
    credentials: 'MD, PhD',
    specialty: 'Structural Heart & Valve Specialist',
    subspecialty: 'Echocardiography & TAVR Protocols',
    hospital: 'Massachusetts General Hospital',
    experience: '20+ Years Experience',
    rating: 5.0,
    nextSlot: 'Thursday, 11:30 AM',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
  },
];

export default function SpecialistsSection({ latestVerdict, showToast }) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenBooking = (doc) => {
    setSelectedDoctor(doc);
    setModalOpen(true);
  };

  const initialNotes = latestVerdict
    ? `CardioSense Screening Dossier: ${latestVerdict.probability}% calculated probability (${latestVerdict.risk_tier} RISK)`
    : 'Routine Cardiovascular Consultation & Review';

  return (
    <section
      id="specialists"
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
            Section 04 / Clinical Network
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#1C3326] tracking-tight">
            Cardiologist Directory & Direct Consultation
          </h2>
          <p className="mt-3 text-[#4E5C52] text-sm sm:text-base leading-relaxed font-normal">
            Directly connect with accredited specialists for in-person evaluations, secondary opinions,
            and comprehensive cardiovascular protocols.
          </p>
        </motion.div>

        {/* Doctor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPECIALISTS.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#F4F1EA] rounded-3xl p-5 border border-[#1C3326]/12 shadow-[0_4px_24px_rgba(28,51,38,0.03)] flex flex-col justify-between hover:border-[#1C3326]/30 transition-all duration-300 group"
            >
              <div>
                {/* Doctor Avatar */}
                <div className="relative w-full h-52 rounded-2xl overflow-hidden mb-4 bg-[#ECE8E1] border border-[#1C3326]/10">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter grayscale contrast-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C3326]/60 via-transparent to-transparent opacity-60" />

                  {/* Badges */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-[#ECE8E1]/95 text-[10px] font-medium text-[#1C3326] flex items-center gap-1 shadow-sm backdrop-blur-sm">
                      <Clock className="w-3 h-3 text-[#556358]" />
                      {doc.nextSlot}
                    </span>

                    <span className="px-2 py-0.5 rounded-full bg-[#ECE8E1]/95 text-[10px] font-semibold text-[#1C3326] flex items-center gap-1 shadow-sm backdrop-blur-sm">
                      <Star className="w-3 h-3 fill-[#A6822B] text-[#A6822B]" />
                      {doc.rating}
                    </span>
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="space-y-1 mb-3">
                  <h3 className="font-serif text-xl font-medium text-[#1C3326]">
                    {doc.name}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#556358]">
                    <span>{doc.credentials}</span>
                    <span>•</span>
                    <span>{doc.experience}</span>
                  </div>
                  <p className="text-xs font-semibold text-[#1C3326] pt-1">
                    {doc.specialty}
                  </p>
                  <p className="text-[11px] text-[#556358] leading-snug">
                    {doc.subspecialty}
                  </p>
                </div>

                {/* Hospital Affiliation */}
                <div className="pt-2 pb-4 border-t border-[#1C3326]/10 flex items-center gap-1.5 text-[#556358] text-[11px]">
                  <Building className="w-3.5 h-3.5 text-[#78827A] shrink-0" />
                  <span className="truncate">{doc.hospital}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleOpenBooking(doc)}
                className="w-full py-2.5 px-3 rounded-full bg-[#ECE8E1] hover:bg-[#1C3326] text-[#1C3326] hover:text-[#ECE8E1] font-semibold text-xs tracking-wider uppercase border border-[#1C3326]/20 hover:border-[#1C3326] transition-all flex items-center justify-center gap-1.5 shadow-sm"
                id={`btn-book-${doc.id}`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Appointment</span>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Appointment Modal */}
        <AppointmentModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          doctor={selectedDoctor}
          initialNotes={initialNotes}
          showToast={showToast}
        />
      </div>
    </section>
  );
}
