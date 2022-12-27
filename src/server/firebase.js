import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, child } from "firebase/database";
import "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyCPyN4bHblGLX-miAfr1-XYHuMFyOvMAqg",
  authDomain: "slack-clone-73b7b.firebaseapp.com",
  projectId: "slack-clone-73b7b",
  storageBucket: "slack-clone-73b7b.appspot.com",
  messagingSenderId: "213037357193",
  appId: "1:213037357193:web:35800f39d061d3134f4e58",
  measurementId: "G-QWKD3RQ0K5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase();
export default { app, auth, database, ref, child };
