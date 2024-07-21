import { initializeApp } from "firebase/app";
// import firebase from "firebase/compat/app";
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyA_UO3Qva6IHvlRqnw_Xlg082Zu-k0JYWo",
  authDomain: "roomify-79728.firebaseapp.com",
  projectId: "roomify-79728",
  storageBucket: "roomify-79728.appspot.com",
  messagingSenderId: "222090450660",
  appId: "1:222090450660:web:12fb4ae6e6b5f049903ef1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
export const db = getFirestore(app);

export const storageRef = ref(storage);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
