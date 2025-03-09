import React, { useRef, useState, useEffect } from "react";
import "./SatisfactionContainer.css";
import satisfyLeft from "../../assets/satisfyLeft.png";
import satisfyRight from "../../assets/satisfyRight.png";
import { useTranslation } from "react-i18next";

const SatisfactionContainer = () => {
    const { t } = useTranslation();
    const containerRef = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: "0px 0px -10% 0px",
                threshold: 0.1,
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    return (
        <div className="outer-wrapper" ref={containerRef}>
            <section className="container-section">
                <div className="image-box">
                    <img
                        src={satisfyLeft}
                        alt={t('satisfactionContainer.image1Alt')}
                    />
                </div>
                <div className="text-and-bar-container">
                    <div className="text-box">
                        <h2 className="subtitle">
                            {t('satisfactionContainer.subtitle')}
                        </h2>
                        <h1 className="title">
                            {t('satisfactionContainer.title')}{" "}
                            <span className="highlight">
                {t('satisfactionContainer.highlight')}
              </span>
                        </h1>
                        <div className="satisfaction">
                            <p className="label">
                                {t('satisfactionContainer.satisfactionLabel')}
                            </p>
                            <div className="progress-bar">
                                <div className={`progress ${isInView ? "animate" : ""}`}>
                  <span className="progress-value">
                    {t('satisfactionContainer.satisfactionValue')}
                  </span>
                                </div>
                            </div>
                        </div>
                        <div className="gradient-and-text">
                            <div className="gradient-bar"></div>
                            <p className="description">
                                {t('satisfactionContainer.description')}
                            </p>
                        </div>

                        <button className="cta-buttonn">
                            {t('satisfactionContainer.button')}
                        </button>
                    </div>
                </div>
                <div className="image-box">
                    <img
                        src={satisfyRight}
                        alt={t('satisfactionContainer.image2Alt')}
                    />
                </div>
            </section>
        </div>
    );
};

export default SatisfactionContainer;
