import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAgsMNJ80icfwcQr3EB_KGmAMJrIlNveuw",
    authDomain: "meetme-chatapp.firebaseapp.com",
    projectId: "meetme-chatapp",
    storageBucket: "meetme-chatapp.appspot.com",
    messagingSenderId: "1013927012939",
    appId: "1:1013927012939:web:be0ec84e7a8d9fb6ef7bce"
};

let app;

if(firebase.apps.length === 0) {
    const firebaseApp = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };

