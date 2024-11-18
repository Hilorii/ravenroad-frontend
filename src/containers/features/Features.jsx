import React from 'react'
import Feature from '../../components/feature/Feature'
import './features.css'
import { useTranslation } from 'react-i18next'

const Features = () => {
    const { t } = useTranslation()

    const featuresData = [
        {
            title: t('features.aiRouteCreation.title'),
            text: t('features.aiRouteCreation.text'),
        },
        {
            title: t('features.socialMediaIntegration.title'),
            text: t('features.socialMediaIntegration.text'),
        },
        {
            title: t('features.safetyAlerts.title'),
            text: t('features.safetyAlerts.text'),
        },
        {
            title: t('features.offlineMode.title'),
            text: t('features.offlineMode.text'),
        },
    ]

    return (
        <div className="rr__features section__padding" id="features">
            <div className="rr__features-heading">
                <h1 className="gradient__text">{t('features.heading')}</h1>
            </div>
            <div className="rr__features-container">
                {featuresData.map((item, index) => (
                    <Feature title={item.title} text={item.text} key={item.title + index} />
                ))}
            </div>
        </div>
    )
}

export default Features
