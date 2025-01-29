import React from 'react';
import { useNavigate } from 'react-router-dom';
import './backButton.css';
import { IoIosArrowBack } from "react-icons/io";

const BackButton = () => {
    const navigate = useNavigate();

    // Funkcja do nawigacji wstecz
    const goBack = () => {
        navigate(-1);
    };

    return (
        <button className="back-button" onClick={goBack}>
            <IoIosArrowBack />
        </button>
    );
};

export default BackButton;
