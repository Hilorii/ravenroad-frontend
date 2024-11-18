import { YStack, XStack } from 'tamagui';
import NavbarTmp from '../../components/navbar/NavbarTmp';
import './collaboration.css';
import { MAIL } from '../../components/icons';
import { collaborationMail } from '../../components/info';
import { useTranslation } from 'react-i18next';

export default function CollaborationPage() {
    const { t } = useTranslation();

    return (
        <div className="App">
            <div className="gradient__bg">
                <NavbarTmp />
                <YStack padding="$4" space>
                    <h1 className="gradient__text">{t('collaboration.title')}</h1>
                    <YStack padding="$10" space alignItems="center">
                        <p className="collab-info">
                            <a>{t('collaboration.description')} <strong>{collaborationMail}</strong>. {t('collaboration.details')}</a>
                        </p>
                    </YStack>
                    <YStack padding="$1" space alignItems="center">
                        <p className="collab-info-mail">{t('collaboration.emailLabel')}: <a href={`mailto:${collaborationMail}`}>{collaborationMail}</a></p>
                    </YStack>
                    <XStack space justifyContent="center" flexWrap="wrap">
                        <div className="collab-item">
                            <MAIL size={40} color="#ffffff"/>
                            <p><a href={`mailto:${collaborationMail}`}>{t('collaboration.email')}</a></p>
                        </div>
                    </XStack>
                </YStack>
            </div>
        </div>
    );
}
