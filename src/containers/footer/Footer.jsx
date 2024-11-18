import React from 'react';
import rrLogo from '../../assets/RRlogo.png';
import './footer.css';
import { contactMail } from '../../components/info';
import { useTranslation } from 'react-i18next'; // Import i18n

const Footer = () => {
    const { t, i18n } = useTranslation();

    // Ustalenie prefiksu URL na podstawie aktualnego języka
    const currentLanguage = i18n.language;

    return (
        <div className="rr__footer section__padding">
            {/*<div className="rr__footer-heading">*/}
            {/*    <h1 className="gradient__text">{t('footer.readyForFuture')}</h1>*/}
            {/*</div>*/}

            {/*<div className="rr__footer-btn">*/}
            {/*    <p>{t('footer.requestAccess')}</p>*/}
            {/*</div>*/}

            <div className="rr__footer-links">
                <div className="rr__footer-links_logo">
                    <img src={rrLogo} alt="rr_logo" />
                    <p>Raven Road sp z o.o., <br />{t('footer.allRightsReserved')}</p>
                </div>
                <div className="rr__footer-links_div">
                    <h4>{t('footer.links')}</h4>
                    {/*<p>{t('footer.stories')}</p>*/}
                    <p><a href="/FAQ">{t('footer.faq')}</a></p>
                    <p><a href="/help">{t('footer.help')}</a></p>
                    <p><a href={`/${currentLanguage}/termsofuse`}>{t('footer.termsOfUse')}</a></p>
                    {/*<p><a href={`/${currentLanguage}/privacypolicy`}>{t('footer.privacyPolicy')}</a></p>*/}
                </div>
                <div className="rr__footer-links_div">
                    <h4>{t('footer.company')}</h4>
                    {/*<p><a href="/about">{t('footer.aboutUs')}</a></p>*/}
                    {/*<p><a href="/pricing">{t('footer.ravenPro')}</a></p>*/}
                    {/*<p><a href="/team">{t('footer.team')}</a></p>*/}
                    <p><a href="/contact">{t('footer.contact')}</a></p>
                </div>
                <div className="rr__footer-links_div">
                    <h4>{t('footer.heading')}</h4>
                    <p>Discord: {t('footer.comingSoon')}</p>
                    <p><a href="https://www.facebook.com/profile.php?id=61564039045420">Facebook</a></p>
                    <p>Email: {contactMail}</p>
                </div>
            </div>

            <div className="rr__footer-copyright">
                <p>@2024 Raven Road. {t('footer.allRightsReserved')}</p>
            </div>
        </div>
    );
};

export default Footer;
