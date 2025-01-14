import React from "react";
import logo from '../../assets/RRlogo.png';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    return (
        <div className="login-container1">
            <div className="login-card">
                <Link to="/">
                    <img src={logo} alt="Logo" className="login-logo" />
                </Link>
                <h2 className="login-title">Zresetuj hasło!</h2>
                <p className="login-subtitle">Wpisz swój email</p>
                <form className="login-form">
                    <input type="email" placeholder="Email" className="login-input"/>
                    <button type="submit" className="login-btn">
                        Zresetuj hasło
                    </button>
                </form>
                <div className='link1'>
                    <a><Link to="../login1">Zaloguj się!</Link></a>
                </div>
                <div className='link2'>
                    <a href='/register'>Zarejestruj się!</a>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
