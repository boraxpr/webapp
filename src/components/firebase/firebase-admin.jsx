import admin from 'firebase-admin';
// Handle Server Side Authentication 
// Run on app initialization
// Initialize Firebase Admin SDK with your service account credentials
const serviceAccount = require('/sps-dev-8f9b4-firebase-adminsdk-21zy9-f148894096.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Other Firebase Admin SDK configuration options
});

export { admin }