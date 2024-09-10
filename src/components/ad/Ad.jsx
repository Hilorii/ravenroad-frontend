import React from 'react';
import './ad.css';
import { collaborationMail } from '../../components/info';

const Ad = () => {
    return (
        <div className="middle">
            <div className="ad-container">
                <h2 className="ad-title">Reklama w aplikacji Raven Road</h2>
                <p className="ad-text">
                    Jeśli myślisz o promowaniu swojej firmy w aplikacji Raven Road, napisz do nas na:
                    <br/>
                    <a href={`mailto:${collaborationMail}`}>{collaborationMail}</a>
                </p>
                <p className="ad-contact">
                    Chętnie odpowiemy na wszelkie pytania!
                    <br/>
                </p>
                {/*<button className="ad-button"`}>NAPISZ</button>*/}
                <a href={`mailto:${collaborationMail}`} className="ad-button">NAPISZ</a>
            </div>
        </div>
    );
};

export default Ad;
