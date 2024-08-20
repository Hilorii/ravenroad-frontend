import { YStack, XStack } from 'tamagui';
import Navbar from "../../components/navbar/Navbar";
import { MAIL } from '../../components/icons';
import { contactMail } from '../../components/info';
import './help.css';

export default function HelpPage() {
    return (
        <div className="App">
            <div className="gradient__bg">
                <Navbar />
                <YStack padding="$4" space alignItems="center">
                    <h1 className="gradient__text title">Potrzebujesz pomocy? Skontaktuj się z nami!</h1>

                    {/* Sekcja z e-mailem do kontaktu */}
                    <YStack padding="$6" space alignItems="center">
                        <p className="help-text">Jeśli napotkałeś jakiekolwiek problemy, prosimy o kontakt pod poniższy adres e-mail:</p>
                        <XStack alignItems="center" space>
                            <MAIL size={40} color="#ffffff" />
                            <p className="help-email">Email: <a href={`mailto:${contactMail}`}>{contactMail}</a></p>
                        </XStack>
                        <p className="help-text">Zrobimy co w naszej mocy, aby pomóc Ci jak najszybciej!</p>
                    </YStack>
                </YStack>
            </div>
        </div>
    );
}
