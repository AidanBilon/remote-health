// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3MbyGHl3V_C5vLO8PQUwhJNtbRKoCe58",
  authDomain: "remote-health-d8aea.firebaseapp.com",
  projectId: "remote-health-d8aea",
  storageBucket: "remote-health-d8aea.firebasestorage.app",
  messagingSenderId: "365325548303",
  appId: "1:365325548303:web:01d2ba3eb687ac02fe1c7a",
  measurementId: "G-5S9EDTLGPH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };