import path from 'path';
import fs from 'fs';
import { DatabaseSync } from 'node:sqlite';

let dbInstance = null;

function getDb() {
  if (dbInstance) return dbInstance;

  try {
    const dbPath = path.join(process.cwd(), 'cardiosense.db');
    const sqliteDb = new DatabaseSync(dbPath);

    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS predictions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at TEXT NOT NULL,
        age INTEGER,
        sex INTEGER,
        cp INTEGER,
        trestbps INTEGER,
        chol INTEGER,
        fbs INTEGER,
        restecg INTEGER,
        thalach INTEGER,
        exang INTEGER,
        oldpeak REAL,
        slope INTEGER,
        ca INTEGER,
        thal INTEGER,
        risk_score REAL NOT NULL,
        risk_tier TEXT NOT NULL,
        payload TEXT
      );

      CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at TEXT NOT NULL,
        doctor_id TEXT NOT NULL,
        doctor_name TEXT NOT NULL,
        patient_name TEXT NOT NULL,
        patient_email TEXT NOT NULL,
        appointment_date TEXT NOT NULL,
        appointment_time TEXT NOT NULL,
        notes TEXT,
        status TEXT DEFAULT 'CONFIRMED'
      );
    `);

    dbInstance = {
      type: 'sqlite',
      savePrediction: (data, result) => {
        const stmt = sqliteDb.prepare(`
          INSERT INTO predictions (
            created_at, age, sex, cp, trestbps, chol, fbs, restecg,
            thalach, exang, oldpeak, slope, ca, thal, risk_score, risk_tier, payload
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        const now = new Date().toISOString();
        const info = stmt.run(
          now,
          data.age ?? 0,
          data.sex ?? 0,
          data.cp ?? 0,
          data.trestbps ?? 0,
          data.chol ?? 0,
          data.fbs ?? 0,
          data.restecg ?? 0,
          data.thalach ?? 0,
          data.exang ?? 0,
          data.oldpeak ?? 0,
          data.slope ?? 0,
          data.ca ?? 0,
          data.thal ?? 0,
          result.probability,
          result.risk_tier,
          JSON.stringify(data)
        );
        return { id: Number(info.lastInsertRowid), created_at: now };
      },
      getRecentPredictions: (limit = 10) => {
        const stmt = sqliteDb.prepare(`
          SELECT id, created_at, age, sex, cp, trestbps, chol, thalach, risk_score, risk_tier
          FROM predictions
          ORDER BY id DESC
          LIMIT ?
        `);
        return stmt.all(limit);
      },
      saveAppointment: (booking) => {
        const stmt = sqliteDb.prepare(`
          INSERT INTO appointments (
            created_at, doctor_id, doctor_name, patient_name, patient_email,
            appointment_date, appointment_time, notes, status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'CONFIRMED')
        `);
        const now = new Date().toISOString();
        const info = stmt.run(
          now,
          booking.doctorId || '',
          booking.doctorName || '',
          booking.patientName || '',
          booking.patientEmail || '',
          booking.appointmentDate || '',
          booking.appointmentTime || '',
          booking.notes || ''
        );
        return {
          id: Number(info.lastInsertRowid),
          created_at: now,
          status: 'CONFIRMED',
          ...booking
        };
      },
      getAppointments: () => {
        const stmt = sqliteDb.prepare(`SELECT * FROM appointments ORDER BY id DESC LIMIT 20`);
        return stmt.all();
      }
    };
    return dbInstance;
  } catch (err) {
    console.warn('Falling back to file-backed JSON database store:', err.message);

    const storagePath = path.join(process.cwd(), 'cardiosense_fallback.json');
    function readStorage() {
      if (!fs.existsSync(storagePath)) {
        return { predictions: [], appointments: [] };
      }
      try {
        return JSON.parse(fs.readFileSync(storagePath, 'utf-8'));
      } catch {
        return { predictions: [], appointments: [] };
      }
    }
    function writeStorage(data) {
      fs.writeFileSync(storagePath, JSON.stringify(data, null, 2), 'utf-8');
    }

    dbInstance = {
      type: 'json-fallback',
      savePrediction: (data, result) => {
        const store = readStorage();
        const item = {
          id: store.predictions.length + 1,
          created_at: new Date().toISOString(),
          ...data,
          risk_score: result.probability,
          risk_tier: result.risk_tier
        };
        store.predictions.unshift(item);
        writeStorage(store);
        return item;
      },
      getRecentPredictions: (limit = 10) => {
        const store = readStorage();
        return store.predictions.slice(0, limit);
      },
      saveAppointment: (booking) => {
        const store = readStorage();
        const item = {
          id: store.appointments.length + 1,
          created_at: new Date().toISOString(),
          status: 'CONFIRMED',
          ...booking
        };
        store.appointments.unshift(item);
        writeStorage(store);
        return item;
      },
      getAppointments: () => {
        const store = readStorage();
        return store.appointments;
      }
    };
    return dbInstance;
  }
}

export const db = {
  savePrediction: (data, result) => getDb().savePrediction(data, result),
  getRecentPredictions: (limit) => getDb().getRecentPredictions(limit),
  saveAppointment: (booking) => getDb().saveAppointment(booking),
  getAppointments: () => getDb().getAppointments()
};
