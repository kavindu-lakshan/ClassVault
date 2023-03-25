import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmpT-T7VCvh6lqxq1RD249eQvV5Be7QD4",
  authDomain: "sample-crud-4ec0b.firebaseapp.com",
  projectId: "sample-crud-4ec0b",
  storageBucket: "sample-crud-4ec0b.appspot.com",
  messagingSenderId: "354429157919",
  appId: "1:354429157919:web:1c8480d93eb008a4c30b2a",
  measurementId: "G-W0EZZSPWR9"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
