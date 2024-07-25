import React from 'react';
import { useState } from 'react';
import './login.css';
import logo from '../../assets/RRlogo.png';

// document.getElementById('togglePassword').addEventListener('click', function () {
//     const passwordInput = document.getElementById('password');
//     const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
//     passwordInput.setAttribute('type', type);
//     this.textContent = type === 'password' ? 'Pokaż' : 'Ukryj';
// });

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
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type='button' id='togglePassword'>Pokaż</button>
                    </div>
                    <button className='logIn' type="submit">Zaloguj się</button>
                    <div className='link1'>
                        <a href=''>Zapomniałeś hasła?</a>
                    </div>
                    <div className='link2'>
                        <a href=''>Zarejestruj się!</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;