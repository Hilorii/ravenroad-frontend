import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { collaborationMail } from '../info'; // <-- dopasuj ścieżkę importu
import './ad.css';

export default function Ad() {
    const { t } = useTranslation();
    const adRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    // Obserwacja momentu, kiedy komponent pojawia się w polu widzenia
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

    // Gradient tylko w słowach "Raven Road", a nie w całym tytule
    const adTitleWithGradient = t('ad.title').replace(
        'Raven Road',
        `<span class="gradient-text-ad">Raven Road</span>`
    );

    return (
        <div
            ref={adRef}
            className={`rr__ad-container-ad ${isVisible ? 'visible-ad' : ''}`}
        >
            {/* Tytuł z wstrzykniętym gradientem w słowach "Raven Road" */}
            <h2
                className="ad-title-ad"
                dangerouslySetInnerHTML={{ __html: adTitleWithGradient }}
            />

            {/* Tekst reklamy – biały */}
            <p className="ad-text-ad">
                {t('ad.text')}
            </p>

            {/* Zamiast t('ad.contact') wstawiamy proste zdanie z mailem z info.js */}
            <p className="ad-contact-ad">
                Napisz do nas na: <strong>{collaborationMail}</strong>
            </p>

            {/* Przykładowy przycisk z mailem (lub cokolwiek innego) */}
            <a href={`mailto:${collaborationMail}`} className="ad-button-link-ad">
                <button type="button" className="ad-button-ad">
                    {t('ad.button')}
                </button>
            </a>
        </div>
    );
}
