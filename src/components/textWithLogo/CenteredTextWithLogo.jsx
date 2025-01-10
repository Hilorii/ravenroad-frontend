import React from 'react';
import './centeredTextWithLogo.css';
import rrLogo from '../../assets/RRlogo.png';

const CenteredTextWithLogo = () => {
    return (
        <div className="centered-container">
            {/* Logo w tle */}
            <div className="logo-background">
                <img src={rrLogo} alt="Raven Road Logo" />
            </div>

            {/* Wcięty tekst */}
            <div className="cutout-text">
                RAVEN ROAD
            </div>
            <div className="text">
                Nawigacja przyszłości
            </div>

            {/* Przyciski */}
            <div className="button-container">
                <a href="https://example.com" className="gradient-button">
                    Przycisk 1
                </a>
                <a href="https://example.com" className="white-button">
                    Przycisk 2
                </a>
            </div>
        </div>
    );
};

export default CenteredTextWithLogo;
