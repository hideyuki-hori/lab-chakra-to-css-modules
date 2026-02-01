import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCqPp4B-wy9l2leIUzZQGuo0Ct7hCf17KE",
  authDomain: "lab-chakra-to-css-modules.firebaseapp.com",
  projectId: "lab-chakra-to-css-modules",
  storageBucket: "lab-chakra-to-css-modules.firebasestorage.app",
  messagingSenderId: "220076567281",
  appId: "1:220076567281:web:46b5cb59c6388c13d25750"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export default app;
