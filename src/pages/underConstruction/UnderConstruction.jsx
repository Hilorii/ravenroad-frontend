import React, { useState } from 'react';
import './underConstruction.css';
import logo from '../../assets/RRlogo.png';

function UnderConstruction() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const scriptURL = 'https://script.google.com/macros/s/AKfycbwEbmcHDzmKVNAoKNQGd2lxpBxTLDPMPzYQiRQTIrQeRPuBg2NdBbjelJb5EWS32v2Z/exec';

            const formData = new FormData();
            formData.append('email', email);

            const response = await fetch(scriptURL, { method: 'POST', body: formData });

            if (response.ok) {
                setMessage('Dziękujemy! Powiadomimy Cię, gdy aplikacja będzie gotowa. Otrzymasz również 20% zniżki.');
                setEmail('');  // Reset email field
            } else {
                setMessage('Wystąpił błąd. Spróbuj ponownie później.');
            }
        } catch (error) {
            console.error('Wystąpił błąd podczas zapisywania e-maila:', error);
            setMessage('Wystąpił błąd. Spróbuj ponownie później.');
        }
    };

    return (
        <div className="gradient__bg">
            <div className="under-construction-container">
                <img src={logo} alt="Logo" className="notify-logo"/>
                <div className="gradient__text">
                    <h1 className="h1-notify">Strona w budowie...</h1>
                    <p className="p-notify">
                        Zapisz się na testy naszej aplikacji już 23 września! Otrzymaj 7 dni darmowego dostępu do wszystkich funkcji, a potem <strong className="notify-strong">20%</strong> zniżki na wersję premium. Podaj swój e-mail i dołącz do grona testerów!
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="email-form">
                    <input
                        type="email"
                        placeholder="Twój e-mail"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <button className="edit bt-notify" role="button" type="submit">
                        <span className="text">Zapisz się!</span>
                    </button>
                </form>

                {message && <p className="message gradient__text">{message}</p>}
            </div>
        </div>
    );
}

export default UnderConstruction;
