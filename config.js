import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3Q711VhMAhxd-DXZhTXJJyUcXlB3ptMI",
  authDomain: "classvault-6db62.firebaseapp.com",
  projectId: "classvault-6db62",
  storageBucket: "classvault-6db62.appspot.com",
  messagingSenderId: "491491068652",
  appId: "1:491491068652:web:69bd8f9d02a8625123f3c9",
  measurementId: "G-GME1PPB2YE",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
