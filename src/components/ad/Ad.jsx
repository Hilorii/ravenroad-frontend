import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { collaborationMail } from '../info';
import './ad.css';

export default function Ad() {
    const { t } = useTranslation();
    const adRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
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

    const adTitleWithGradient = t('ad.title').replace(
        'Raven Road',
        `<span class="gradient-text-ad">Raven Road</span>`
    );

    return (
        <div
            ref={adRef}
            className={`rr__ad-container-ad ${isVisible ? 'visible-ad' : ''}`}
        >
            <h2
                className="ad-title-ad"
                dangerouslySetInnerHTML={{ __html: adTitleWithGradient }}
            />

            <p className="ad-text-ad">
                {t('ad.text')}
            </p>

            <p className="ad-contact-ad">
                Napisz do nas na: <strong>{collaborationMail}</strong>
            </p>

            <a href={`mailto:${collaborationMail}`} className="ad-button-link-ad">
                <button type="button" className="ad-button-ad">
                    {t('ad.button')}
                </button>
            </a>
        </div>
    );
}
