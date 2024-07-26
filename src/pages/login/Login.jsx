import React from 'react';
import { useState } from 'react';
import './login.css';
import logo from '../../assets/RRlogo.png';
import { Link } from 'react-router-dom';

const LoginPage = () => {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Tutaj można dodać logikę logowania
        console.log('Username:', username);
        console.log('Password:', password);
    };

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    return (
        <div className="bg">
            <div className="login-container">
                <img src={logo} alt="Logo" className="login-logo"/>
                <h1>Witaj ponownie!</h1>
                <h2>Jesteś gotowy na podróż?</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            placeholder="Nazwa użytkownika"
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group password">
                        <input
                            placeholder="Hasło"
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type='button' id='togglePassword' onClick={togglePasswordVisibility}>
                            {showPassword ? 'Ukryj' : 'Pokaż'}
                        </button>
                    </div>
                    <button className='logIn' type="submit">Zaloguj się</button>
                    <div className='link1'>
                        <a><Link to="../passwordForgot">Zapomniałeś hasła?</Link></a>
                    </div>
                    <div className='link2'>
                        <a href='/Signup'>Zarejestruj się!</a>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default LoginPage;