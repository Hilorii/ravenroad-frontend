import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import './privacyPolicy.css';  // Stylizacje specyficzne dla tej strony

const PrivacyPolicy = () => {
    return (
        <div className="App">
        <div className="gradient__bg">
            <Navbar />
            <div className="content">
                <h1>Polityka Prywatności (RODO)</h1>
                <p>
                    Niniejsza Polityka Prywatności określa zasady przetwarzania danych osobowych użytkowników aplikacji Raven Road.
                    Ochrona prywatności i bezpieczeństwa danych osobowych użytkowników jest dla nas priorytetem.
                </p>
                <h2>1. Informacje ogólne</h2>
                <p>
                    Zbieramy i przetwarzamy dane osobowe zgodnie z przepisami Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. (RODO).
                </p>
                <h2>2. Administrator danych</h2>
                <p>
                    Administratorem danych osobowych jest [Nazwa firmy/organizacji], z siedzibą w [adres siedziby].
                </p>
                {/* Kolejne sekcje zgodnie z treścią */}
            </div>
        </div>
        </div>
    );
}

export default PrivacyPolicy;
