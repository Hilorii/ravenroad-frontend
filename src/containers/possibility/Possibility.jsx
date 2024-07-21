import React from 'react';
import possibilityImage from '../../assets/possibility.png';
import './possibility.css';

const Possibility = () => (
    <div className="rr__possibility section__padding" id="possibility">
        <div className="rr__possibility-image">
            <img src={possibilityImage} alt="possibility" />
        </div>
        <div className="rr__possibility-content">
            <h4>Poproś o wczesny dostęp do aplikacji</h4>
            <h1 className="gradient__text">Możliwości są nieograniczone</h1>
            <p>Poznaj możliwości Raven Road i zaplanuj trasę jakiej nigdy wcześniej nie znałeś</p>
            <h4>Poproś o wczesny dostęp do aplikacji</h4>
        </div>
    </div>
);

export default Possibility;
