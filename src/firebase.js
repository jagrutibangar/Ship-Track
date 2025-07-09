import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzU73iIfDu5ECi5VDkRR96wt4g9qViddQ",
  authDomain: "shipment-tracker-dfee0.firebaseapp.com",
  projectId: "shipment-tracker-dfee0",
  storageBucket: "shipment-tracker-dfee0.firebasestorage.app",
  messagingSenderId: "700490714103",
  appId: "1:700490714103:web:dc1f2a15e368b72b36bcf2"
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
