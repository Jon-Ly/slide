import { credential } from 'firebase-admin';
import { initializeApp, getApps } from 'firebase-admin/app';

const { private_key } = JSON.parse(process.env.FIREBASE_SECRET_KEY);

export const firebaseAdminConfig = {
  credential: credential.cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: private_key,
  }),
};

export function customInitApp() {  
  if (getApps().length <= 0) {
    initializeApp(firebaseAdminConfig);
  }
}