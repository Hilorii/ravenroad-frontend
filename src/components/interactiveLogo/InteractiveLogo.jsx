import React, { useState, useRef, useEffect } from 'react';
import './InteractiveLogo.css'; // tu będzie styl

// Ścieżki do grafik możesz dostosować wg własnej struktury plików
import rrLogo from '../../assets/RRlogo.png';
import googlePlayBadge from '../../assets/google-play.png';

const InteractiveLogo = () => {
    // Stan odpowiadający za przesunięcie loga (x, y)
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    // Stan i ref odpowiadające za wyświetlanie/animację tekstu, gdy komponent jest widoczny
    const [textVisible, setTextVisible] = useState(false);
    const textRef = useRef(null);

    // Funkcja obsługująca ruch myszy
    const handleMouseMove = (e) => {
        // Ustal współczynniki parallax wg uznania
        const factor = 0.05;
        setOffset({
            x: e.clientX * factor,
            y: e.clientY * factor,
        });
    };

    // Używamy IntersectionObserver, żeby wykryć, kiedy tekst pojawia się w obrębie ekranu
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTextVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 } // Jak bardzo element ma być widoczny (0.1 = 10%)
        );

        if (textRef.current) {
            observer.observe(textRef.current);
        }

        // Sprzątanie (cleanup)
        return () => {
            if (textRef.current) {
                observer.unobserve(textRef.current);
            }
        };
    }, []);

    return (
        <div className="interactive-logo-container" onMouseMove={handleMouseMove}>
            {/* Logo RR, reagujące na ruch myszy */}
            <img
                src={rrLogo}
                alt="RavenRoad Logo"
                className="rr-logo"
                style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
            />

            {/* Link do Sklepu Play */}
            <a
                href="https://play.google.com/store/apps/details?id=com.ravenroad"
                target="_blank"
                rel="noreferrer"
            >
                <img
                    src={googlePlayBadge}
                    alt="Google Play Badge"
                    className="google-play-badge"
                />
            </a>

            {/* Animowany tekst */}
            <h2
                ref={textRef}
                className={`fade-in-text ${textVisible ? 'visible' : ''}`}
            >
                Pobierz RavenRoad już dziś!
            </h2>
        </div>
    );
};

export default InteractiveLogo;
