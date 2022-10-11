import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAydFzXWkpbJMHeFSpkOEEfxVv3PG-dv3o",
  authDomain: "movie-clone-50ae6.firebaseapp.com",
  databaseURL: "https://movie-clone-50ae6-default-rtdb.firebaseio.com",
  projectId: "movie-clone-50ae6",
  storageBucket: "movie-clone-50ae6.appspot.com",
  messagingSenderId: "624345456391",
  appId: "1:624345456391:web:9c41c8ce0c5c52f166afa2",
  measurementId: "G-DRWQ6LWLGK",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// getFirestore(app);
export const authentication = getAuth(app);
