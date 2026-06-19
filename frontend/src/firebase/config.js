import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDu-G_VIhUXUI2DZMXmVFHjJCYCK3RkCOo",
  authDomain: "skill-lab-dd380.firebaseapp.com",
  projectId: "skill-lab-dd380",
  storageBucket: "skill-lab-dd380.firebasestorage.app",
  messagingSenderId: "750987746571",
  appId: "1:750987746571:web:8d2c04a872b8f2d2b3160e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
