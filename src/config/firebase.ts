import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDxHNp59jysk6nM3J1rSCf48whd7qQIs3g',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'rejoice-f5882.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'rejoice-f5882',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "rejoice-admin.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "529571024781",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:529571024781:web:993382dce5b8ad9e8f77c4",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-XQKD958P3P"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Admin Firebase config (separate app instance)
export const adminFirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDxHNp59jysk6nM3J1rSCf48whd7qQIs3g',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'rejoice-f5882.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'rejoice-f5882',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "rejoice-admin.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "529571024781",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:529571024781:web:993382dce5b8ad9e8f77c4",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-XQKD958P3P"
};

export default firebaseConfig; 