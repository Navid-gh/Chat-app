import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCUYI0nTaByvJo0TWqHJD1DMdmU-6YpZTk",
  authDomain: "chat3-7532a.firebaseapp.com",
  projectId: "chat3-7532a",
  storageBucket: "chat3-7532a.appspot.com",
  messagingSenderId: "559373366546",
  appId: "1:559373366546:web:5deff3143d9723387fafcb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()