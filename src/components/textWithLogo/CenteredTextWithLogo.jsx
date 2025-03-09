import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import rrLogo from '../../assets/RRlogo.png';
import './centeredTextWithLogo.css';

const CenteredTextWithLogo = () => {
    const { t, i18n } = useTranslation();
    return (
        <div className="centered-container">
            <div className="logo-background">
                <img src={rrLogo} alt={t('textWithLogo.logoAlt')} />
            </div>
            <div className="cutout-text">{t('textWithLogo.cutoutText')}</div>
            <div className="text-ctwl animated-text-ctwl">{t('textWithLogo.description')}</div>
            <div className="button-container">
                <a href="/register" className="gradient-button animated-button">
                    {t('textWithLogo.joinButton')}
                </a>
                <a href="#pro" className="white-button animated-button">
                    {t('textWithLogo.proButton')}
                </a>
            </div>
        </div>
    );
};

export default CenteredTextWithLogo;
