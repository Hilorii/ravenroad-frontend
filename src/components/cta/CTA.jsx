import React from 'react';
import './cta.css';

const CTA = () => (
    <div className="rr__cta">
        <div className="rr__cta-content">
            <p>Poproś o wczesny dostęp do aplikacji na androida i na stronę internetową</p>
            <h3>Zarejestruj się już dziś i zacznij odkrywać nieskończone możliwości.</h3>
        </div>
        <div className="rr__cta-btn">
            <a href="/signup"><button type="button">Zaczynam</button></a>
        </div>
    </div>
);

export default CTA;
