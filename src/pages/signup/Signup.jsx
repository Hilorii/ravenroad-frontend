import React, { useState } from 'react';
import '../login/login.css';
import './signup.css'
import logo from '../../assets/RRlogo.png'; // Zaktualizuj ścieżkę do obrazka
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const SignupPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
        axios.post('http://localhost:5000/Signup', formData) // Sprawdź, czy URL jest poprawny
            .then(response => {
                if (response && response.data) {
                    alert('User signed up successfully');
                    navigate('/');
                } else {
                    alert('Unexpected response format');
                }
            })
            .catch(error => {
                console.error('There was an error signing up!', error);
                if (error.response && error.response.data) {
                    alert('Sign up failed: ' + error.response.data);
                } else {
                    alert('Sign up failed: An unexpected error occurred');
                }
            });
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
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            placeholder="Powtórz hasło"
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
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
