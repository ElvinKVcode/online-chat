import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 


const firebaseConfig = {
  apiKey: "AIzaSyChOUsZicdVf2ll3gaNFcqftfRHf1usSYY",
  authDomain: "instantchat-aeff9.firebaseapp.com",
  projectId: "instantchat-aeff9",
  storageBucket: "instantchat-aeff9.appspot.com",
  messagingSenderId: "758314479100",
  appId: "1:758314479100:web:06dbb4025dc3f479751679"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
