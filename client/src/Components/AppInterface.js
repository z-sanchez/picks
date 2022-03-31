import React, {useEffect, useState} from "react";
import Sidebar from "../layouts/Sidebar";
import {Outlet, useNavigate} from "react-router-dom";
import UserContext from "../utilities/UserContext";
import {setUserCache} from "../firebase/userCache";
import {getUserPicks} from "../firebase/firebase";


const AppInterface = (props) => {

    const [showUser, setShowUser] = useState(props.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (props.user === null) navigate('/');
    });

    async function updateUser(name) {
        await setUserCache(getUserPicks(name));
        setShowUser(name);
    }

    if (showUser != null) { //don't show app unless logged in
        return (
            <UserContext.Provider value={{
                user: showUser,
                updateUser: updateUser,
                currentUser: props.user
            }}>
                <div className="container-fluid" id="appWrapper">
                    <div className="row flex-row content__height">
                        <Sidebar/>
                        <Outlet/>
                    </div>
                </div>
            </UserContext.Provider>
        )
    }

    return null;
}

export default AppInterface;