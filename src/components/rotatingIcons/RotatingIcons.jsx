import React from 'react';
import './rotatingIcons.css';

const RotatingIcons = () => {
    return (
        <div className="raven-road-container">
            <div className="background-effect"></div>
            <h1>Odkrywaj świat z Raven Road</h1>
            <p className="subheader">Nawigacja AI, która prowadzi Cię, gdziekolwiek jesteś</p>

            <div className="features">
                <div className="feature">
                    <div className="icon"></div>
                    <p>Inteligentne planowanie</p>
                </div>
                <div className="feature">
                    <div className="icon"></div>
                    <p>Powiadomienia o ruchu</p>
                </div>
                <div className="feature">
                    <div className="icon"></div>
                    <p>Lokalne atrakcje</p>
                </div>
                <div className="feature">
                    <div className="icon"></div>
                    <p>Trasy grupowe</p>
                </div>
            </div>

            {/*<button className="cta-button">Sprawdź teraz</button>*/}
            {/*<button className="demo-button">Zobacz w akcji</button>*/}
        </div>
    );
};

export default RotatingIcons;
