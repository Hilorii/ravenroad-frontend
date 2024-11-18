import React from 'react';
import './infoContainer2.css';
import { useTranslation } from 'react-i18next';

const InfoContainer2 = () => {
    const { t } = useTranslation();

    return (
        <div className="ad-container2">
            <div className="ad-header2">
                <h1>{t('infoContainer2.header')}</h1>
            </div>
            <div className="ad-description2">
                <p>{t('infoContainer2.description')}</p>
            </div>
            <div className="ad-features2">
                <h2>{t('infoContainer2.featuresTitle')}</h2>
                <ul>
                    <li>{t('infoContainer2.features.aiRoutes')}</li>
                    <li>{t('infoContainer2.features.groupsEvents')}</li>
                    <li>{t('infoContainer2.features.gpxImportExport')}</li>
                    <li>{t('infoContainer2.features.osmIndependence')}</li>
                    <li>{t('infoContainer2.features.directContact')}</li>
                </ul>
            </div>
            <div className="ad-roadmap2">
                <h2>{t('infoContainer2.roadmapTitle')}</h2>
                <ul>
                    <li>{t('infoContainer2.roadmap.facebookLogin')}</li>
                    <li>{t('infoContainer2.roadmap.facebookSharing')}</li>
                    <li>{t('infoContainer2.roadmap.iosVersion')}</li>
                    <li>{t('infoContainer2.roadmap.voiceCommands')}</li>
                    <li>{t('infoContainer2.roadmap.customAlerts')}</li>
                </ul>
            </div>
            <div className="ad-footer2">
                <p>{t('infoContainer2.footer')}</p>
            </div>
        </div>
    );
};

export default InfoContainer2;
