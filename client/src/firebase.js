// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-ebb1d.firebaseapp.com",
  projectId: "mern-estate-ebb1d",
  storageBucket: "mern-estate-ebb1d.appspot.com",
  messagingSenderId: "945056818730",
  appId: "1:945056818730:web:989c4c805b33c155944553",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
