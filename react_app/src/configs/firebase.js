// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbvYNfnxXd26P1EplA6eZ41WchB3ofR0w",
  authDomain: "matrimonialsite-e411f.firebaseapp.com",
  projectId: "matrimonialsite-e411f",
  storageBucket: "matrimonialsite-e411f.appspot.com",
  messagingSenderId: "391095129108",
  appId: "1:391095129108:web:c3a9c7e01e58c0e0408301",
  measurementId: "G-YFYTZ7KNMW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
