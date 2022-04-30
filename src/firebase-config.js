// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBU6vu9HIl6c8jAA1cbj-1VOHywVXXBGVU",
  authDomain: "intern-project-91012.firebaseapp.com",
  projectId: "intern-project-91012",
  storageBucket: "intern-project-91012.appspot.com",
  messagingSenderId: "270063411883",
  appId: "1:270063411883:web:f9f163b1d3ae08b01e0dee",
  measurementId: "G-79F8SRJCMJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//exported auth function
export const auth = getAuth(app);