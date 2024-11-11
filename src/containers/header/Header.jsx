import React from 'react';
import './header.css';
import people from "../../assets/people.png"
import banner from "../../assets/banner.jpg"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    //TMP
    const [suggestion, setSuggestion] = useState('');
    const [message, setMessage] = useState('');



    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleButtonClick = () => {
        if (email) {
            navigate('/signup', { state: { email } });
        } else {
            alert('Proszę podać adres email');
        }
    };

    //TMP
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const scriptURL = 'https://script.google.com/macros/s/AKfycbziyC74wwF7KhaTXHhasKd7NpTlOXWSRzlh6pmsoIfLcCink3Z5cOX8b6dP2pyvDr8/exec';
            const formData = new FormData();
            formData.append('email', email);

            const response = await fetch(scriptURL, { method: 'POST', body: formData });
            const resultText = await response.text(); // Odczytaj odpowiedź jako tekst

            if (resultText === "Success") {
                setMessage('Dziękujemy!');
                setEmail('');  // Reset email field
                setSuggestion(''); // Reset suggestion field
            } else if (resultText === "Email already exists") {
                setMessage('Ten email został już zapisany.');
            } else {
                setMessage('Wystąpił błąd. Spróbuj ponownie później.');
            }
        } catch (error) {
            console.error('Wystąpił błąd podczas zapisywania e-maila:', error);
            setMessage('Wystąpił błąd. Spróbuj ponownie później.');
        }
    };


    return (
        <div className="rr__header section__padding" id="Home">
            <div className="rr__header-content">
                <h1 className="gradient__text">
                    Zaplanuj swoją wspaniałą podróż z Raven Road
                </h1>
                <p>
                    Dołącz do wspaniałego community Raven Road już dziś za free!
                </p>

                <form className="rr__header-content__input" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Twój adres email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                        <button role="button" type="submit">W drogę</button>
                </form>
                {message && <p className="message gradient__text">{message}</p>}
            </div>
            <div className="rr__header-image">
            <img src={banner} alt="banner"/>
            </div>
        </div>
    )
}
export default Header
