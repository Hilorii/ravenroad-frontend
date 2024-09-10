import { YStack, XStack} from 'tamagui';
import Navbar from "../../components/navbar/Navbar"
import './collaboration.css'
import { Link } from 'react-router-dom';
import { MAIL } from '../../components/icons'
import { collaborationMail } from '../../components/info';

export default function CollaborationPage() {
    return (
        <div className="App">
            <div className="gradient__bg">
                <Navbar/>
                <YStack padding="$4" space>
                    <h1 className="gradient__text">Współpracuj z nami!</h1>
                    <YStack padding="$10" space alignItems="center">
                        <p className="collab-info"><a>Chcesz, aby Twoja firma była widoczna w naszej aplikacji nawigacyjnej? To doskonała okazja, by dotrzeć do nowych klientów! Skontaktuj się z nami, wysyłając wiadomość na <strong>{collaborationMail}</strong>. W odpowiedzi otrzymasz wszystkie szczegóły dotyczące współpracy. Dołącz do grona firm, które już z nami współpracują i zyskaj przewagę na rynku!</a></p>
                    </YStack>
                    <YStack padding="$1" space alignItems="center">
                        <p className="collab-info-mail">Email: <a href={`mailto:${collaborationMail}`}>{collaborationMail}</a></p>
                    </YStack>
                    <XStack space justifyContent="center" flexWrap="wrap">
                        <div className="collab-item">
                            <MAIL size={40} color="#ffffff"/>
                            <p><a href={`mailto:${collaborationMail}`}>Email</a></p>
                        </div>
                    </XStack>
                </YStack>
            </div>
        </div>

    );
}
