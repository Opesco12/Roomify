import firebase from "firebase/compat/app";
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBr4cwoTpRCm553rIdyLN0lt0ENAL3LtpI",
  authDomain: "roomify-edf0a.firebaseapp.com",
  projectId: "roomify-edf0a",
  storageBucket: "roomify-edf0a.appspot.com",
  messagingSenderId: "756624729565",
  appId: "1:756624729565:web:75f5e16cb5613626298234",
  measurementId: "G-R7J0X3R45P",
};

const app = firebase.initializeApp(firebaseConfig);

const storage = getStorage(app);
export const db = getFirestore(app);

export const storageRef = ref(storage);
