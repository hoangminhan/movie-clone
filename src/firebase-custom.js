import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCIrxAHU2FSoIiVeCUKtjtWFhn5m5MA9ag",
  authDomain: "movie-demo-fe607.firebaseapp.com",
  projectId: "movie-demo-fe607",
  // storageBucket: "movie-demo-fe607.appspot.com",
  storageBucket: "gs://movie-demo-fe607.appspot.com",
  messagingSenderId: "796250366453",
  appId: "1:796250366453:web:68e59a7c1da86fa08880bc",
  measurementId: "G-THC1RP8P6G",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// getFirestore(app);
export const authentication = getAuth(app);

// Initialize Cloud Storage and get a reference to the service
export const storageMovie = getStorage(app);
