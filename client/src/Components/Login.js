import React from "react";
import '../Assets/Styles/login.css';
import graphic from '../Assets/Images/footballGraphic.png';


function Login() {

    return (
        <div className="loginWrapper">
            <div className="container-fluid p-0 h-100 w-100 d-flex align-items-center justify-content-center">
                <div className="row justify-content-center align-content-lg-center w-100 h-100 content--background">
                    <div className="graphic__background col-lg-3 d-flex flex-lg-column justify-content-center justify-content-lg-start">
                        <img src={graphic}  id="footballGraphic" alt="football player graphic"/>
                        <button className="buttons">Sign Up</button>
                    </div>
                    <form className="col-lg-5 px-4 px-lg-5 d-flex flex-column justify-content-start">
                        <h1>Login</h1>
                        <div className="textBar"/>
                        <label className="mt-5" htmlFor="username">
                            Username
                        </label>
                        <input type="text"/>
                        <label className="mt-3" htmlFor="password">
                            Password
                        </label>
                        <input type="text"/>
                        <button className="buttons mt-5 mt-lg-auto">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default Login;