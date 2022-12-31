// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
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

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

const channel = new BroadcastChannel("my-channel");

// nhận được thông báo when k sử dụng web (đang ở web khác hoặc màn hình desktop)

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  channel.postMessage({
    type: "message-from-sw",
    payload: payload.notification,
  });

  self.registration.showNotification(notificationTitle, notificationOptions);
});
