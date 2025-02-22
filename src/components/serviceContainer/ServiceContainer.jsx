import React from 'react';
import './ServiceContainer.css';
// Przykładowe ikony - zastąp je swoimi obrazkami lub użyj React Icons
import icon1 from '../../assets/planning.png';
import icon2 from '../../assets/step.png';
import icon3 from '../../assets/safety.png';

import { useTranslation } from 'react-i18next';

const ServiceContainer = () => {
    const { t } = useTranslation();

    return (
        <section className="service-container">
            {/* 1. Box */}
            <div className="service-item">
                <img
                    className="service-icon"
                    src={icon1}
                    alt={t('serviceContainer.service1.alt')}
                />
                <div className="service-text">
                    <h3>{t('serviceContainer.service1.title')}</h3>
                    <p>{t('serviceContainer.service1.description')}</p>
                </div>
            </div>

            {/* 2. Box */}
            <div className="service-item">
                <img
                    className="service-icon"
                    src={icon2}
                    alt={t('serviceContainer.service2.alt')}
                />
                <div className="service-text">
                    <h3>{t('serviceContainer.service2.title')}</h3>
                    <p>{t('serviceContainer.service2.description')}</p>
                </div>
            </div>

            {/* 3. Box */}
            <div className="service-item">
                <img
                    className="service-icon"
                    src={icon3}
                    alt={t('serviceContainer.service3.alt')}
                />
                <div className="service-text">
                    <h3>{t('serviceContainer.service3.title')}</h3>
                    <p>{t('serviceContainer.service3.description')}</p>
                </div>
            </div>
        </section>
    );
};

export default ServiceContainer;
