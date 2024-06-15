import { initializeApp } from "firebase/app";
// import firebase from "firebase/compat/app";
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAkixQUQdHt3D3vIGqoLmk2Khw8mwPogho",
  authDomain: "roomify-app.firebaseapp.com",
  projectId: "roomify-app",
  storageBucket: "roomify-app.appspot.com",
  messagingSenderId: "865879198101",
  appId: "1:865879198101:web:57fc82b5151acfddd48e9c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
export const db = getFirestore(app);

export const storageRef = ref(storage);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
