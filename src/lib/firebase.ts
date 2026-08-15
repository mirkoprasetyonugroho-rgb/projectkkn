import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBuIJ2OKGU6HjGbwizIr4tK1uNen0CAOnU",
  authDomain: "kriwenweb.firebaseapp.com",
  projectId: "kriwenweb",
  storageBucket: "kriwenweb.firebasestorage.app",
  messagingSenderId: "303760643417",
  appId: "1:303760643417:web:3271e2fcccd8a7ce452848",
  measurementId: "G-M9E3EEE78Q"
};

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Initialize Firebase Analytics safely for SSR / Client side
let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, db, auth, analytics };
