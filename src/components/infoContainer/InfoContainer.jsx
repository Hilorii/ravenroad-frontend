import React from 'react';
import './infoContainer.css';

const InfoContainer = () => {
    return (
        <div className="info-raven-road">
            <div className="info-header">
                <h1>Raven Road – Twój AI przewodnik</h1>
                <p className="info-tagline">Eksploruj świat z najnowszą technologią nawigacji AI</p>
            </div>

            <div className="info-content">
                <p className="info-description">
                    Raven Road to więcej niż zwykła nawigacja. Dzięki zaawansowanej technologii sztucznej inteligencji,
                    nasza aplikacja dostosowuje trasy do Twoich preferencji, proponuje atrakcje w okolicy i reaguje na
                    zmieniające się warunki drogowe. Bez względu na to, dokąd zmierzasz – Raven Road dostarczy Cię na miejsce
                    z pewnością i wygodą.
                </p>

                <div className="info-benefits">
                    <h2>Dlaczego warto wybrać Raven Road?</h2>
                    <ul>
                        <li>💡 <strong>Inteligentne trasy:</strong> Optymalizacja tras na podstawie Twoich preferencji i stylu jazdy.</li>
                        <li>🚦 <strong>Powiadomienia w czasie rzeczywistym:</strong> Błyskawiczne informacje o korkach i utrudnieniach.</li>
                        <li>🌍 <strong>Odkrywanie okolicy:</strong> Znajdź atrakcje, restauracje i inne miejsca, które mogą Cię zainteresować.</li>
                        <li>👥 <strong>Trasy grupowe:</strong> Zapraszaj znajomych i podróżujcie razem!</li>
                    </ul>
                </div>

                <div className="info-get-started">
                    <h2>Jak zacząć?</h2>
                    <ol>
                        <li>Pobierz aplikację na telefon i załóż konto.</li>
                        <li>Ustaw swoje preferencje podróży, np. typ trasy i powiadomienia.</li>
                        <li>Zacznij planować trasę i odkrywaj nowe miejsca!</li>
                    </ol>
                </div>
            </div>

            {/*<button className="info-start-button">Rozpocznij podróż z Raven Road</button>*/}
        </div>
    );
};

export default InfoContainer;
