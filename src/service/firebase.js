import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import {getAuth, GoogleAuthProvider, GithubAuthProvider} from "firebase/auth";
import {getAnalytics} from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

export const analytics = getAnalytics(firebaseApp);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

