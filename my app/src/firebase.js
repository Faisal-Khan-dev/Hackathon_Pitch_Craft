  // Import the functions you need from the SDKs you need
  import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBpt77u2DRqrYP9rUksjlAK2bG6P2ZA0TU",
    authDomain: "hackathon-a4d65.firebaseapp.com",
    projectId: "hackathon-a4d65",
    storageBucket: "hackathon-a4d65.firebasestorage.app",
    messagingSenderId: "578673574751",
    appId: "1:578673574751:web:11e7b2ec4c82985e90acea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
