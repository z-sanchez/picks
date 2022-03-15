import {initializeApp} from 'firebase/app';
import { doc, setDoc } from "firebase/firestore";
import {getDatabase, set, ref} from "firebase/database";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";

const firebase = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
});

const auth = getAuth();


//sign in and sign out functions

export async function createUserWithEmail(email, password) {
    const userDoc = {
        email: email,
        password: password,
        picks: '[]',
    }
    const database = getDatabase();

    return createUserWithEmailAndPassword(auth, email, password).then(() => {
        set(ref(database, "users/" + "demo"), userDoc);
    });
}


//sign in to firebase with demo credentials
export async function signInWithEmail(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export async function signOutApp() {
    try {
        await signOut(auth).then(() => {
            console.log("signed out");
        });
    } catch (error) {
        console.log(error.message);
    }
}

