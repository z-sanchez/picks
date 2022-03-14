import React, {useState} from "react";
import {prepForm} from "../utilities/domManipulators";
import {signInWithEmail, createUserWithEmail} from "../firebase/firebase";
import '../Assets/Styles/login.css';
import graphic from '../Assets/Images/footballGraphic.png';

function Login() {

    const [loggingIn, setLoggingIn] = useState(true);


    function changeForm() {
        prepForm(!loggingIn);
        setLoggingIn(!loggingIn);
    }

    async function handleSubmit() {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        if (loggingIn) {
            await signInWithEmail(email, password).then(() => {
                console.log("Logged In!");
            }).catch((err) => console.log("Error: " + err));
        }
        else {
            await createUserWithEmail(email, password).then(() => {
                console.log("signed up!");
            }).catch((err) => console.log("Error: " + err));
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
                        <h1 id="login__header">Login</h1>
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