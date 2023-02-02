import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAgsMNJ80icfwcQr3EB_KGmAMJrIlNveuw",
    authDomain: "meetme-chatapp.firebaseapp.com",
    projectId: "meetme-chatapp",
    storageBucket: "meetme-chatapp.appspot.com",
    messagingSenderId: "1013927012939",
    appId: "1:1013927012939:web:be0ec84e7a8d9fb6ef7bce"
};

// Use this to initialize the firebase App
const firebaseApp =firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };

