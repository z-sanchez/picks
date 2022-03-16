import {initializeApp} from 'firebase/app';
import {doc, setDoc, getFirestore} from "firebase/firestore";
import {getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";

const firebase = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    projectId: 'picks-a4dce',
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});


const auth = getAuth();


//sign in and sign out functions

export async function createUserWithEmail(email, password) {
    const userDoc = {
        email: email,
        password: password,
        picks: '[]',
    }
    const database = getFirestore(firebase);
    const usersRef = doc(database, 'users', email);

    return createUserWithEmailAndPassword(auth, email, password).then(() => {
        setDoc(usersRef, userDoc);
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
