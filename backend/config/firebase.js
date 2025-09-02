const admin = require('firebase-admin');

// Initialize Firestore (Application Default Credentials)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const db = admin.firestore();

module.exports = { db };


