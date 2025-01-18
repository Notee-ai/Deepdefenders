// Import the required Firebase services
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAf8HEV-53ttqJZ_SphuUk1ztOgyKhfJlQ",
  authDomain: "deepdefenders.firebaseapp.com",
  projectId: "deepdefenders",
  storageBucket: "deepdefenders.appspot.com", // Fixed incorrect URL
  messagingSenderId: "166933792612",
  appId: "1:166933792612:web:a281ecdef8ca4ae6b0dc71",
  measurementId: "G-T4LQCS0JSH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Export Firebase services for use in the app
export { app, analytics, auth, provider, signInWithPopup };
