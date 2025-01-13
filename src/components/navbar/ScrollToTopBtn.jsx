import React, { useState, useEffect } from "react";

const ScrollToTopBtn = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const toggleVisibility = () => {
        if (window.scrollY > 100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    return (
        <div>
            <button
                onClick={scrollToTop}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "linear-gradient(45deg, #AE67FA, #F49867)",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    cursor: "pointer",
                    zIndex: 1000,
                    fontSize: "24px",
                    transform: isVisible
                        ? isHovered
                            ? "scale(1.15)"
                            : "scale(1)"
                        : "scale(0)",
                    opacity: isVisible ? 1 : 0,
                    transition: "transform 0.8s ease, opacity 0.8s ease",
                }}
            >
                ↑
            </button>
        </div>
    );
};

export default ScrollToTopBtn;
