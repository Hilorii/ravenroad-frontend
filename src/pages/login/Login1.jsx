import { React, useState, useContext, useEffect } from 'react';
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data:', formData);

        try {
            const response = await axios.post('http://localhost:5000/login', formData, { withCredentials: true });

            if (response && response.data) {
                const { token } = response.data;
                document.cookie = `token=${token}; path=/`;

                const userResponse = await axios.get('http://localhost:5000/user', { withCredentials: true });

                if (userResponse && userResponse.data) {
                    setUser(userResponse.data);
                    navigate('/');
                } else {
                    alert('Unexpected response format');
                }
            } else {
                alert('Unexpected response format');
            }
        } catch (error) {
            console.error('There was an error logging in!', error);
            if (error.response && error.response.data) {
                // alert('Login failed: ' + error.response.data.message);
            } else {
                // alert('Login failed: An unexpected error occurred');
            }
        }
    };

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Funkcja logowania przez Google
    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:5000/auth/google'; // Przekierowanie do Google OAuth
    };

    // Funkcja logowania przez Facebook
    const handleFacebookLogin = () => {
        window.location.href = 'http://localhost:5000/auth/facebook'; // Przekierowanie do Facebook OAuth
    };

    useEffect(() => {
        // Odczytaj token z URL
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (token) {
            document.cookie = `token=${token}; path=/`;

            axios.get('http://localhost:5000/user', { withCredentials: true })
                .then(response => {
                    if (response.data) {
                        setUser(response.data);
                        navigate('/');
                    }
                })
                .catch(error => {
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
                    <input type="email"
                           placeholder="Email"
                           className="login-input"
                           id="email"
                           name="email"
                           value={formData.email}
                           onChange={handleChange}
                    />
                    <input type="password"
                           placeholder="Password"
                           className="login-input"
                           type={showPassword ? "text" : "password"}
                           id="password"
                           name="password"
                           value={formData.password}
                           onChange={handleChange}
                    />
                    <button type='button' id='togglePassword' onClick={togglePasswordVisibility}>
                        {showPassword ? 'Ukryj' : 'Pokaż'}
                    </button>
                    <button type="submit" className="login-btn">
                        Log In
                    </button>
                </form>
                <div className="login-divider">
                    <span>OR</span>
                </div>
                <div className="social-login">
                    <button className="social-btn google-btn" onClick={handleGoogleLogin}>Continue with Google</button>
                    <button className="social-btn facebook-btn" onClick={handleFacebookLogin}>Continue with Facebook</button>
                </div>
                <div className='link1'>
                    <a><Link to="../password-reset">Zapomniałeś hasła?</Link></a>
                </div>
                <div className='link2'>
                    <a href='/register'>Zarejestruj się!</a>
                </div>
            </div>
        </div>
    );
};

export default Login1;
