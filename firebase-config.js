// firebase-config.js
// Central Firebase initialization, shared by index.html via ES module import.
// Do NOT put passwords or secrets here — the apiKey below is a public web
// API key (safe to expose) and access is controlled by Firestore Security
// Rules + Firebase Authentication, not by hiding this key.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD7F3BEfGk5FxtxRFx1S-yt4j_spr6SM4g",
  authDomain: "account-manager-aa3c9.firebaseapp.com",
  projectId: "account-manager-aa3c9",
  storageBucket: "account-manager-aa3c9.firebasestorage.app",
  messagingSenderId: "100494378829",
  appId: "1:100494378829:web:032644be9e95167d3ad904",
  measurementId: "G-R3V438CXZL"
};

const app = initializeApp(firebaseConfig);
let analytics = null;
try { analytics = getAnalytics(app); } catch (e) { /* analytics can fail on some hosts/blockers, safe to ignore */ }

const db   = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth, analytics };

// ─── IMPORTANT: Firestore Security Rules ────────────────────────────────────
// Go to Firebase Console → Firestore Database → Rules and set the rules
// found in `firestore.rules` in this project (see README / setup notes).
// The OLD development rule below must be removed:
//
//   allow read, write: if true;   // ← INSECURE, do not use in production
//
// ─────────────────────────────────────────────────────────────────────────────
