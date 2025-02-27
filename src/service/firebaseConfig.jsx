// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "vihara-tour-planner.firebaseapp.com",
  projectId: "vihara-tour-planner",
  storageBucket: "vihara-tour-planner.firebasestorage.app",
  messagingSenderId: "119256457905",
  appId: "1:119256457905:web:7eeb31eae0fcf372537890",
  measurementId: "G-PC3WQLVKHL",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
