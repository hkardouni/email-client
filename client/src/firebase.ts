// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-email-client.firebaseapp.com",
  projectId: "mern-email-client",
  storageBucket: "mern-email-client.appspot.com",
  messagingSenderId: "846738583395",
  appId: "1:846738583395:web:8c45943e28754c1c4bad56"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);