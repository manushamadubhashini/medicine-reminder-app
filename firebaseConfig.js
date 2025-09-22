import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAdcd-GY212TeJWLp03u6gVkcemSVFLALM",
  authDomain: "medicine-reminder-app-54657.firebaseapp.com",
  projectId: "medicine-reminder-app-54657",
  storageBucket: "medicine-reminder-app-54657.firebasestorage.app",
  messagingSenderId: "791144219842",
  appId: "1:791144219842:web:629b000b38eef8e9b4a75b",
  measurementId: "G-KZCY9EXX9E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// ✅ Initialize Auth with AsyncStorage persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firestore
export const db = getFirestore(app);
