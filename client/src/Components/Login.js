import React from "react";
import '../Assets/Styles/login.css';


function Login() {

    return (
        <div className="container-fluid fullVH wittenBackground">
            <div className="row justify-content-end align-items-end h-100">
                <div className="background--primaryColor background--slanted w-100 w-md-auto">
                    <form id="loginForm"
                          className="d-flex flex-column align-items-center align-items-md-start justify-content-start">
                        <h1 id="logoType" className="text-center w-100 mb-5">Picks</h1>
                        <div
                            className="w-100 d-flex flex-column align-items-center align-items-md-start justify-content-center justify-content-md-start">
                            <h1 className="textShadow">LOGIN</h1>
                            <p className="mb-2 secondaryText">Need an account?</p>
                            <label className="accentText mt-5 mb-3 textShadow">Username</label>
                            <input type="text" name="username" className="loginForm__text py-1 mb-3"
                                   id="enterUsername"/>
                            <label className="accentText mt-5 mb-3 textShadow">Password</label>
                            <input type="text" name="username" className="loginForm__text py-1 mb-5"
                                   id="enterUsername"/>
                            <button id="loginButton" className="mt-4 p-3 boxShadow">LOGIN</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default Login;