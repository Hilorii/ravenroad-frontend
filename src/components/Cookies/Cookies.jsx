import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import dla nawigacji w aplikacji
import './cookies.css'; // Import stylów
import cookieImage from '../../assets/cookie.png'; // Import obrazka ciasteczka

const Cookies = () => {
    const [showBanner, setShowBanner] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setShowBanner(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setShowBanner(false);
    };

    const handlePrivacyPolicyClick = () => {
        navigate('/privacyPolicy');
    };

    if (!showBanner) return null;

    return (
        <div className="cookie-overlay">
            <div className="cookie-banner">
                <img src={cookieImage} alt="Cookie" className="cookie-image" />
                <div className="cookie-content">
                    <p>
                        Ta strona używa plików cookies, aby zapewnić najlepszą jakość korzystania z niej. Więcej informacji w naszej{' '}
                        <span className="cookie-link" onClick={handlePrivacyPolicyClick}>
              polityce prywatności
            </span>.
                    </p>
                    <button onClick={handleAccept} className="cookie-button">
                        Akceptuj
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cookies;
