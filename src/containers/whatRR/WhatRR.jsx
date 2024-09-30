import React from 'react';
import Feature from '../../components/feature/Feature';
import './whatrr.css';

const WhatRR = () => (
    <div className="rr__whatrr section__margin" id="wrr">
        <div className="rr__whatrr-feature">
            <Feature title="Czym jest Raven Road"
                     text="Witamy w Raven Road, wszechstronnej platformie dla entuzjastów motocykli! Niezależnie od tego,
                     czy planujesz pełną przygód podróż, śledzisz swoje trasy, czy łączysz się z innymi motocyklistami,
                     Raven Road ma wszystko, czego potrzebujesz. Nasze interaktywne mapy i nawigacja GPS pomogą Ci
                     odkrywać i dzielić się ekscytującymi trasami, a śledzenie w czasie rzeczywistym utrzyma Cię w
                     kontakcie ze znajomymi. Dołącz do wyzwań, eksploruj popularne szlaki i stań się częścią tętniącej
                     życiem społeczności. Raven Road - tu zaczyna się Twoja podróż, a każda jazda staje się przygodą!"/>
        </div>
        <div className="rr__whatrr-heading">
            <h1 className="rr__h1 gradient__text ">Raven Road - Twój niezastąpiony towarzysz w podróży</h1>
            {/*<p>Dowiedz się wiecej</p>*/}
        </div>
        <div className="rr__whatrr-container">
            <Feature title="Interaktywne Mapy i Nawigacja GPS"
                     text="Twórz, zapisuj i udostępniaj trasy motocyklowe z pomocą zaawansowanych map. Korzystaj z
                     nawigacji GPS z instrukcjami głosowymi, aby bezpiecznie dotrzeć do celu."/>
            <Feature title="Śledzenie i Analiza Jazdy"
                     text="Rejestruj swoje przejażdżki, analizuj statystyki i udostępniaj swoje osiągnięcia.
                     Śledź swoją pozycję w czasie rzeczywistym i zobacz, gdzie są Twoi znajomi."/>
            <Feature title="Społeczność i Wyzwania"
                     text="Dołącz do wyzwań i rywalizuj z innymi motocyklistami. Odkrywaj popularne trasy,
                     dziel się swoimi przygodami i bądź częścią dynamicznej społeczności motocyklowej."/>
        </div>
    </div>
)
export default WhatRR
