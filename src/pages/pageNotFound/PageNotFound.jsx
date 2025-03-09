import React from 'react';
import './pageNotFound.css';
import AnimatedBackground from '../../assets/AnimatedBackground/AnimatedBackground';

function PageNotFound() {
    return (
        <div>
            <AnimatedBackground/>
            <div>
                    <div className="container-404">
                        <h1>404 - Nie ma takiej strony</h1>
                        <p>Przepraszamy, ale strona, której szukasz, nie istnieje.</p>
                        <a href="/">Naciśnij by powrócić do strony głównej</a>
                    </div>
            </div>
        </div>
    );
}

export default PageNotFound;
