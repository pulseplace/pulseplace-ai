
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbtBJmHlFHljHvfcGegB4C0pGIF4Gr1m",
  authDomain: "pulseplace-ai.firebaseapp.com",
  projectId: "pulseplace-ai",
  storageBucket: "pulseplace-ai.appspot.com",
  messagingSenderId: "635402794801", // Updated with matching sender ID
  appId: "1:635402794801:web:b2195eb7c9c6d5e49d2210" // Updated with the provided App ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
