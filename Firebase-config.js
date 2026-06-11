// firebase-config.js
// Import this file in your HTML using a <script type="module"> tag,
// OR copy-paste this config block directly into your HTML's Firebase setup.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey:            "AIzaSyD7F3BEfGk5FxtxRFx1S-yt4j_spr6SM4g",
  authDomain:        "account-manager-aa3c9.firebaseapp.com",
  projectId:         "account-manager-aa3c9",
  storageBucket:     "account-manager-aa3c9.firebasestorage.app",
  messagingSenderId: "100494378829",
  appId:             "1:100494378829:web:032644be9e95167d3ad904",
  measurementId:     "G-R3V438CXZL"
};

const app       = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db        = getFirestore(app);

export { db };

// ─── IMPORTANT: Firestore Security Rules ────────────────────────────────────
// Go to Firebase Console → Firestore → Rules and set:
//
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /clients/{clientId} {
//       allow read, write: if true;   // ← open during development
//       // TODO: lock down with auth before going to production
//     }
//   }
// }
// ─────────────────────────────────────────────────────────────────────────────
