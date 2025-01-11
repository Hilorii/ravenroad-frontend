import React from 'react';
import './ad.css';
import { useTranslation } from 'react-i18next';
import { collaborationMail } from '../../components/info';

const Ad = () => {
    const { t } = useTranslation();

    return (
        <div className="middle">
            <div className="ad-container">
                <h2 className="ad-title">
                    {t('ad.title').replace('Raven Road', '')}
                    <span className="ad-rr gradient__text"> Raven Road </span>
                </h2>
                <p className="ad-text">
                    {t('ad.text')}<br/>
                    <a href={`mailto:${collaborationMail}`}>{collaborationMail}</a>
                </p>
                <p className="ad-contact">
                    {t('ad.contact')}<br/>
                </p>
                <a href={`mailto:${collaborationMail}`} className="ad-button">
                    {t('ad.button')}
                </a>
            </div>
        </div>
    );
};

export default Ad;
