import React, { useState } from 'react';
import './underConstruction.css';
import logo from '../../assets/RRlogo.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function UnderConstruction() {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const [message, setMessage] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSuggestionChange = (e) => {
        setSuggestion(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const scriptURL = 'https://script.google.com/macros/s/AKfycbziyC74wwF7KhaTXHhasKd7NpTlOXWSRzlh6pmsoIfLcCink3Z5cOX8b6dP2pyvDr8/exec';
            const formData = new FormData();
            formData.append('email', email);
            formData.append('suggestion', suggestion);

            const response = await fetch(scriptURL, { method: 'POST', body: formData });
            const resultText = await response.text();

            if (resultText === "Success") {
                setMessage(t('construction.message.success'));
                setEmail('');
                setSuggestion('');
            } else if (resultText === "Email already exists") {
                setMessage(t('construction.message.emailExists'));
            } else {
                setMessage(t('construction.message.error'));
            }
        } catch (error) {
            console.error(t('construction.message.error'), error);
            setMessage(t('construction.message.error'));
        }
    };

    return (
        <div className="gradient__bg">
            <div className="under-construction-container">
                <img src={logo} alt="Logo" className="notify-logo" />
                <div className="gradient__text">
                    <h1 className="h1-notify">{t('construction.heading')}</h1>
                    <p className="p-notify">
                        {t('construction.description')}
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="email-form">
                    <input
                        type="email"
                        placeholder={t('construction.placeholder.email')}
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <textarea
                        placeholder={t('construction.placeholder.suggestion')}
                        value={suggestion}
                        onChange={handleSuggestionChange}
                        minLength={10}
                    />
                    <button className="edit bt-notify" role="button" type="submit">
                        <span className="text">{t('construction.button.submit')}</span>
                    </button>
                </form>

                {message && <p className="message gradient__text">{message}</p>}

                <div className="quick-links">
                    <Link to="/termsofusepl" className="quick-link-button">{t('construction.links.terms')}</Link>
                    <Link to="/deleteData" className="quick-link-button">{t('construction.links.deleteData')}</Link>
                </div>
            </div>
        </div>
    );
}

export default UnderConstruction;
