import { YStack, XStack } from 'tamagui';
import Navbar from "../../components/navbar/Navbar";
import './contact.css';
import {FB, DC, MAIL} from '../../components/icons'

export default function ContactPage() {
    return (
        <div className="App">
            <div className="gradient__bg">
                <Navbar />
                <YStack padding="$4" space>
                    <h1 className="gradient__text title">Skontaktuj się z nami!</h1>

                    {/* Sekcja z e-mailem i numerem telefonu */}
                    <YStack padding="$10" space alignItems="center">
                        <p className="contact-info">Email: <a href="mailto:kontakt@ravenroad.eu">kontakt@ravenroad.eu</a></p>
                        {/*<p className="contact-info">Telefon: +48 123 456 789</p>*/}
                        <p className="contact-info">Serwer Discord: Już wkrótce!</p>
                    </YStack>

                    <XStack space justifyContent="center" flexWrap="wrap">
                        <div className="contact-item">
                            <FB size={40} color="#ffffff" />
                            <p><a href="https://www.facebook.com/profile.php?id=61564039045420" target="_blank" rel="noopener noreferrer">Facebook</a></p>
                        </div>
                        <div className="contact-item">
                            <MAIL size={40} color="#ffffff" />
                            <p><a href="mailto:kontakt@ravenroad.eu">Email</a></p>
                        </div>
                        <div className="contact-item">
                            <DC size={40} color="#ffffff" />
                            <p>Discord: Już wkrótce!</p>
                        </div>
                    </XStack>
                </YStack>
            </div>
        </div>
    );
}
