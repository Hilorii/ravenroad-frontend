import React, { useState, useEffect, useRef } from "react";
import "./PricingCards.css";

const plansData = [
    {
        id: 1,
        price: 25,
        title: "SILVER WING",
        span: "Miesięcznie",
        features: [
            "Generowanie tras za pomocą AI",
            "Do 5 wygenerowanych tras w miesiącu!",
            "Mapy offline",
            "Nagrywanie tras z pomiarami",
            "Publikowanie nagranych tras",
            "Wszystko co w wersji darmowej",
        ],
    },
    {
        id: 2,
        price: 160,
        title: "BLACK FEATHER",
        span: "Rocznie",
        features: [
            "Generowanie tras za pomocą AI",
            "Do 10 wygenerowanych tras w miesiącu!",
            "Planowanie tras",
            "Tworzenie grup",
            "Tworzenie wydarzeń",
            "Wszystko co w Silver Wing",
        ],
    },
    {
        id: 3,
        price: 180,
        title: "SHADOW RAVEN",
        span: "Rocznie",
        features: [
            "Generowanie tras za pomocą AI",
            "Do 20 wygenerowanych tras w miesiącu !",
            "Ekskluzywne trasy i wydarzenia",
            "Nielimitowane zapisywanie tras offline",
            "Priorytetowe wsparcie",
            "Wszystko co w Black Feather",
        ],
    },
];

const PricingCards = () => {
    const [isSubtitleVisible, setIsSubtitleVisible] = useState(false);
    const [isTitleVisible, setIsTitleVisible] = useState(false);
    const [clickedButton, setClickedButton] = useState(null);
    const subtitleRef = useRef(null); // Oddzielny ref dla `h3`
    const titleRef = useRef(null); // Oddzielny ref dla `h2`

    // Intersection Observer – ustawia stan widoczności dla nagłówków
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.target === subtitleRef.current && entry.isIntersecting) {
                        setIsSubtitleVisible(true);
                    }
                    if (entry.target === titleRef.current && entry.isIntersecting) {
                        setIsTitleVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (subtitleRef.current) observer.observe(subtitleRef.current);
        if (titleRef.current) observer.observe(titleRef.current);

        return () => {
            if (subtitleRef.current) observer.unobserve(subtitleRef.current);
            if (titleRef.current) observer.unobserve(titleRef.current);
        };
    }, []);

    // Obsługa kliknięcia przycisku „Purchase Now”
    const handlePurchase = (planId) => {
        setClickedButton((prev) => (prev === planId ? null : planId));
    };

    return (
        <section className="pricing-section">
            {/* Napis nad kartami */}
            <h3
                className={`pricing-subtitle ${isSubtitleVisible ? "active" : ""}`}
                ref={subtitleRef}
            >
                OUR BEST <span className="highlight">PRICING</span>
            </h3>
            <h2
                className={`pricing-title ${isTitleVisible ? "active" : ""}`}
                ref={titleRef}
            >
                OUR BEST <span className="highlight">PRICING</span> IS HERE
            </h2>
            <div className="pricing-cards-container">
                {plansData.map((plan) => (
                    <div key={plan.id} className="pricing-card">
                        <div className="pricing-header">
                            <span className="price">{plan.price} PLN</span>{" "}
                            <span className="monthly">{plan.span}</span>
                        </div>
                        <div className="plan-title">{plan.title}</div>
                        <ul className="features-list">
                            {plan.features.map((feature, index) => (
                                <li key={index}>
                                    <span className="check-icon">✔</span> {feature}
                                </li>
                            ))}
                        </ul>
                        <button
                            className={`purchase-btn ${
                                clickedButton === plan.id ? "active-gradient" : ""
                            }`}
                            onClick={() => handlePurchase(plan.id)}
                        >
                            PURCHASE NOW
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PricingCards;
