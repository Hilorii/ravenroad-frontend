import React, { useState, useEffect, useRef } from "react";
import "./PricingCards.css";
import { useTranslation } from "react-i18next";

const PricingCards = () => {
    const { t } = useTranslation();
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

    // Obsługa kliknięcia przycisku „Purchase Now” (lub „Więcej w aplikacji”)
    const handlePurchase = (planId) => {
        setClickedButton((prev) => (prev === planId ? null : planId));
    };

    // Definiujemy dane planów wewnątrz komponentu, by móc użyć t()
    const plansData = [
        {
            id: 1,
            price: 25,
            title: t("pricingCards.silverWing.title"),
            span: t("pricingCards.silverWing.span"),
            features: [
                t("pricingCards.silverWing.features.0"),
                t("pricingCards.silverWing.features.1"),
                t("pricingCards.silverWing.features.2"),
                t("pricingCards.silverWing.features.3"),
                t("pricingCards.silverWing.features.4"),
                t("pricingCards.silverWing.features.5"),
            ],
        },
        {
            id: 2,
            price: 160,
            title: t("pricingCards.blackFeather.title"),
            span: t("pricingCards.blackFeather.span"),
            features: [
                t("pricingCards.blackFeather.features.0"),
                t("pricingCards.blackFeather.features.1"),
                t("pricingCards.blackFeather.features.2"),
                t("pricingCards.blackFeather.features.3"),
                t("pricingCards.blackFeather.features.4"),
                t("pricingCards.blackFeather.features.5"),
            ],
        },
        {
            id: 3,
            price: 180,
            title: t("pricingCards.shadowRaven.title"),
            span: t("pricingCards.shadowRaven.span"),
            features: [
                t("pricingCards.shadowRaven.features.0"),
                t("pricingCards.shadowRaven.features.1"),
                t("pricingCards.shadowRaven.features.2"),
                t("pricingCards.shadowRaven.features.3"),
                t("pricingCards.shadowRaven.features.4"),
                t("pricingCards.shadowRaven.features.5"),
            ],
        },
    ];

    return (
        <section className="pricing-section" id="pro">
            {/* Podtytuł */}
            <h3
                className={`pricing-subtitle ${isSubtitleVisible ? "active" : ""}`}
                ref={subtitleRef}
            >
                {t("pricingCards.subtitle")}{" "}
                <span className="highlight">{t("pricingCards.subtitleHighlight")}</span>
            </h3>

            {/* Tytuł */}
            <h2
                className={`pricing-title ${isTitleVisible ? "active" : ""}`}
                ref={titleRef}
            >
                {t("pricingCards.title")}{" "}
                <span className="highlight">{t("pricingCards.titleHighlight")}</span>
            </h2>

            {/* Karty cenowe */}
            <div className="pricing-cards-container">
                {plansData.map((plan) => (
                    <div key={plan.id} className="pricing-card">
                        <div className="pricing-header">
                            <span className="price">{plan.price} {t("pricingCards.currency")}</span>{" "}
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
                            {t("pricingCards.moreInAppButton")}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PricingCards;
