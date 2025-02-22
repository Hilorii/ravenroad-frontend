import React from 'react';
import './cta.css';
import { useTranslation } from 'react-i18next';

const CTA = () => {
    const { t } = useTranslation();

    return (
        <div className="rr__cta">
            <div className="rr__cta-content">
                {/* Przykładowo: t('cta.subheader') albo t('cta.header') */}
                <h3>
                    {t('cta.header')}
                </h3>
            </div>
            <div className="rr__cta-btn">
                <a href="/register">
                    <button type="button">
                        {t('cta.buttonText')}
                    </button>
                </a>
            </div>
        </div>
    );
};

export default CTA;
