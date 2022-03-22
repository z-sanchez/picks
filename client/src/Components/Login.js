import React, {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import {prepForm, authStatus} from "../utilities/domManipulators";
import {signInWithEmail, createUserWithEmail} from "../firebase/firebase";
import graphic from '../Assets/Images/footballGraphic.png';

const Login = (props) => {


    const [loggingIn, setLoggingIn] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (props.user != null) navigate('/app/picks');
    });

    function changeForm() {
        prepForm(!loggingIn);
        setLoggingIn(!loggingIn);
    }

    async function handleSubmit() {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        if (email == null || email === ""|| password == null || password === "") return;

        if (loggingIn) {
            await signInWithEmail(email, password).then(() => {
                console.log("logged in");
            }).catch((err) => authStatus(true));
        }
        else {
            await createUserWithEmail(email, password).then(() => {
                authStatus(false);
            }).catch((err) => {console.log(err); authStatus(true);});
        }
    }

    return (
        <div className="loginWrapper">
            <div className="container-fluid p-0 h-100 w-100 d-flex align-items-center justify-content-center">
                <div className="row justify-content-center align-content-lg-center w-100 h-100 content--background">
                    <div className="graphic__background col-lg-3 d-flex flex-lg-column justify-content-center justify-content-lg-start">
                        <img src={graphic}  id="footballGraphic" alt="football player graphic"/>
                        <button className="buttons" onClick={() => {changeForm();}}>Sign Up</button>
                    </div>
                    <form className="col-lg-5 px-4 px-lg-5 d-flex flex-column justify-content-start">
                        <div id="loginStatus__header" className="d-flex align-items-center justify-content-between">
                            <h1 id="login__header">Login</h1>
                            <p id="login__status" className="text-center px-2 py-1">Invalid email or password</p>
                        </div>
                        <div className="textBar"/>
                        <label className="mt-5" htmlFor="username">
                            Email
                        </label>
                        <input type="text" id="email"/>
                        <label className="mt-3" htmlFor="password">
                            Password
                        </label>
                        <input type="text" id="password"/>
                        <button className="buttons mt-5 mt-lg-auto" onClick={(e) => {e.preventDefault(); handleSubmit()}}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default Login;