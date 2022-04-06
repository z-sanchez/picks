import React, {useEffect, useState} from "react";
import {onAuthStateChanged, getAuth} from "firebase/auth";
import Login from "./Login";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PicksInterface from "./PicksInterface";
import AppInterface from "./AppInterface";
import StatsInterface from "./StatsInterface";
import GroupsInterface from "./GroupsInterface";
import {setUserCache} from "../firebase/userCache";
import {getUserPicks} from "../firebase/firebase";

function App() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), (userResponse) => { //firebase event listener for user's login state
            if (userResponse) { //user logged in
                setUserCache(getUserPicks(userResponse.email)).then(() => setUser(userResponse.email)); //get user's data from firestore and fill cache, then set state to name of user
            } else {
                setUser(null);
            }
        });
        return unsubscribe;
    });


    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login user={user}/>}/>
                <Route path='/app' element={<AppInterface user={user}/>}>
                    <Route path="picks" element={<PicksInterface/>}/>
                    <Route path="stats" element={<StatsInterface/>}/>
                    <Route path="groups" element={<GroupsInterface/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

