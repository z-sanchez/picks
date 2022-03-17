import React, {useEffect, useState} from "react";
import UserContext from "../utilities/UserContext";
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

    const [user, setUser] = useState(null); //tells components whose info to render
    const [userUpdated, setUserUpdated] = useState(false);

    useEffect(() => {
        if (!userUpdated || (userUpdated === user)) { //runs at mount and at updateUser
            const unsubscribe = onAuthStateChanged(getAuth(), (userResponse) => {
                if (userUpdated && userResponse) { //if user has been updated and not signing out do nothing
                    return null;
                } else if (userResponse) { //if user is being set for mount
                    setUser(userResponse.email);
                } else { //if logged out clean userUpdated and user (don't know if I understand this completely. Logic with swtiching users and signing out while still returing async clean up confusing
                    setUserUpdated(false);
                    setUser(null);
                }
            });
            return unsubscribe;
        } else {
            setUser(userUpdated); //sets user equal to the updated request
        }
    }, [user, userUpdated]);


    function updateUser(name) {
        setUserCache(getUserPicks(name)).then(() => { //clear user cache on user change
            setUserUpdated(name);
        });
    }

    return (
        <UserContext.Provider value={{
            user: user,
            updateUser: updateUser,
        }}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login/>}/>
                    <Route path='/app' element={<AppInterface/>}>
                        <Route path="picks" element={<PicksInterface/>}/>
                        <Route path="stats" element={<StatsInterface/>}/>
                        <Route path="groups" element={<GroupsInterface/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;


