import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";


const firebase = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "picks-a4dce.firebaseapp.com",
    projectId: "picks-a4dce",
    storageBucket: "picks-a4dce.appspot.com",
    messagingSenderId: "943991013399",
    appId: "1:943991013399:web:c38353472c73f2fbef9c52",
    measurementId: "G-Q282JJ1M2S"
});

const auth = getAuth();


//sign in and sign out functions

export async function createUserWithEmail(email, password) {
    createUserWithEmailAndPassword(auth, "demo@gmail.com", "demo123")
        .then((userCredential) => {
            console.log(userCredential + "signed in");
        })
}


//sign into firebase with demo credentials
export async function signInWithEmail(email, password) {
    signInWithEmailAndPassword(auth,"demo@gmail.com", "demo123" )
        .then((userCredential) => {
            console.log(userCredential.user + "Logged In");
        })

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







// useEffect(() => { //checks to see if user has been logged in
//     const unsubscribe = seeAuthState().onAuthStateChanged((user) => {
//         if (user) {
//             setUser(user);
//         } else {
//             setUser(false);
//         }
//         if (initializing) {
//             setInitializing(false);
//         }
//     });
//
//     return unsubscribe;
// }, [initializing]);