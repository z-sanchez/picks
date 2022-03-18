import {initializeApp} from 'firebase/app';
import {doc, setDoc, getDoc, updateDoc, getFirestore} from "firebase/firestore";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {getUserCache} from "./userCache";

const firebase = initializeApp({
    
});


//sign in and sign out functions

export async function createUserWithEmail(email, password) {
    const userDoc = {
        email: email,
        password: password,
        picks: '[]',
    }
    const database = getFirestore(firebase);
    const usersRef = doc(database, 'users', email);

    return createUserWithEmailAndPassword(getAuth(), email, password).then(() => {
        setDoc(usersRef, userDoc);
    });
}


//sign in to firebase with demo credentials
export async function signInWithEmail(email, password) {
    console.log("sign in called");
    return signInWithEmailAndPassword(getAuth(), email, password);
}


export async function signOutApp() {
    try {
        await signOut(getAuth()).then(() => {
            console.log("signed out");
        });
    } catch (error) {
        console.log(error.message);
    }
}


export async function getUserPicks(username) {
    const database = getFirestore(firebase);
    const docRef = doc(database, "users", username);
    const docSnap = await getDoc(docRef);

    return JSON.parse(docSnap.data().picks);
}

export async function submitUserPicks(username) {
    const database = getFirestore(firebase);
    const docRef = doc(database, "users", username);
    const data = {picks: JSON.stringify(getUserCache())};

    await updateDoc(docRef, data);
}