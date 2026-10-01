module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/app/api/predict/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$predict$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/predict.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.js [app-route] (ecmascript)");
;
;
;
async function POST(request) {
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
            thal: Number(body.thal ?? 2)
        };
        // 1. Run zero-latency, high-performance ML inference
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$predict$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["runInference"])(sanitized);
        // 2. Persist submission to SQLite database for continuous learning & clinical analytics
        let recordInfo = {
            id: null
        };
        try {
            recordInfo = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].savePrediction(sanitized, result);
        } catch (dbErr) {
            console.error('Database logging warning:', dbErr);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            id: recordInfo.id,
            prediction: result.prediction,
            probability: result.probability,
            risk_tier: result.risk_tier,
            risk_factors: result.risk_factors,
            timestamp: result.timestamp
        });
    } catch (error) {
        console.error('API /predict error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Failed to process cardiovascular risk assessment: ' + error.message
        }, {
            status: 500
        });
    }
}
}),
"[project]/lib/db.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__url__external__node$3a$sqlite__ = __turbopack_context__.x("node:sqlite", ()=>require("node:sqlite"), true);
;
;
;
let dbInstance = null;
function getDb() {
    if (dbInstance) return dbInstance;
    try {
        const dbPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'cardiosense.db');
        const sqliteDb = new __TURBOPACK__url__external__node$3a$sqlite__["DatabaseSync"](dbPath);
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
            savePrediction: (data, result)=>{
                const stmt = sqliteDb.prepare(`
          INSERT INTO predictions (
            created_at, age, sex, cp, trestbps, chol, fbs, restecg,
            thalach, exang, oldpeak, slope, ca, thal, risk_score, risk_tier, payload
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
                const now = new Date().toISOString();
                const info = stmt.run(now, data.age ?? 0, data.sex ?? 0, data.cp ?? 0, data.trestbps ?? 0, data.chol ?? 0, data.fbs ?? 0, data.restecg ?? 0, data.thalach ?? 0, data.exang ?? 0, data.oldpeak ?? 0, data.slope ?? 0, data.ca ?? 0, data.thal ?? 0, result.probability, result.risk_tier, JSON.stringify(data));
                return {
                    id: Number(info.lastInsertRowid),
                    created_at: now
                };
            },
            getRecentPredictions: (limit = 10)=>{
                const stmt = sqliteDb.prepare(`
          SELECT id, created_at, age, sex, cp, trestbps, chol, thalach, risk_score, risk_tier
          FROM predictions
          ORDER BY id DESC
          LIMIT ?
        `);
                return stmt.all(limit);
            },
            saveAppointment: (booking)=>{
                const stmt = sqliteDb.prepare(`
          INSERT INTO appointments (
            created_at, doctor_id, doctor_name, patient_name, patient_email,
            appointment_date, appointment_time, notes, status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'CONFIRMED')
        `);
                const now = new Date().toISOString();
                const info = stmt.run(now, booking.doctorId || '', booking.doctorName || '', booking.patientName || '', booking.patientEmail || '', booking.appointmentDate || '', booking.appointmentTime || '', booking.notes || '');
                return {
                    id: Number(info.lastInsertRowid),
                    created_at: now,
                    status: 'CONFIRMED',
                    ...booking
                };
            },
            getAppointments: ()=>{
                const stmt = sqliteDb.prepare(`SELECT * FROM appointments ORDER BY id DESC LIMIT 20`);
                return stmt.all();
            }
        };
        return dbInstance;
    } catch (err) {
        console.warn('Falling back to file-backed JSON database store:', err.message);
        const storagePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'cardiosense_fallback.json');
        function readStorage() {
            if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(storagePath)) {
                return {
                    predictions: [],
                    appointments: []
                };
            }
            try {
                return JSON.parse(__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(storagePath, 'utf-8'));
            } catch  {
                return {
                    predictions: [],
                    appointments: []
                };
            }
        }
        function writeStorage(data) {
            __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(storagePath, JSON.stringify(data, null, 2), 'utf-8');
        }
        dbInstance = {
            type: 'json-fallback',
            savePrediction: (data, result)=>{
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
            getRecentPredictions: (limit = 10)=>{
                const store = readStorage();
                return store.predictions.slice(0, limit);
            },
            saveAppointment: (booking)=>{
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
            getAppointments: ()=>{
                const store = readStorage();
                return store.appointments;
            }
        };
        return dbInstance;
    }
}
const db = {
    savePrediction: (data, result)=>getDb().savePrediction(data, result),
    getRecentPredictions: (limit)=>getDb().getRecentPredictions(limit),
    saveAppointment: (booking)=>getDb().saveAppointment(booking),
    getAppointments: ()=>getDb().getAppointments()
};
}),
"[project]/lib/predict.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runInference",
    ()=>runInference
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
let cachedBundle = null;
function getModelBundle() {
    if (!cachedBundle) {
        const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'models', 'model_bundle.json');
        const content = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(filePath, 'utf-8');
        cachedBundle = JSON.parse(content);
    }
    return cachedBundle;
}
function runInference(inputData) {
    const modelBundle = getModelBundle();
    const { feature_names, scaler, trees } = modelBundle;
    // 1. Build raw feature vector
    const rawVector = feature_names.map((name)=>{
        const val = inputData[name];
        return typeof val === 'number' ? val : parseFloat(val) || 0;
    });
    // 2. Scale continuous features: (x - mean) / scale
    const scaledVector = [
        ...rawVector
    ];
    for(let i = 0; i < scaler.continuous_features.length; i++){
        const featureIdx = scaler.continuous_indices[i];
        const mean = scaler.mean[i];
        const scale = scaler.scale[i];
        scaledVector[featureIdx] = (scaledVector[featureIdx] - mean) / scale;
    }
    // 3. Evaluate each decision tree in the random forest ensemble
    let totalProbDisease = 0;
    for (const tree of trees){
        let node = 0;
        while(tree.children_left[node] !== -1){
            const featIdx = tree.feature[node];
            const threshold = tree.threshold[node];
            const featVal = scaledVector[featIdx];
            if (featVal <= threshold) {
                node = tree.children_left[node];
            } else {
                node = tree.children_right[node];
            }
        }
        // Leaf node value distribution [countClass0, countClass1]
        const counts = tree.value[node];
        const sum = counts[0] + counts[1];
        const probClass1 = sum > 0 ? counts[1] / sum : 0;
        totalProbDisease += probClass1;
    }
    // Average probability over 100 trees
    const probability = totalProbDisease / trees.length * 100;
    const roundedProb = Math.round(probability * 100) / 100;
    const prediction = roundedProb >= 50.0 ? 1 : 0;
    let riskTier = 'LOW';
    if (roundedProb >= 65.0) {
        riskTier = 'HIGH';
    } else if (roundedProb >= 35.0) {
        riskTier = 'MODERATE';
    }
    // Identify top contributing risk biomarkers
    const riskFactors = [];
    if (inputData.trestbps >= 140) riskFactors.push({
        name: 'Hypertensive BP',
        value: `${inputData.trestbps} mm Hg`,
        severity: 'high'
    });
    else if (inputData.trestbps >= 130) riskFactors.push({
        name: 'Elevated BP',
        value: `${inputData.trestbps} mm Hg`,
        severity: 'moderate'
    });
    if (inputData.chol >= 240) riskFactors.push({
        name: 'Hypercholesterolemia',
        value: `${inputData.chol} mg/dL`,
        severity: 'high'
    });
    else if (inputData.chol >= 200) riskFactors.push({
        name: 'Borderline High Cholesterol',
        value: `${inputData.chol} mg/dL`,
        severity: 'moderate'
    });
    if (inputData.oldpeak >= 2.0) riskFactors.push({
        name: 'Pronounced ST Depression',
        value: `${inputData.oldpeak} mm`,
        severity: 'high'
    });
    else if (inputData.oldpeak > 1.0) riskFactors.push({
        name: 'Mild ST Depression',
        value: `${inputData.oldpeak} mm`,
        severity: 'moderate'
    });
    if (inputData.exang === 1) riskFactors.push({
        name: 'Exercise-Induced Angina',
        value: 'Present',
        severity: 'high'
    });
    if (inputData.fbs === 1) riskFactors.push({
        name: 'Elevated Fasting Glucose (>120 mg/dL)',
        value: 'High',
        severity: 'moderate'
    });
    if (inputData.cp === 0) riskFactors.push({
        name: 'Typical Anginal Symptoms',
        value: 'Grade 0',
        severity: 'high'
    });
    return {
        prediction,
        probability: roundedProb,
        risk_tier: riskTier,
        risk_factors: riskFactors,
        timestamp: new Date().toISOString()
    };
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__09azwek._.js.map