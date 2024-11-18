import React from 'react';
import Feature from '../../components/feature/Feature';
import { useTranslation } from 'react-i18next';
import './whatrr.css';

const WhatRR = () => {
    const { t } = useTranslation();

    return (
        <div className="rr__whatrr section__margin" id="wrr">
            <div className="rr__whatrr-feature">
                <Feature
                    title={t('whatRR.feature1.title')}
                    text={t('whatRR.feature1.text')}
                />
            </div>
            <div className="rr__whatrr-heading">
                <h1 className="rr__h1 gradient__text">
                    {t('whatRR.heading')}
                </h1>
                {/*<p>{t('whatRR.learnMore')}</p>*/}
            </div>
            <div className="rr__whatrr-container">
                <Feature
                    title={t('whatRR.feature2.title')}
                    text={t('whatRR.feature2.text')}
                />
                <Feature
                    title={t('whatRR.feature3.title')}
                    text={t('whatRR.feature3.text')}
                />
                <Feature
                    title={t('whatRR.feature4.title')}
                    text={t('whatRR.feature4.text')}
                />
            </div>
        </div>
    );
};

export default WhatRR;
