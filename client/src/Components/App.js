import React from "react";
import Login from "./Login";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PicksInterface from "./PicksInterface";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/app' element={<PicksInterface/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;