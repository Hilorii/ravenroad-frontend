import React, { useState } from "react";
import "./NeonMotorcycle.css";

const NeonMotorcycle = () => {
    const [isActive, setIsActive] = useState(false);

    // Funkcja obsługująca kliknięcia w motor
    const handleClick = () => {
        setIsActive(!isActive);
    };

    return (
        <div className="neon-motorcycle-container">
            <svg
                onClick={handleClick}
                className={`motorcycle-svg ${isActive ? "active" : ""}`}
                viewBox="0 0 200 100"
            >
                {/* Przykładowa ścieżka motoru – można podmienić na dowolną inną  */}
                <path
                    d="M29.5 41.9c2-11.5 13.7-20.1 25.5-20.1 6.7 0 12.6 2.4 17.1 6.4h38.8c1.1-2.6 3.7-4.4 6.7-4.4h5
             c4 0 7.3 3.2 7.3 7.2v7c0 4-3.3 7.2-7.3 7.2h-12.2c-2.4 0-4.5-1.1-6-2.9l-2.3-3.1h-20c-2.8 2.8-6.7 4.5-11 4.5
             -8.6 0-15.6-7-15.6-15.5l-2 1c-2 1-3 3.2-2.4 5.4l3.1 12.8h-9.3l-2.4-12.2c-0.3-1.8-1.4-3.3-2.9-4.2l-2.8-1.5z"
                    fill="currentColor"
                />
                <circle cx="55" cy="60" r="15" fill="currentColor" />
                <circle cx="135" cy="60" r="15" fill="currentColor" />
            </svg>
            <p className="motorcycle-text">Neonowy Motor</p>
        </div>
    );
};

export default NeonMotorcycle;
