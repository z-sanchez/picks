import React, {useContext, useEffect} from "react";
import Sidebar from "../layouts/Sidebar";
import {Outlet} from "react-router-dom";
import userContext from "../utilities/UserContext";
import {signOutApp} from "../firebase/firebase";


function AppInterface() {

    const context = useContext(userContext);
    let app = null;

    useEffect(() => {
        return function signOut() {
            signOutApp();
        }
    })

    if (context.user != null) { //don't show app unless logged in
        app = (
            <div className="container-fluid" id="appWrapper">
                <div className="row flex-row">
                    <Sidebar/>
                    <Outlet/>
                </div>
            </div>
        )
    }


    return app;
}

export default AppInterface;