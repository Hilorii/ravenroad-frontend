import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import i18n
import './cookies.css';
import cookieImage from '../../assets/cookie.png';

const Cookies = () => {
    const [showBanner, setShowBanner] = useState(false);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation(); // Uzyskanie dostępu do tłumaczeń i języka

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
        // Nawigacja w zależności od języka
        const currentLanguage = i18n.language;
        navigate(`/${currentLanguage}/termsofuse`);
    };

    if (!showBanner) return null;

    return (
        <div className="cookie-overlay">
            <div className="cookie-banner">
                <img src={cookieImage} alt={t('cookies.imageAlt')} className="cookie-image" />
                <div className="cookie-content">
                    <p>
                        {t('cookies.text')}{' '}
                        <span className="cookie-link" onClick={handlePrivacyPolicyClick}>
                            {t('cookies.privacyPolicy')}
                        </span>.
                    </p>
                    <button onClick={handleAccept} className="cookie-button">
                        {t('cookies.accept')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cookies;
