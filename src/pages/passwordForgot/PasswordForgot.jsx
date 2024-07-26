import React from 'react';
import { useState } from 'react';
import '../login/login.css';
import logo from '../../assets/RRlogo.png';


const PasswordForgot = () => {
    const email = '';

    const handleSubmit = (event) => {
        event.preventDefault();
        // Tutaj można dodać logikę logowania
        console.log('Username:', email);

    };

    return (
        <div className="bg">
            <div className="login-container">
                <img src={logo} alt="Logo" className="login-logo"/>
                <h1>Zapomniałeś hasła?</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            placeholder="Email"
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                        />
                    </div>

                    <button className='logIn' type="submit">Zresetuj hasło</button>
                    <div className='link1'>
                        <a href='/login'>Zaloguj się!</a>
                    </div>
                    <div className='link2'>
                        <a href='/Signup'>Zarejestruj się!</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PasswordForgot;