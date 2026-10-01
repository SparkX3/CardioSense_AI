import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.patientName || !body.patientEmail || !body.appointmentDate || !body.appointmentTime) {
      return NextResponse.json(
        { success: false, error: 'Missing required appointment fields.' },
        { status: 400 }
      );
    }

    const booking = {
      doctorId: body.doctorId || 'doc-1',
      doctorName: body.doctorName || 'Dr. Evelyn Vance, MD',
      patientName: body.patientName.trim(),
      patientEmail: body.patientEmail.trim(),
      appointmentDate: body.appointmentDate,
      appointmentTime: body.appointmentTime,
      notes: body.notes || 'Routine / Risk Follow-up Evaluation',
    };

    const savedRecord = db.saveAppointment(booking);

    return NextResponse.json({
      success: true,
      message: 'Appointment successfully confirmed and registered.',
      appointment: savedRecord,
    });
  } catch (error) {
    console.error('API /appointments error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to schedule appointment: ' + error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const appointments = db.getAppointments();
    return NextResponse.json({ success: true, appointments });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
