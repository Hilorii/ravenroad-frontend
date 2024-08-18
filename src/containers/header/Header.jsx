import React from 'react';
import './header.css';
import people from "../../assets/people.png"
import banner from "../../assets/banner.jpg"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const [email, setEmail] = useState('');
    const navigate = useNavigate();

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

    return (
        <div className="rr__header section__padding" id="Home">
            <div className="rr__header-content">
                <h1 className="gradient__text">
                    Zaplanuj swoją wspaniałą podróż z Raven Road
                </h1>
                <p>
                    Dołącz do wspaniałego community Raven Road już dziś za free!
                </p>

                <div className="rr__header-content__input">
                    <input
                        type="email"
                        placeholder="Twój adres email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <button type="button" onClick={handleButtonClick}>W drogę</button>
                </div>
            </div>
            <div className="rr__header-image">
                <img src={banner} alt="banner"/>
            </div>
        </div>
    )
}
export default Header
