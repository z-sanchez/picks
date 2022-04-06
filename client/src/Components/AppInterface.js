import React, {useEffect, useState} from "react";
import Sidebar from "../layouts/Sidebar";
import {Outlet, useNavigate} from "react-router-dom";
import UserContext from "../utilities/UserContext";
import {setUserCache} from "../firebase/userCache";
import {getUserPicks} from "../firebase/firebase";


const AppInterface = (props) => {

    const [showUser, setShowUser] = useState(props.user); //showUser is which user's data should be displayed
    const navigate = useNavigate();

    useEffect(() => {
        if (props.user === null) navigate('/'); //if no one logged in, return to login page
    });

    async function updateUser(name) { //updates showUser, this is used when user wants to view another's picks or stats
        await setUserCache(getUserPicks(name)); //fill cache with new user's data
        setShowUser(name);
    }

    if (showUser != null) { //don't show app unless logged in
        return (
            <UserContext.Provider value={{ //context allows for components to see show user, change show user, see current user logged into app
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