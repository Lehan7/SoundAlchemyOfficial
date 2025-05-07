//config/firebase.ts
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBs1w_atHqT69AXbwOzhdhJiHuig4L-Hkg",
  authDomain: "sound-alchemy-app.firebaseapp.com",
  projectId: "sound-alchemy-app",
  storageBucket: "sound-alchemy-app.firebasestorage.app",
  messagingSenderId: "548443037509",
  appId: "1:548443037509:web:39fa88df560481fa26282c",
  measurementId: "G-VGZ6PE9421",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase App initialized:", app.name);

export default app;
