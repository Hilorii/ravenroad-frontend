import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import './login.css';
import logo from '../../assets/RRlogo.png';
import { Link } from 'react-router-dom';

const LoginPage = () => {


    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
        axios.post('http://localhost:3000/login', formData) // Sprawdź, czy URL jest poprawny
            .then(response => {
                if (response && response.data) {
                    alert('User logged in successfully');
                    // Możesz tu dodać logikę przekierowania do innej strony po zalogowaniu
                } else {
                    alert('Unexpected response format');
                }
            })
            .catch(error => {
                console.error('There was an error logging in!', error);
                if (error.response && error.response.data) {
                    alert('Login failed: ' + error.response.data);
                } else {
                    alert('Login failed: An unexpected error occurred');
                }
            });
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
                            placeholder="Email"
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group password">
                        <input
                            placeholder="Hasło"
                            //type={showPassword ? "text" : "password"}
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
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