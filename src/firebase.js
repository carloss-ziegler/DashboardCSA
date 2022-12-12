import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAmEYo9eSXVlyCfNi8mzLzta6qqlDDEpBI",
  authDomain: "projetocsa-1eb51.firebaseapp.com",
  projectId: "projetocsa-1eb51",
  storageBucket: "projetocsa-1eb51.appspot.com",
  messagingSenderId: "606703372282",
  appId: "1:606703372282:web:b2685f1720b1686e168643",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
