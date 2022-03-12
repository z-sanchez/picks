import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

let firebase = null;
let auth = null;

export function startFirebase() {
    firebase = initializeApp({
        apiKey: "AIzaSyCabSeDzxW6Fwy-LMa1gd_ss_FJ66sESfY",
        authDomain: "picks-a4dce.firebaseapp.com",
        projectId: "picks-a4dce",
        storageBucket: "picks-a4dce.appspot.com",
        messagingSenderId: "943991013399",
        appId: "1:943991013399:web:c38353472c73f2fbef9c52",
        measurementId: "G-Q282JJ1M2S"
    });
   // const database = getFirestore(firebaseApp);
    auth = getAuth();
}


//signing into firebase with demo credentials
export async function signInWithEmail() {
    createUserWithEmailAndPassword(auth, "demo@gmail.com", "demo123")
        .then((userCredential) => {
            console.log(userCredential);
        })
}

export async function signOut() {
    try {
        await firebase.auth().signOut();
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