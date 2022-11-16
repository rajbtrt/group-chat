import firebase from "firebase/compat/app";


export function firebaseInitConfig() {
  const firebaseConfig = {
    apiKey: "AIzaSyAa0hzodNGiZ9x78cncUr4_0c3THOhy0pY",
    authDomain: "group-chat-294f9.firebaseapp.com",
    projectId: "group-chat-294f9",
    storageBucket: "group-chat-294f9.appspot.com",
    messagingSenderId: "71372625186",
    appId: "1:71372625186:web:12ed6e50b8a183ccac017b",
    measurementId: "G-KJSH8PXFLK"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}