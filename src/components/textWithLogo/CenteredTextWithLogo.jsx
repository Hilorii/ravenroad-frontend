import React, { useEffect } from 'react';
import './centeredTextWithLogo.css';
import rrLogo from '../../assets/RRlogo.png';

const CenteredTextWithLogo = () => {
    // Hook do debugowania, aby upewnić się, że komponent renderuje
    useEffect(() => {
        console.log('CenteredTextWithLogo rendered');
    }, []);

    return (
        <div className="centered-container">
            {/* Logo w tle */}
            <div className="logo-background">
                <img src={rrLogo} alt="Raven Road Logo" />
            </div>

            {/* Wcięty tekst */}
            <div className="cutout-text">RAVEN ROAD</div>

            {/* Tekst, który się pojawia */}
            <div className="text-ctwl animated-text-ctwl">Nawigacja przyszłości</div>

            {/* Przyciski */}
            <div className="button-container">
                <a href="https://example.com" className="gradient-button animated-button">
                    Przycisk 1
                </a>
                <a href="https://example.com" className="white-button animated-button">
                    Przycisk 2
                </a>
            </div>
        </div>
    );
};

export default CenteredTextWithLogo;
