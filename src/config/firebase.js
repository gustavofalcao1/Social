import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCdr7apGrxOsnBCvvfAljYX6Zk4KFgFflM",
  authDomain: "social-a597f.firebaseapp.com",
  projectId: "social-a597f",
  storageBucket: "social-a597f.appspot.com",
  messagingSenderId: "229264155720",
  appId: "1:229264155720:web:d5c6dfc7ab63a4098fe47d",
  measurementId: "G-RKGWHSK5GK"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
