import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyCl0z4PdhPaFZSdTDYbWlPQ6FuDjki7zbw",
  authDomain: "fitplus-3b3ee.firebaseapp.com",
  projectId: "fitplus-3b3ee",
  storageBucket: "fitplus-3b3ee.firebasestorage.app",
  messagingSenderId: "398510665650",
  appId: "1:398510665650:web:767f9076a5f7b6a40f7eab",
  measurementId: "G-R49SGYH740"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Auth com persistência usando AsyncStorage
const auth = Platform.OS === 'web' ? getAuth(app) : initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Inicializa o Firestore
const db = getFirestore(app);

export { app, auth, db };
