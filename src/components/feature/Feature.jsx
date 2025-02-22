import React, { useRef, useState, useEffect } from 'react';
import './feature.css';

const Feature = ({ title, text }) => {
    // Ref, żeby namierzyć element w Intersection Observer
    const featureRef = useRef(null);

    // Stan śledzenia widoczności (czy już doskrolowaliśmy do elementu)
    const [isVisible, setIsVisible] = useState(false);

    // Ustawiamy Intersection Observer tak, by po 10% widoczności
    // ustawić isVisible na true. Animację uruchamiamy tylko raz.
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target); // tylko raz
                }
            },
            { threshold: 0.1 }
        );

        if (featureRef.current) {
            observer.observe(featureRef.current);
        }

        return () => {
            if (featureRef.current) {
                observer.unobserve(featureRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={featureRef}
            // Dodajemy warunkowo klasy do animacji:
            className={`rr__features-container__feature ${isVisible ? 'animated-in-feature' : 'hidden-feature'}`}
        >
            <div className="rr__features-container__feature-title">
                <div />
                <h1>{title}</h1>
            </div>
            <div className="rr__features-container_feature-text">
                <p>{text}</p>
            </div>
        </div>
    );
};

export default Feature;
