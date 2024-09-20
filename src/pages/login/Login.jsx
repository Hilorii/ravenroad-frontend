import { React, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import './login.css';
import logo from '../../assets/RRlogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { GOOGLE, FB } from '../../components/icons';


const LoginPage = () => {
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
                alert('Login failed: ' + error.response.data.message);
            } else {
                alert('Login failed: An unexpected error occurred');
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
        <div className="bg">
            <div className="login-container">
                <img src={logo} alt="Logo" className="login-logo" />
                <h1 className="h">Witaj ponownie!</h1>
                <h2 className="h">Jesteś gotowy na podróż?</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input className="input_login"
                               placeholder="Email"
                               type="email"
                               id="email"
                               name="email"
                               value={formData.email}
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group password">
                        <input className="input_login"
                               placeholder="Hasło"
                               type={showPassword ? "text" : "password"}
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
                    <button className="logIn_FB_GOOGLE" onClick={handleGoogleLogin}>
                        <GOOGLE/> Zaloguj się przez Google
                    </button>
                    <button className="logIn_FB_GOOGLE" onClick={handleFacebookLogin}>
                        <FB/> Zaloguj się przez Facebook
                    </button>
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
