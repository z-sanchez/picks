import React, {useEffect, useState} from "react";
import UserContext from "../utilities/UserContext";
import {onAuthStateChanged, getAuth} from "firebase/auth";
import Login from "./Login";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PicksInterface from "./PicksInterface";
import AppInterface from "./AppInterface";
import StatsInterface from "./StatsInterface";
import GroupsInterface from "./GroupsInterface";

function App() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
            if (user) {
                setUser(user);
            }
            else {
                setUser(null);
            }
        });

        return unsubscribe;
    }, [user])


    function updateUser(name) {
        setUser(name);
    }

    let contextData = {
        user: user,
        updateUser: updateUser,
    }


    return (
        <UserContext.Provider value={contextData}>
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