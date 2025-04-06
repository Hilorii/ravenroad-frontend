import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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

    // W tytule chcemy gradient tylko na słowie "Raven Road"
    // Zakładam, że w plikach i18n masz coś w stylu: "ad": { "title": "Reklama w aplikacji Raven Road", ... }
    // i że EXACT luki i wielkość liter w tym kluczu pasują do replace (lub dopasuj do faktycznego napisu).
    const adTitleWithGradient = t('ad.title').replace(
        'Raven Road',
        `<span class="gradient-text-ad">Raven Road</span>`
    );

    return (
        <div
            ref={adRef}
            className={`rr__ad-container-ad ${isVisible ? 'visible-ad' : ''}`}
        >
            {/* Oznaczenie, że to reklama */}
            <div className="ad-badge-ad">AD</div>

            {/* Tytuł z gradientem w słowach "Raven Road" */}
            <h2
                className="ad-title-ad"
                dangerouslySetInnerHTML={{ __html: adTitleWithGradient }}
            />

            {/* Tekst reklamy – biały */}
            <p className="ad-text-ad">
                {t('ad.text')}
            </p>

            <p className="ad-contact-ad">
                {t('ad.contact')}
            </p>

            <a href="mailto:kontakt@ravenroad.pl" className="ad-button-link-ad">
                <button type="button" className="ad-button-ad">
                    {t('ad.button')}
                </button>
            </a>
        </div>
    );
}
