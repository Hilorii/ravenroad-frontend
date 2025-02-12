import React, { useRef, useState, useEffect } from "react";
import "./SatisfactionContainer.css";
import satisfyLeft from "../../assets/satisfyLeft.png";
import satisfyRight from "../../assets/satisfyRight.png";

const SatisfactionContainer = () => {
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
                    <img src={satisfyLeft} alt="example1" />
                </div>

                <div className="text-and-bar-container">
                    <div className="text-box">
                        <h2 className="subtitle">COŚ O NAS</h2>
                        <h1 className="title">
                            ODKRYJ MOŻLIWOŚCI <span className="highlight">RAVEN ROAD</span>
                        </h1>

                        <div className="satisfaction">
                            <p className="label">poziom satysfakcji użytkowników</p>
                            <div className="progress-bar">
                                <div className={`progress ${isInView ? "animate" : ""}`}>
                                    <span className="progress-value">90%</span>
                                </div>
                            </div>
                        </div>

                        <div className="gradient-and-text">
                            <div className="gradient-bar"></div>
                            <p className="description">
                                Raven Road to aplikacja nawigacyjna, która pozwoli Ci dotrzeć
                                szybko i bezpiecznie do celu. Planuj swoje trasy ze sztuczną
                                inteligencją, unikaj utrudnień na drodze i bądź zawsze o krok
                                przed innymi. Dołącz do naszej społeczności i odkrywaj świat
                                z Raven Road.
                            </p>
                        </div>

                        <button className="cta-buttonn">POZNAJ WIĘCEJ</button>
                    </div>
                </div>

                <div className="image-box">
                    <img src={satisfyRight} alt="example2" />
                </div>
            </section>
        </div>
    );
};

export default SatisfactionContainer;
