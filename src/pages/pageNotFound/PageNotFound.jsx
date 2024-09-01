import React from 'react';
import './pageNotFound.css';
import { XStack } from 'tamagui';

function PageNotFound() {
    return (
        <div className="App">
            <div className="gradient__bg">
                <XStack>
                    <div className="container-404 gradient__text">
                        <h1>404 - Nie ma takiej strony</h1>
                        <p>Przepraszamy, ale strona, której szukasz, nie istnieje.</p>
                        <a href="/">Naciśnij by powrócić do strony głównej</a>
                    </div>
                </XStack>
            </div>
        </div>
    );
}

export default PageNotFound;
