'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Calendar,
  Clock,
  User,
  Mail,
  CheckCircle2,
  Building,
  Activity
} from 'lucide-react';

const TIME_SLOTS = [
  '09:00 AM',
  '10:30 AM',
  '11:45 AM',
  '02:15 PM',
  '03:45 PM',
  '05:00 PM',
];

export default function AppointmentModal({
  isOpen,
  onClose,
  doctor,
  initialNotes,
  showToast,
  onBookingConfirmed,
}) {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[1]);
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [notes, setNotes] = useState(initialNotes || 'CardioSense AI Screening Follow-up');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  if (!isOpen || !doctor) return null;

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!patientName.trim() || !patientEmail.trim()) {
      if (showToast) showToast('Please enter your full name and email.', 'warning');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorId: doctor.id,
          doctorName: doctor.name,
          patientName,
          patientEmail,
          appointmentDate: selectedDate,
          appointmentTime: selectedSlot,
          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to confirm booking.');
      }

      setBookingSuccess(data.appointment);

      if (showToast) {
        showToast(`Consultation confirmed with ${doctor.name}`, 'success');
      }

      if (onBookingConfirmed) {
        onBookingConfirmed(data.appointment);
      }
    } catch (err) {
      console.error('Booking error:', err);
      if (showToast) {
        showToast('Booking failed: ' + err.message, 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setBookingSuccess(null);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetAndClose}
          className="fixed inset-0 bg-[#1C3326]/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', stiffness: 280, damping: 25 }}
          className="relative w-full max-w-lg rounded-3xl bg-[#F4F1EA] text-[#1C3326] border border-[#1C3326]/15 shadow-2xl overflow-hidden z-10 my-8"
        >
          {/* Header */}
          <div className="p-6 bg-[#ECE8E1] border-b border-[#1C3326]/10 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden border border-[#1C3326]/15 shrink-0 bg-[#D8D2C5]">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div>
                <h3 className="font-serif text-xl font-medium text-[#1C3326]">
                  {doctor.name}
                </h3>
                <p className="text-xs font-semibold text-[#1C3326]">{doctor.role || doctor.specialty}</p>
                <p className="text-[11px] text-[#556358] flex items-center gap-1 mt-0.5">
                  <Building className="w-3 h-3 text-[#78827A]" />
                  {doctor.institution || doctor.hospital}
                </p>
              </div>
            </div>

            <button
              onClick={resetAndClose}
              className="p-1.5 rounded-full text-[#556358] hover:text-[#1C3326] hover:bg-[#1C3326]/5 transition-colors"
              id="btn-close-modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            {bookingSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#1C3326]/10 border border-[#1C3326]/20 text-[#1C3326] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h4 className="font-serif text-2xl font-medium text-[#1C3326]">
                    Consultation Scheduled
                  </h4>
                  <p className="text-xs text-[#556358] mt-1 max-w-sm mx-auto">
                    Your appointment has been registered in the clinic database.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#ECE8E1] border border-[#1C3326]/10 text-left text-xs space-y-2 font-mono">
                  <div className="flex justify-between">
                    <span className="text-[#556358]">Confirmation ID:</span>
                    <span className="text-[#1C3326] font-bold">#CS-{bookingSuccess.id || '4821'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#556358]">Physician:</span>
                    <span className="text-[#1C3326]">{doctor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#556358]">Date & Time:</span>
                    <span className="text-[#1C3326] font-bold">
                      {bookingSuccess.appointmentDate} at {bookingSuccess.appointmentTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#556358]">Patient:</span>
                    <span className="text-[#1C3326]">{bookingSuccess.patientName}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={resetAndClose}
                  className="w-full py-3 rounded-full bg-[#1C3326] text-[#ECE8E1] font-semibold text-xs tracking-wider uppercase shadow-sm hover:bg-[#284836] transition-all"
                  id="btn-modal-done"
                >
                  Done
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-4">
                {/* Date Picker */}
                <div>
                  <label className="text-xs font-semibold text-[#1C3326] flex items-center gap-1.5 mb-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#556358]" />
                    Consultation Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#ECE8E1] border border-[#1C3326]/15 text-[#1C3326] text-xs font-mono focus:outline-none focus:border-[#1C3326]"
                    id="modal-date-picker"
                  />
                </div>

                {/* Time Slots */}
                <div>
                  <label className="text-xs font-semibold text-[#1C3326] flex items-center gap-1.5 mb-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#556358]" />
                    Time Slot
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 px-2 rounded-xl text-xs font-medium border text-center transition-all ${
                          selectedSlot === slot
                            ? 'bg-[#1C3326] text-[#ECE8E1] border-[#1C3326] font-bold shadow-sm'
                            : 'bg-[#ECE8E1] border-[#1C3326]/10 text-[#556358] hover:text-[#1C3326]'
                        }`}
                        id={`slot-btn-${slot.replace(/[:\s]/g, '-')}`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Patient Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#1C3326] block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Eleanor Vance"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl bg-[#ECE8E1] border border-[#1C3326]/15 text-[#1C3326] text-xs focus:outline-none focus:border-[#1C3326]"
                      id="input-patient-name"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#1C3326] block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="patient@atria.org"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl bg-[#ECE8E1] border border-[#1C3326]/15 text-[#1C3326] text-xs focus:outline-none focus:border-[#1C3326]"
                      id="input-patient-email"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="text-xs font-semibold text-[#1C3326] block mb-1">
                    Clinical Referral Notes
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#ECE8E1] border border-[#1C3326]/15 text-[#1C3326] text-xs focus:outline-none focus:border-[#1C3326]"
                    id="input-patient-notes"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-[#1C3326] hover:bg-[#284836] text-[#ECE8E1] font-semibold text-xs tracking-wider uppercase transition-all shadow-sm flex items-center justify-center gap-2 mt-2"
                  id="modal-submit-appointment"
                >
                  {isSubmitting ? (
                    <>
                      <Activity className="w-4 h-4 animate-spin" />
                      <span>Confirming Consultation...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>Confirm Consultation</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
