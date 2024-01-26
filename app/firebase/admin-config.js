import { credential } from 'firebase-admin';
import { initializeApp, getApps } from 'firebase-admin/app';

const { private_key } = JSON.parse(process.env.FIREBASE_SECRET_KEY);

const firebaseAdminConfig = {
  credential: credential.cert({
    projectId: 'slide-753b8',
    clientEmail:
      'firebase-adminsdk-ekguu@chat-app-test-6b379.iam.gserviceaccount.com',
    privateKey: private_key,
  }),
};

export function customInitApp() {  
  if (getApps().length <= 0) {
    initializeApp(firebaseAdminConfig);
  }
}