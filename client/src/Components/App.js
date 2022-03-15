import React, {useEffect} from "react";
import Login from "./Login";
import {signOutApp} from "../firebase/firebase";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PicksInterface from "./PicksInterface";
import AppInterface from "./AppInterface";
import StatsInterface from "./StatsInterface";
import GroupsInterface from "./GroupsInterface";

function App() {

    useEffect(() => {
        return function signOut() {
            signOutApp();
        }
    })

    return (
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
    );
}

export default App;