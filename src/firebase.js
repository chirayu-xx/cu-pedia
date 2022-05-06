// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, FacebookAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEZnQtgbgeTq_-92b6KheEQthuCZECXIc",
  authDomain: "quora-20d16.firebaseapp.com",
  projectId: "quora-20d16",
  storageBucket: "quora-20d16.appspot.com",
  messagingSenderId: "704203748301",
  appId: "1:704203748301:web:81050dee7015a65b564a84",
  measurementId: "G-2P0G7EJ082"
};


// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth()
const provider = new GoogleAuthProvider()
const provider2 = new FacebookAuthProvider()
 export{auth,provider, provider2}
