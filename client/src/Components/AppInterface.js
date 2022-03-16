import React, {useContext, useEffect} from "react";
import Sidebar from "../layouts/Sidebar";
import {Outlet, useNavigate} from "react-router-dom";
import userContext from "../utilities/UserContext";


function AppInterface() {

    const context = useContext(userContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (context.user === null) navigate('/');
    })


    if (context.user != null) { //don't show app unless logged in
        return (
            <div className="container-fluid" id="appWrapper">
                <div className="row flex-row">
                    <Sidebar/>
                    <Outlet/>
                </div>
            </div>
        )
    }
    
    return null;
}

export default AppInterface;