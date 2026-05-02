import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAIYRVlbblnaMkfWIfLNPWgK_6ULXDPqLQ",
  authDomain: "menu-qr-26a02.firebaseapp.com",
  projectId: "menu-qr-26a02",
  storageBucket: "menu-qr-26a02.firebasestorage.app",
  messagingSenderId: "643422559370",
  appId: "1:643422559370:web:d37cfcae5b1aa2f09f6173"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)