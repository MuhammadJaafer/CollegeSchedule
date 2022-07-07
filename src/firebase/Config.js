import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB5Y-W83DcRjmy5UILLTeLTc1aYtuAFG1Q",
  authDomain: "collegeschedule-5e988.firebaseapp.com",
  projectId: "collegeschedule-5e988",
  storageBucket: "collegeschedule-5e988.appspot.com",
  messagingSenderId: "717475807385",
  appId: "1:717475807385:web:228bc02f5c9761268f3808",
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const Timestamp = firebase.firestore.Timestamp;

//export
export { projectAuth, projectFirestore, Timestamp };
