// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyCAWuzFRQjZoTsDy5LDN4e8iXsDS6wWGbs",
  authDomain: "newshub-auth.firebaseapp.com",
  projectId: "newshub-auth",
  storageBucket: "newshub-auth.appspot.com",
  messagingSenderId: "473052412721",
  appId: "1:473052412721:web:ccc15f6476e712be60ce10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth,provider};