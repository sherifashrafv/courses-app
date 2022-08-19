import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAUx_c5nk-0zGl2HzofpySMKHuE8tKMBO0",
  authDomain: "almentor-vuejs.firebaseapp.com",
  projectId: "almentor-vuejs",
  storageBucket: "almentor-vuejs.appspot.com",
  messagingSenderId: "264289139347",
  appId: "1:264289139347:web:b662c2e98a0b07c0676b66",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();
const auth = getAuth();
export { db, storage, auth };
