import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import './termsOfUse.css';  // Stylizacje specyficzne dla tej strony

const TermsOfUse = () => {
    return (
        <div className="terms-of-use-page">
            <Navbar />
            <div className="content">
                <h1>Warunki Użytkowania</h1>
                <p>
                    Niniejsze Warunki Użytkowania (zwane dalej "Warunkami") określają zasady korzystania z Aplikacji Raven Road.
                </p>
                <h2>1. Postanowienia ogólne</h2>
                <p>
                    Używając Aplikacji, użytkownik zgadza się na przestrzeganie niniejszych Warunków.
                </p>
                <h2>2. Definicje</h2>
                <p>
                    <strong>Aplikacja:</strong> Oprogramowanie mobilne Raven Road, umożliwiające motocyklistom planowanie tras, śledzenie przejazdów i dzielenie się nimi z innymi użytkownikami.
                </p>
                {/* Kolejne sekcje zgodnie z treścią */}
            </div>
        </div>
    );
}

export default TermsOfUse;
