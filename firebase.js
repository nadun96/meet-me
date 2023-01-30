// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoVXJSs4BIgMlU6dN90WyWY6r91AXZG0g",
  authDomain: "meet-me-f65c4.firebaseapp.com",
  projectId: "meet-me-f65c4",
  storageBucket: "meet-me-f65c4.appspot.com",
  messagingSenderId: "672293511257",
  appId: "1:672293511257:web:6fe5fffc4f959482811148",
  measurementId: "G-4FCFBV7GVW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const storage = getStorage();

export { auth, db, storage };
