import {initializeApp} from "firebase/app";
import {
    doc,
    setDoc,
    getDoc,
    updateDoc,
    getFirestore,
} from "firebase/firestore";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import {getUserCache} from "./userCache";

const firebase = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    projectId: 'picks-a4dce',
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});

//sign in and sign out functions

export async function createUserWithEmail(email, password) {
    const userDoc = {
        email: email,
        password: password,
        picks: "[]",
        groups: [],
    };
    const database = getFirestore(firebase);
    const usersRef = doc(database, "users", email);

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


export async function submitUserPicks(username, year, week) { //pass year and week here so we can mark submit
    const database = getFirestore(firebase);
    const docRef = doc(database, "users", username);
    const data = {picks: JSON.stringify(getUserCache(year, week))};

    await updateDoc(docRef, data);
}


function createGroup(groupName) {
    const database = getFirestore(firebase);
    const groupsRef = doc(database, "groups", groupName);

    const userDoc = {
        members: [],
        name: groupName,
    }

    setDoc(groupsRef, userDoc);
}

async function addUserToGroup(user, group, groupName) {

    //adding user to group
    if (group.members.includes(user)) {
        console.log("already in group");
        return; //if user already in group
    }

    group.members.push(user);
    let newGroup = group;

    const database = getFirestore(firebase);
    const groupsRef = doc(database, "groups", groupName);

    setDoc(groupsRef, newGroup);


    //adding group to user data
    const docRef = doc(database, "users", user);
    const docSnap = await getDoc(docRef);

    let newUserData = docSnap.data();
    newUserData.groups.push(groupName);

    setDoc(docRef, newUserData);
}


export async function addGroup(groupName, user) {
    const database = getFirestore(firebase);
    const groupsRef = doc(database, "groups", groupName);
    const docSnap = await getDoc(groupsRef);

    if (docSnap.exists()) {
        await addUserToGroup(user, docSnap.data(), groupName);
    } else {
        createGroup(groupName);
        await addGroup(groupName, user);
    }
}

export async function getUsersGroups(user) {
    const database = getFirestore(firebase);
    const userDataRef = doc(database, "users", user);
    const docSnap = await getDoc(userDataRef);

    let userData = docSnap.data();
    userData = userData.groups;

    for (let i = 0; i < userData.length; i++) {
        userData[i] = await getGroup(userData[i]);
    }
    
    return userData;
}

async function getGroup(groupName) {
    const database = getFirestore(firebase);
    const groupsRef = doc(database, "groups", groupName);
    const docSnap = await getDoc(groupsRef);

    return docSnap.data();

}