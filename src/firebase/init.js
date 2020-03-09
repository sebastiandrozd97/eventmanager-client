import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: YOUR_FIREBASE_CONFIGURATION,
  authDomain: YOUR_FIREBASE_CONFIGURATION,
  databaseURL: YOUR_FIREBASE_CONFIGURATION,
  projectId: YOUR_FIREBASE_CONFIGURATION,
  storageBucket: YOUR_FIREBASE_CONFIGURATION,
  messagingSenderId: YOUR_FIREBASE_CONFIGURATION,
  appId: YOUR_FIREBASE_CONFIGURATION,
  measurementId: YOUR_FIREBASE_CONFIGURATION
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();