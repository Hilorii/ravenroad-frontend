import React from 'react';
import rrLogo from '../../assets/RRlogo.png';
import './footer.css';
import { contactMail } from '../../components/info';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;

    return (
        <div className="rr__footer section__padding">
            <div className="rr__footer-links">
                {/* Logo i nazwa */}
                <div className="rr__footer-links_logo">
                    <img src={rrLogo} alt="rr_logo" />
                    <p>
                        Raven Road sp z o.o., <br />
                        {t('footer.allRightsReserved')}
                    </p>
                </div>

                {/* Pierwsza kolumna linków */}
                <div className="rr__footer-links_div">
                    <h4>{t('footer.links')}</h4>
                    <p>
                        <a href="/FAQ">{t('footer.faq')}</a>
                    </p>
                    <p>
                        <a href="/help">{t('footer.help')}</a>
                    </p>
                    <p>
                        <a href={`/${currentLanguage}/termsofuse`}>{t('footer.termsOfUse')}</a>
                    </p>
                </div>

                {/* Druga kolumna linków */}
                <div className="rr__footer-links_div">
                    <h4>{t('footer.company')}</h4>
                    <p>
                        <a href="/contact">{t('footer.contact')}</a>
                    </p>
                </div>

                {/* Trzecia kolumna – ikony i teksty */}
                <div className="rr__footer-links_div">
                    <h4>{t('footer.heading')}</h4>

                    {/* Discord */}
                    <div className="rr__footer-link-item">
                        <span className="rr__footer-icon"></span>
                        <p>Discord: {t('footer.comingSoon')}</p>
                    </div>

                    {/* Facebook */}
                    <div className="rr__footer-link-item">
                        <span className="rr__footer-icon"></span>
                        <p>
                            <a href="https://www.facebook.com/profile.php?id=61564039045420">
                                Facebook
                            </a>
                        </p>
                    </div>

                    {/* Email */}
                    <div className="rr__footer-link-item">
                        <span className="rr__footer-icon"></span>
                        <p>Email: {contactMail}</p>
                    </div>
                </div>
            </div>

            {/* Stopka kopiuj/prawo */}
            <div className="rr__footer-copyright">
                <p>@2024 Raven Road. {t('footer.allRightsReserved')}</p>
            </div>
        </div>
    );
};

export default Footer;
