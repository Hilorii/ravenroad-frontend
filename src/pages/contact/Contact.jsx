import { YStack, XStack } from 'tamagui';
import Navbar from "../../components/navbar/Navbar";
import './contact.css';
import { FB, DC, MAIL } from '../../components/icons';
import { contactMail } from '../../components/info';
import NavbarTmp from '../../components/navbar/NavbarTmp';
import { useTranslation } from 'react-i18next'; // Import i18n

export default function ContactPage() {
    const { t } = useTranslation();

    return (
        <div className="App">
            <div className="gradient__bg">
                {/*<Navbar />*/}
                <NavbarTmp />
                <YStack padding="$4" space>
                    <h1 className="gradient__text title">{t('contactPage.title')}</h1>

                    {/* Sekcja z e-mailem i numerem telefonu */}
                    <YStack padding="$10" space alignItems="center">
                        <p className="contact-info">
                            {t('contactPage.email')}:{' '}
                            <a href={`mailto:${contactMail}`}>{contactMail}</a>
                        </p>
                        {/*<p className="contact-info">{t('contactPage.phone')}: +48 123 456 789</p>*/}
                        <p className="contact-info">{t('contactPage.discord')}: {t('contactPage.comingSoon')}</p>
                    </YStack>

                    <XStack space justifyContent="center" flexWrap="wrap">
                        <div className="contact-item">
                            <FB size={40} color="#ffffff" />
                            <p>
                                <a href="https://www.facebook.com/profile.php?id=61564039045420" target="_blank" rel="noopener noreferrer">
                                    {t('contactPage.facebook')}
                                </a>
                            </p>
                        </div>
                        <div className="contact-item">
                            <MAIL size={40} color="#ffffff" />
                            <p>
                                <a href={`mailto:${contactMail}`}>{t('contactPage.email')}</a>
                            </p>
                        </div>
                        <div className="contact-item">
                            <DC size={40} color="#ffffff" />
                            <p>{t('contactPage.discord')}: {t('contactPage.comingSoon')}</p>
                        </div>
                    </XStack>
                </YStack>
            </div>
        </div>
    );
}
