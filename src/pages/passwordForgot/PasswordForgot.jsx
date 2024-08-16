import React, { useState } from 'react';
import '../login/login.css';
import logo from '../../assets/RRlogo.png';

const PasswordForgot = () => {
    const [email, setEmail] = useState('');

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Tutaj można dodać logikę logowania
        console.log('Email:', email);
    };

    return (
        <div className="bg">
            <div className="login-container">
                <img src={logo} alt="Logo" className="login-logo" />
                <h1 className="h">Zapomniałeś hasła?</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            className="input"
                            placeholder="Email"
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
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
