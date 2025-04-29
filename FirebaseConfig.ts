import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKjz0a9CBmJjRNijUOA63l4FqGyRl2LOg",
  authDomain: "final-year-project-c12d8.firebaseapp.com",
  projectId: "final-year-project-c12d8",
  storageBucket: "final-year-project-c12d8.firebasestorage.app",
  messagingSenderId: "244490009578",
  appId: "1:244490009578:web:80eff91b0fc2720d0d1093",
  measurementId: "G-EPNJFH6V10",
};

const app = initializeApp(firebaseConfig);

export const Firebase_app = app;
export const Firebase_auth = getAuth(app);
export const Firebase_db = getFirestore(app);
