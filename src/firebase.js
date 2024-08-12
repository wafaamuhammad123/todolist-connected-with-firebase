// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//first step=> initialize firebase
const firebaseConfig = {
  apiKey: "AIzaSyCpXvdoYJQdRKFVu3F3V2uUNG-pnztLp8I",
  authDomain: "todolist-2e670.firebaseapp.com",
  databaseURL: "https://todolist-2e670-default-rtdb.firebaseio.com",
  projectId: "todolist-2e670",
  storageBucket: "todolist-2e670.appspot.com",
  messagingSenderId: "383137723863",
  appId: "1:383137723863:web:0a9f3476eeae65f64cc792",
  measurementId: "G-ZH3LCG55WG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app)
const database = getDatabase(app);

export { auth, database ,analytics};