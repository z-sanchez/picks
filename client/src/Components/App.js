import React, {useEffect, useState} from "react";
import UserContext from "../utilities/UserContext";
import Login from "./Login";
import {signOutApp} from "../firebase/firebase";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PicksInterface from "./PicksInterface";
import AppInterface from "./AppInterface";
import StatsInterface from "./StatsInterface";
import GroupsInterface from "./GroupsInterface";

function App() {

    const [user, setUser] = useState(null);


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