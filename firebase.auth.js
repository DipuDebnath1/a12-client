// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBr6dvGNIdFUPs1tgZMqepSa0TSzSfcpy4",
  authDomain: "event-management-9b814.firebaseapp.com",
  projectId: "event-management-9b814",
  storageBucket: "event-management-9b814.appspot.com",
  messagingSenderId: "318295050979",
  appId: "1:318295050979:web:4749045419da2d382193d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth
