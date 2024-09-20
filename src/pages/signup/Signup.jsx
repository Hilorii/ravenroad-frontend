import React, { useState, useEffect } from 'react';
import '../login/login.css';
import './signup.css';
import logo from '../../assets/RRlogo.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { GOOGLE, FB } from '../../components/icons';

const SignupPage = () => {
    const location = useLocation();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
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
            return;
        }

        setErrorMessage('');

        axios.post('http://localhost:5000/Signup', formData)
            .then(response => {
                if (response && response.data) {
                    alert('Użytkownik został pomyślnie zarejestrowany');
                    navigate('/login');
                } else {
                    setErrorMessage('Nieoczekiwany format odpowiedzi');
                }
            })
            .catch(error => {
                console.error('Wystąpił błąd podczas rejestracji!', error);
                if (error.response && error.response.data && error.response.data.error) {
                    // Wyświetlanie komunikatu o błędzie zwróconym z backendu
                    setErrorMessage(error.response.data.error);
                } else {
                    setErrorMessage('Rejestracja nie powiodła się: konto z takim emailem już istnieje');
                }
            });
    };

    return (
        <div className="bg">
            <div className="login-container">
                <img src={logo} alt="Logo" />
                <h1 className="h">Dołącz do nas!</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input className="input"
                               placeholder="Nazwa użytkownika"
                               type="text"
                               id="username"
                               name="username"
                               value={formData.username}
                               onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input className="input"
                               placeholder="Email"
                               type="email"
                               id="email"
                               name="email"
                               value={formData.email}
                               onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input className="input"
                               placeholder="Hasło"
                               type="password"
                               id="password"
                               name="password"
                               value={formData.password}
                               onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input className="input"
                               placeholder="Powtórz hasło"
                               type="password"
                               id="confirmPassword"
                               name="confirmPassword"
                               value={formData.confirmPassword}
                               onChange={handleChange}
                        />
                    </div>
                    {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
                    <button className='logIn' type="submit">Zarejestruj się</button>
                    <button className="logIn_FB_GOOGLE">
                        <Link to="/login"><GOOGLE/> Zaloguj się przez Google</Link>
                    </button>
                    <button className="logIn_FB_GOOGLE">
                        <Link to="/login"><FB/> Zaloguj się przez Facebook</Link>
                    </button>
                    <div className='link2'>
                        <Link to="/login">Zaloguj się!</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
