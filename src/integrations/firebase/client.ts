
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration - Update with your actual Firebase project details from the Firebase console
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // Replace with your Firebase project API Key
  authDomain: "pulseplace-ai.firebaseapp.com", // Replace with your Firebase Auth Domain
  projectId: "pulseplace-ai",
  storageBucket: "pulseplace-ai.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // Replace with your Firebase Messaging Sender ID
  appId: "YOUR_APP_ID" // Replace with your Firebase App ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
