import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// -------------------------------
//  ADD YOUR FIREBASE CONFIG HERE
// -------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyCGLq7lFhWz2egS3mm_iE9Onpf35jL74g8",
  authDomain: "handwriting-extractor.firebaseapp.com",
  projectId: "handwriting-extractor",
  storageBucket: "handwriting-extractor.firebasestorage.app",
  messagingSenderId: "977402939814",
  appId: "1:977402939814:web:1143bac5fb159333396767"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
