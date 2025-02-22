import React, { useRef, useState, useEffect } from 'react';
import './ad.css';
import { useTranslation } from 'react-i18next';
import { collaborationMail } from '../../components/info';
import adIcon from "../../assets/ad-label-icon.svg";

const Ad = () => {
    const { t } = useTranslation();

    // Ref na kontener (div.middle)
    const adRef = useRef(null);

    // Stan do śledzenia widoczności sekcji
    const [isVisible, setIsVisible] = useState(false);

    // Intersection Observer: po doskrolowaniu ustawiamy "isVisible = true"
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target); // Animacja tylko raz
                }
            },
            { threshold: 0.1 } // Wywołanie, gdy 10% sekcji jest widoczne
        );

        if (adRef.current) {
            observer.observe(adRef.current);
        }

        return () => {
            if (adRef.current) {
                observer.unobserve(adRef.current);
            }
        };
    }, []);

    return (
        <div className="middle" id="ad" ref={adRef}>
            <div className={`ad-container ${isVisible ? 'animate-in-ad' : 'hidden-element'}`}>
                <img src={adIcon} alt="Ad Icon" className="ad-icon"/>
                <h2 className="ad-title">
                    {t('ad.title').replace('Raven Road', '')}
                    <span className="ad-rr gradient__text"> Raven Road </span>
                </h2>
                <p className="ad-text">
                    {t('ad.text')}<br/>
                    <a href={`mailto:${collaborationMail}`}>{collaborationMail}</a>
                </p>
                <p className="ad-contact">
                    {t('ad.contact')}<br/>
                </p>
                <a href={`mailto:${collaborationMail}`} className="ad-button">
                    {t('ad.button')}
                </a>
            </div>
        </div>
    );
};

export default Ad;
