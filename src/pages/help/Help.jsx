import { YStack, XStack } from 'tamagui';
import NavbarTmp from "../../components/navbar/NavbarTmp";
import { MAIL } from '../../components/icons';
import { contactMail } from '../../components/info';
import './help.css';
import { useTranslation } from 'react-i18next';

export default function HelpPage() {
    const { t } = useTranslation();

    return (
        <div className="App">
            <div className="gradient__bg">
                <NavbarTmp />
                <YStack padding="$4" space alignItems="center">
                    <h1 className="gradient__text title">{t('help.title')}</h1>

                    {/* Sekcja z e-mailem do kontaktu */}
                    <YStack padding="$6" space alignItems="center" width="100%">
                        <p className="help-text">{t('help.problemContact')}</p>
                        <XStack alignItems="center" space>
                            <div style={{maxWidth: '50px', width: '100%', display: 'flex', justifyContent: 'center'}}>
                                <MAIL size="100%" color="#ffffff"/>
                            </div>
                            <p className="help-email">{t('help.emailLabel')}: <a href={`mailto:${contactMail}`}>{contactMail}</a></p>
                        </XStack>
                        <p className="help-text">{t('help.assistance')}</p>
                    </YStack>
                </YStack>
            </div>
        </div>
    );
}
