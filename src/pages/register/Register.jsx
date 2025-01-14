import React, { useState, useEffect } from 'react';
import "./Register.css";
import logo from '../../assets/RRlogo.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const location = useLocation();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Stan na sukces
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state && location.state.email) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                email: location.state.email
            }));
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Hasła nie są zgodne.');
            setSuccessMessage('');
            return;
        }

        setErrorMessage('');
        setSuccessMessage('');

        axios.post('http://localhost:5000/Signup', formData)
            .then(response => {
                if (response && response.data) {
                    setSuccessMessage('Użytkownik został pomyślnie zarejestrowany.');
                    setTimeout(() => navigate('/login'), 2500);
                } else {
                    setErrorMessage('Nieoczekiwany format odpowiedzi');
                }
            })
            .catch(error => {
                console.error('Wystąpił błąd podczas rejestracji!', error);
                if (error.response && error.response.data && error.response.data.error) {
                    setErrorMessage(error.response.data.error);
                } else {
                    setErrorMessage('Rejestracja nie powiodła się: konto z takim emailem już istnieje');
                }
            });
    };

    // Funkcja logowania przez Google
    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:5000/auth/google'; // Przekierowanie do Google OAuth
    };

    // Funkcja logowania przez Facebook
    const handleFacebookLogin = () => {
        window.location.href = 'http://localhost:5000/auth/facebook'; // Przekierowanie do Facebook OAuth
    };

    return (
        <div className="login-container1">
            <div className="login-card">
                <Link to="/">
                    <img src={logo} alt="Logo" className="login-logo" />
                </Link>
                <h2 className="login-title">Welcome Back!</h2>
                <p className="login-subtitle">Log in to continue</p>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="login-input"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="username"
                        placeholder="Username"
                        className="login-input"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="login-input"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder="Repeat Password"
                        className="login-input"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    <button type="submit" className="login-btn">
                        Sign Up
                    </button>
                </form>
                <div className="login-divider">
                    <span>OR</span>
                </div>
                <div className="social-login">
                    <button className="social-btn google-btn" onClick={handleGoogleLogin}>Continue with Google</button>
                    <button className="social-btn facebook-btn" onClick={handleFacebookLogin}>Continue with Facebook</button>
                </div>
                <div className="link2">
                    <a href="/login">Zaloguj się!</a>
                </div>
            </div>
        </div>
    );
};

export default Register;
