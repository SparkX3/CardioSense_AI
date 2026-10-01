import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function GET() {
  try {
    const recent = db.getRecentPredictions(10);
    return NextResponse.json({
      success: true,
      count: recent.length,
      history: recent,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
