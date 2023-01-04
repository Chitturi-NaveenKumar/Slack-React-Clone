import firebase from "firebase";

import "firebase/auth";
import "firebase/storage";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyCPyN4bHblGLX-miAfr1-XYHuMFyOvMAqg",
  authDomain: "slack-clone-73b7b.firebaseapp.com",
  databaseURL: "https://slack-clone-73b7b-default-rtdb.firebaseio.com/",
  projectId: "slack-clone-73b7b",
  storageBucket: "slack-clone-73b7b.appspot.com",
  messagingSenderId: "213037357193",
  appId: "1:213037357193:web:35800f39d061d3134f4e58",
  measurementId: "G-QWKD3RQ0K5",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
