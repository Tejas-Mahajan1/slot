const admin = require('firebase-admin');
require('dotenv').config();

// Initialize Firestore (Application Default Credentials)
if (!admin.apps.length) {
  // Uses GOOGLE_APPLICATION_CREDENTIALS env var pointing to the service account JSON file
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const db = admin.firestore();

module.exports = { db };


