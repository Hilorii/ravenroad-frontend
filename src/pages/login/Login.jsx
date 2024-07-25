import React from 'react';
import { useState } from 'react';
import './login.css';
import logo from '../../assets/RRlogo.png';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Tutaj można dodać logikę logowania
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <div className="bg">
            <div className="login-container">
                <img src={logo} alt="Logo" className="login-logo"/>
                <h1>Witaj ponownie!</h1>
                <h2>Jesteś gotowy na podróż?</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Nazwa użytkownika:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Hasło:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;