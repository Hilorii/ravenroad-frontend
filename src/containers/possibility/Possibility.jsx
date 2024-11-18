import React from 'react';
import { useTranslation } from 'react-i18next';
import possibilityImage from '../../assets/possibility.png';
import './possibility.css';

const Possibility = () => {
    const { t } = useTranslation();

    return (
        <div className="rr__possibility section__padding" id="possibility">
            <div className="rr__possibility-image">
                <img src={possibilityImage} alt={t('possibility.alt')} />
            </div>
            <div className="rr__possibility-content">
                <h1 className="gradient__text">{t('possibility.title')}</h1>
                <p>{t('possibility.description')}</p>
            </div>
        </div>
    );
};

export default Possibility;
