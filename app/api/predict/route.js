import { NextResponse } from 'next/server';
import { runInference } from '../../../lib/predict';
import { db } from '../../../lib/db';

export async function POST(request) {
  try {
    const body = await request.json();

    // Parse and sanitize inputs
    const sanitized = {
      age: Number(body.age ?? 50),
      sex: Number(body.sex ?? 1),
      cp: Number(body.cp ?? 0),
      trestbps: Number(body.trestbps ?? 120),
      chol: Number(body.chol ?? 200),
      fbs: Number(body.fbs ?? 0),
      restecg: Number(body.restecg ?? 0),
      thalach: Number(body.thalach ?? 150),
      exang: Number(body.exang ?? 0),
      oldpeak: parseFloat(body.oldpeak ?? 0.0),
      slope: Number(body.slope ?? 1),
      ca: Number(body.ca ?? 0),
      thal: Number(body.thal ?? 2),
    };

    // 1. Run zero-latency, high-performance ML inference
    const result = runInference(sanitized);

    // 2. Persist submission to SQLite database for continuous learning & clinical analytics
    let recordInfo = { id: null };
    try {
      recordInfo = db.savePrediction(sanitized, result);
    } catch (dbErr) {
      console.error('Database logging warning:', dbErr);
    }

    return NextResponse.json({
      success: true,
      id: recordInfo.id,
      prediction: result.prediction,
      probability: result.probability,
      risk_tier: result.risk_tier,
      risk_factors: result.risk_factors,
      timestamp: result.timestamp,
    });
  } catch (error) {
    console.error('API /predict error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process cardiovascular risk assessment: ' + error.message,
      },
      { status: 500 }
    );
  }
}
