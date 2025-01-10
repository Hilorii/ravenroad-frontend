import React from 'react';
import './ServiceContainer.css';
// Przykładowe ikony - zastąp je swoimi obrazkami lub użyj React Icons
import { default as icon1 } from '../../assets/planning.png';
import { default as icon2 } from '../../assets/step.png';
import { default as icon3 } from '../../assets/safety.png';

const ServiceContainer = () => {
    return (
        <section className="service-container">
            {/* 1. Box */}
            <div className="service-item">
                <img className="service-icon" src={icon1} alt="Inteligentne Planowanie Tras" />
                {/* Kontener na nagłówek i opis */}
                <div className="service-text">
                    <h3>Inteligentne Planowanie Tras</h3>
                    <p>
                        Twórz własne trasy za pomocą Ai!
                    </p>
                </div>
            </div>

            {/* 2. Box */}
            <div className="service-item">
                <img className="service-icon" src={icon2} alt="Aktualizacje w Czasie Rzeczywistym" />
                <div className="service-text">
                    <h3>O krok do przodu!</h3>
                    <p>
                        Zawsze omijaj korki i inne przeszkody na drodze!
                    </p>
                </div>
            </div>

            {/* 3. Box */}
            <div className="service-item">
                <img className="service-icon" src={icon3} alt="Zwiększone Bezpieczeństwo" />
                <div className="service-text">
                    <h3>Bezpieczeństwo</h3>
                    <p>
                        Bądź na bieżąco informowany o wydarzeniach na drodze!
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ServiceContainer;
