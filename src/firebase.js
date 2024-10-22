// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD6FGg8qiZZpE5IUS2OdYcZTVbLv93Juqc",
    authDomain: "react-chat-a9158.firebaseapp.com",
    projectId: "react-chat-a9158",
    storageBucket: "react-chat-a9158.appspot.com",
    messagingSenderId: "785374276408",
    appId: "1:785374276408:web:a77f6f79ed4a0cc8fc2fcd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()