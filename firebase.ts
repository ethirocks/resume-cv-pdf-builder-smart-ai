import { Platform } from 'react-native';
import Constants from 'expo-constants';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/app-check';

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.FIREBASE_API_KEY || 'YOUR_DEFAULT_API_KEY',
  authDomain: Constants.expoConfig?.extra?.FIREBASE_AUTH_DOMAIN || 'YOUR_DEFAULT_AUTH_DOMAIN',
  projectId: Constants.expoConfig?.extra?.FIREBASE_PROJECT_ID || 'YOUR_DEFAULT_PROJECT_ID',
  storageBucket: Constants.expoConfig?.extra?.FIREBASE_STORAGE_BUCKET || 'YOUR_DEFAULT_STORAGE_BUCKET',
  messagingSenderId: Constants.expoConfig?.extra?.FIREBASE_MESSAGING_SENDER_ID || 'YOUR_DEFAULT_MESSAGING_SENDER_ID',
  appId: Constants.expoConfig?.extra?.FIREBASE_APP_ID || 'YOUR_DEFAULT_APP_ID',
  measurementId: Constants.expoConfig?.extra?.FIREBASE_MEASUREMENT_ID || 'YOUR_DEFAULT_MEASUREMENT_ID',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

if (Platform.OS === 'web') {
  const recaptchaSiteKey = Constants.expoConfig?.extra?.RECAPTCHA_SITE_KEY || 'YOUR_DEFAULT_RECAPTCHA_SITE_KEY';
  if (!recaptchaSiteKey) {
    throw new Error('RECAPTCHA_SITE_KEY is not defined');
  }

  const appCheck = firebase.appCheck();
  appCheck.activate(recaptchaSiteKey, true);
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { auth, firestore, storage };
export default firebase;
