import React, { useState, useContext, useEffect } from 'react';
import "./Login1.css";
import logo from '../../assets/RRlogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import axios from 'axios';

const Login1 = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // ---------------------------
    //  Submit (logowanie)
    // ---------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prosta walidacja na froncie:
        if (!formData.email || !formData.password) {
            setErrorMessage('Proszę wypełnić oba pola (email i hasło).');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:5000/login',
                formData,
                { withCredentials: true }
            );

            if (response && response.data) {
                const { token } = response.data;
                // Ustawiamy ciasteczko (choć mamy też httpOnly):
                document.cookie = `token=${token}; path=/`;

                // Pobierz dane użytkownika z /user
                const userResponse = await axios.get(
                    'http://localhost:5000/user',
                    { withCredentials: true }
                );

                if (userResponse && userResponse.data) {
                    setUser(userResponse.data);
                    navigate('/');
                } else {
                    setErrorMessage('Unexpected response format');
                }
            } else {
                setErrorMessage('Unexpected response format');
            }
        } catch (error) {
            console.error('There was an error logging in!', error);
            if (error.response && error.response.data) {
                setErrorMessage('Login failed: ' + error.response.data.message);
            } else {
                setErrorMessage('Login failed: An unexpected error occurred');
            }
        }
    };

    // ---------------------------
    //  Pokaż / ukryj hasło
    // ---------------------------
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // ----------------------------
    //   Logowanie Google/Facebook
    // ----------------------------
    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:5000/auth/google';
    };

    const handleFacebookLogin = () => {
        window.location.href = 'http://localhost:5000/auth/facebook';
    };

    // ---------------------------
    //   Obsługa tokenu z OAuth
    // ---------------------------
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (token) {
            document.cookie = `token=${token}; path=/`;

            axios
                .get('http://localhost:5000/user', { withCredentials: true })
                .then((response) => {
                    if (response.data) {
                        setUser(response.data);
                        navigate('/');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user:', error);
                });
        }
    }, [navigate, setUser]);

    return (
        <div className="login-container1">
            <div className="login-card">
                <Link to="/">
                    <img src={logo} alt="Logo" className="login-logo" />
                </Link>
                <h2 className="login-title">Welcome Back!</h2>
                <p className="login-subtitle">Log in to continue</p>

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
                        placeholder="Password"
                        className="login-input"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <button
                        type="button"
                        id="togglePassword"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? 'Ukryj' : 'Pokaż'}
                    </button>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <button type="submit" className="login-btn">
                        Log In
                    </button>
                </form>

                <div className="login-divider">
                    <span>OR</span>
                </div>
                <div className="social-login">
                    <button className="social-btn google-btn" onClick={handleGoogleLogin}>
                        Continue with Google
                    </button>
                    <button
                        className="social-btn facebook-btn"
                        onClick={handleFacebookLogin}
                    >
                        Continue with Facebook
                    </button>
                </div>

                <div className="link1">
                    <Link to="../password-reset">Zapomniałeś hasła?</Link>
                </div>
                <div className="link2">
                    <Link to="/register">Zarejestruj się!</Link>
                </div>
            </div>
        </div>
    );
};

export default Login1;
