import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBtw2A7wTPRUuRdsRD4tFUDGIAYB5_PdRM",
  authDomain: "linkedin-clone-1-6eb38.firebaseapp.com",
  projectId: "linkedin-clone-1-6eb38",
  storageBucket: "linkedin-clone-1-6eb38.appspot.com",
  messagingSenderId: "117592491650",
  appId: "1:117592491650:web:d58aa8f31aea85202fd69b",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };