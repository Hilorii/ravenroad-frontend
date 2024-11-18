import React from 'react';
import './rotatingIcons.css';
import { useTranslation } from 'react-i18next';

const RotatingIcons = () => {
    const { t } = useTranslation();

    return (
        <div className="raven-road-container">
            <div className="background-effect"></div>
            <h1>{t('rotatingIcons.title')}</h1>
            <p className="subheader">{t('rotatingIcons.subheader')}</p>

            <div className="features">
                <div className="feature">
                    <div className="icon"></div>
                    <p>{t('rotatingIcons.features.intelligentPlanning')}</p>
                </div>
                <div className="feature">
                    <div className="icon"></div>
                    <p>{t('rotatingIcons.features.trafficNotifications')}</p>
                </div>
                <div className="feature">
                    <div className="icon"></div>
                    <p>{t('rotatingIcons.features.localAttractions')}</p>
                </div>
                <div className="feature">
                    <div className="icon"></div>
                    <p>{t('rotatingIcons.features.groupRoutes')}</p>
                </div>
            </div>

            {/*<button className="cta-button">{t('rotatingIcons.ctaButton')}</button>*/}
            {/*<button className="demo-button">{t('rotatingIcons.demoButton')}</button>*/}
        </div>
    );
};

export default RotatingIcons;
