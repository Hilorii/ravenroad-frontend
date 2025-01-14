import React from "react";
import "./Register.css";
import logo from '../../assets/RRlogo.png';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    return (
        <div className="login-container1">
            <div className="login-card">
                <Link to="/">
                    <img src={logo} alt="Logo" className="login-logo" />
                </Link>
                <h2 className="login-title">Welcome Back!</h2>
                <p className="login-subtitle">Log in to continue</p>
                <form className="login-form">
                    <input type="email" placeholder="Email" className="login-input"/>
                    <input type="username" placeholder="Username" className="login-input"/>
                    <input type="password" placeholder="Password" className="login-input"/>
                    <input type="password" placeholder="Repeat Password" className="login-input"/>
                    <button type="submit" className="login-btn">
                        Log In
                    </button>
                </form>
                <div className="login-divider">
                    <span>OR</span>
                </div>
                <div className="social-login">
                    <button className="social-btn google-btn">Continue with Google</button>
                    <button className="social-btn facebook-btn">Continue with Facebook</button>
                </div>
                <div className='link2'>
                    <a href='/login1'>Zaloguj się!</a>
                </div>
            </div>
        </div>
    );
};

export default Register;
