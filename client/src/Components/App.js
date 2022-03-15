import React from "react";
import Login from "./Login";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PicksInterface from "./PicksInterface";
import AppInterface from "./AppInterface";
import StatsInterface from "./StatsInterface";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/app' element={<AppInterface/>}>
                    <Route path="picks" element={<PicksInterface/>}/>
                    <Route path="stats" element={<StatsInterface/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;