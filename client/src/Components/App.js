import React from "react";
import Login from "./Login";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import WeekController from "./WeekController";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/app' element={<WeekController/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;