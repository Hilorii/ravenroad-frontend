import React, { useState, useEffect, useRef } from "react";
import "./PricingCards.css";

const plansData = [
    {
        id: 1,
        price: 70,
        title: "BASIC",
        features: [
            "Social Media Integration",
            "Hardware Protection",
            "500 Malware Removal",
            "30 Days Product Testing",
            "10 Hour Of Support",
            "30 Days Product Testing",
        ],
    },
    {
        id: 2,
        price: 80,
        title: "STANDARD",
        features: [
            "Social Media Integration",
            "Hardware Protection",
            "500 Malware Removal",
            "30 Days Product Testing",
            "10 Hour Of Support",
            "30 Days Product Testing",
        ],
    },
    {
        id: 3,
        price: 90,
        title: "PREMIUM",
        features: [
            "Social Media Integration",
            "Hardware Protection",
            "500 Malware Removal",
            "30 Days Product Testing",
            "10 Hour Of Support",
            "30 Days Product Testing",
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
                            <span className="price">${plan.price}</span>{" "}
                            <span className="monthly">Monthly</span>
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
