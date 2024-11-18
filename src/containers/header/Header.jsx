import React from 'react';
import './header.css';
import people from "../../assets/people.png";
import banner from "../../assets/banner.jpg";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import hook for i18n

const Header = () => {
    const { t } = useTranslation(); // Hook for translations
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleButtonClick = () => {
        if (email) {
            navigate('/signup', { state: { email } });
        } else {
            alert(t('header.alert'));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const scriptURL = 'https://script.google.com/macros/s/AKfycbziyC74wwF7KhaTXHhasKd7NpTlOXWSRzlh6pmsoIfLcCink3Z5cOX8b6dP2pyvDr8/exec';
            const formData = new FormData();
            formData.append('email', email);

            const response = await fetch(scriptURL, { method: 'POST', body: formData });
            const resultText = await response.text();

            if (resultText === "Success") {
                setMessage(t('header.success'));
                setEmail('');
            } else if (resultText === "Email already exists") {
                setMessage(t('header.emailExists'));
            } else {
                setMessage(t('header.error'));
            }
        } catch (error) {
            console.error(t('header.submitError'), error);
            setMessage(t('header.error'));
        }
    };

    return (
        <div className="rr__header section__padding" id="Home">
            <div className="rr__header-content">
                <h1 className="gradient__text">{t('header.title')}</h1>
                <p>{t('header.description')}</p>

                <form className="rr__header-content__input" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder={t('header.emailPlaceholder')}
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <button role="button" type="submit">{t('header.button')}</button>
                </form>
                {message && <p className="message gradient__text">{message}</p>}
            </div>
            <div className="rr__header-image">
                <img src={banner} alt={t('header.bannerAlt')} />
            </div>
        </div>
    );
};

export default Header;
