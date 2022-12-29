import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

import { getMessaging, getToken, onMessage } from "firebase/messaging";

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

// Initialize Firebase Cloud Messaging and get a reference to the service
export const messagingMovie = getMessaging(app);
// getToken(messaging, { vapidKey: process.env.REACT_APP_FIREBASE_FCM_VAPID_KEY });

export const getTokenPermision = () => {
  return getToken(messagingMovie, {
    vapidKey: process.env.REACT_APP_FIREBASE_FCM_VAPID_KEY,
  })
    .then((registrationToken) => {
      if (registrationToken) {
        console.log("current token for client: ", registrationToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
        return registrationToken;
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

// nhận thông báo when đang sử dụng web íte
// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       console.log({ payload });
//       resolve(payload);
//     });
//   });
