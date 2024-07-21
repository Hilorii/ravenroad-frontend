import React from 'react';
import Feature from '../../components/feature/Feature';
import './features.css';

const featuresData = [
    {
        title: 'Tworzenie Tras Dzięki Sztucznej Inteligencji',
        text: 'W aplikacji Raven Road, sztuczna inteligencja pomoże Ci stworzyć spersonalizowane trasy motocyklowe.',
    },
    {
        title: 'Integracja z Mediami Społecznościowymi',
        text: 'Łatwo udostępniaj swoje przejażdżki, zdjęcia i statystyki na platformach społecznościowych, aby inspirować innych i budować swoją motocyklową społeczność.',
    },
    {
        title: 'Bezpieczeństwo i Alarmy',
        text: 'Korzystaj z funkcji alarmów i powiadomień o niebezpiecznych warunkach na trasie, aby jeździć bezpieczniej i unikać potencjalnych zagrożeń.',
    },
    {
        title: 'Tryb Offline',
        text: 'Nawiguj i śledź swoje trasy nawet bez dostępu do Internetu, dzięki możliwości pobierania map i tras na swoje urządzenie.',
    },
];

const Features = () => (
    <div className="rr__features section__padding" id="features">
        <div className="rr__features-heading">
            <h1 className="gradient__text">Wkrocz w przyszłość z Raven Road!</h1>
            <p>Poproś o wczesny dostęp</p>
        </div>
        <div className="rr__features-container">
            {featuresData.map((item, index) => (
                <Feature title={item.title} text={item.text} key={item.title + index} />
            ))}
        </div>
    </div>
);

export default Features;
