import React from 'react';
import { useTranslation } from 'react-i18next';
import rrLogo from '../../assets/RRlogo.png';
import './footer.css';
import { contactMail } from '../../components/info';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <div className="rr__footer section__padding">
            {/*<div className="rr__footer-heading">*/}
            {/*    <h1 className="gradient__text">{t('footer.heading')}</h1>*/}
            {/*</div>*/}

            {/*<div className="rr__footer-btn">*/}
            {/*    <p>{t('footer.earlyAccess')}</p>*/}
            {/*</div>*/}

            <div className="rr__footer-links">
                <div className="rr__footer-links_logo">
                    <img src={rrLogo} alt="rr_logo" />
                    <p>{t('footer.companyDetails')}</p>
                </div>
                <div className="rr__footer-links_div">
                    <h4>{t('footer.links')}</h4>
                    {/*<p>{t('footer.stories')}</p>*/}
                    <p><a href="/FAQ">{t('footer.faq')}</a></p>
                    <p><a href="/help">{t('footer.help')}</a></p>
                    <p><a href="/termsofusepl">{t('footer.termsOfUse')}</a></p>
                    <p><a href="/termsofusepl">{t('footer.privacyPolicy')}</a></p>
                </div>
                <div className="rr__footer-links_div">
                    <h4>{t('footer.company')}</h4>
                    {/*<p><a href="/about">{t('footer.aboutUs')}</a></p>*/}
                    {/*<p><a href="/pricing">{t('footer.ravenPro')}</a></p>*/}
                    {/*<p><a href="/team">{t('footer.team')}</a></p>*/}
                    <p><a href="/contact">{t('footer.contact')}</a></p>
                </div>
                <div className="rr__footer-links_div">
                    <h4>{t('footer.contactUs')}</h4>
                    <p>{t('footer.discord')}</p>
                    <p><a href="https://www.facebook.com/profile.php?id=61564039045420">{t('footer.facebook')}</a></p>
                    <p>{t('footer.email')}: {contactMail}</p>
                </div>
            </div>

            <div className="rr__footer-copyright">
                <p>{t('footer.copyright')}</p>
            </div>
        </div>
    );
};

export default Footer;
