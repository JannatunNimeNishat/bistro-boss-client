// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_apiKey,
  authDomain:import.meta.env.VITE_authDomain,
  projectId:import.meta.env.VITE_projectId,
  storageBucket:import.meta.env.VITE_storageBucket,
  messagingSenderId:import.meta.env.VITE_messagingSenderId,
  appId:import.meta.env.VITE_appId

  
  /* apiKey: "AIzaSyDikLprKrQ7Xk03bSx2HvFMHEvccl2wg3g",
  authDomain: "bistro-boss-5cadd.firebaseapp.com",
  projectId: "bistro-boss-5cadd",
  storageBucket: "bistro-boss-5cadd.appspot.com",
  messagingSenderId: "660722855570",
  appId: "1:660722855570:web:13dd71548012399311004b" */
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;