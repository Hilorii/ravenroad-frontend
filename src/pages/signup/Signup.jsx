import React, { useState } from 'react';
import '../login/login.css';
import './signup.css'
import logo from '../../assets/RRlogo.png'; // Zaktualizuj ścieżkę do obrazka
import { Link } from 'react-router-dom';


const SignupPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implementacja logiki rejestracji, np. walidacja danych, wysłanie do serwera itp.
        console.log('Form data submitted:', formData);
    };

    return (
        <div className="bg">
            <div className="login-container">
                <img src={logo} alt="Logo"/>
                <h1>Dołącz do nas!</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            placeholder="Nazwa użytkownika"
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            placeholder="Email"
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            placeholder="Hasło"
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                        />
                    </div>
                    <div>
                        <input
                            placeholder="Powtórz hasło"
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                        />
                    </div>
                    <button className='logIn' type="submit">Zarejestruj się</button>
                    <div className='link2'>
                        <a href='/login'>Zaloguj się!</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
