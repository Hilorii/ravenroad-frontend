import React from 'react'
import './infoContainer.css'
import { useTranslation } from 'react-i18next'

const InfoContainer = () => {
    const { t } = useTranslation()

    return (
        <div className="info-raven-road">
            <div className="info-header">
                <h1>{t('info.header')}</h1>
                <p className="info-tagline">{t('info.tagline')}</p>
            </div>

            <div className="info-content">
                <p className="info-description">
                    {t('info.description')}
                </p>

                <div className="info-benefits">
                    <h2>{t('info.benefitsTitle')}</h2>
                    <ul>
                        <li>💡 <strong>{t('info.benefits.intelligentRoutes.title')}:</strong> {t('info.benefits.intelligentRoutes.text')}</li>
                        <li>🚦 <strong>{t('info.benefits.realtimeNotifications.title')}:</strong> {t('info.benefits.realtimeNotifications.text')}</li>
                        <li>🌍 <strong>{t('info.benefits.exploreSurroundings.title')}:</strong> {t('info.benefits.exploreSurroundings.text')}</li>
                        <li>👥 <strong>{t('info.benefits.groupRoutes.title')}:</strong> {t('info.benefits.groupRoutes.text')}</li>
                    </ul>
                </div>

                <div className="info-get-started">
                    <h2>{t('info.getStartedTitle')}</h2>
                    <ol>
                        <li>{t('info.getStarted.step1')}</li>
                        <li>{t('info.getStarted.step2')}</li>
                        <li>{t('info.getStarted.step3')}</li>
                    </ol>
                </div>
            </div>

            {/*<button className="info-start-button">{t('info.startButton')}</button>*/}
        </div>
    )
}

export default InfoContainer
