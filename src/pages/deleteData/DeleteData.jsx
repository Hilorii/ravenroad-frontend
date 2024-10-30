import { YStack, XStack } from 'tamagui';
import Navbar from "../../components/navbar/Navbar";
import { MAIL } from '../../components/icons';
import { supportMail } from '../../components/info';
import './deleteData.css';
export default function DeleteDataPage() {
    return (
        <div className="App">
            <div className="gradient__bg">
                {/*<Navbar />*/}
                <br/>
                <br/>
                <br/>
                <br/>
                <YStack padding="$4" space alignItems="center">
                    <h1 className="gradient__text title">Usuń swoje dane</h1>

                    <YStack padding="$6" space alignItems="center">
                        <p className="help-text">•	Prawo do usunięcia danych („prawo do bycia zapomnianym”): możesz zażądać usunięcia swoich danych w przypadkach przewidzianych prawem.</p>
                        <XStack alignItems="center" space>
                            <MAIL size={40} color="#ffffff" />
                            <p className="help-email">Email: <a href={`mailto:${supportMail}`}>{supportMail}</a></p>
                        </XStack>
                        <p className="help-text">Wzór formularza odstąpienia od umowy</p>
                        <p className="formularz">
                            (Adresat: Lunar Feather, 18A, 09-411 Stara Biała, e-mail: support@ravenroad.eu)
                            <br/>
                            Ja, ................................................., niniejszym informuję o moim odstąpieniu od umowy o świadczenie usług drogą elektroniczną zawartej dnia ...........................
                            Imię i nazwisko konsumenta: ................................................. <br/>
                            Adres konsumenta: .................................................
                            Data: ................................................. <br/>
                            Podpis konsumenta (tylko jeśli formularz jest przesyłany w wersji papierowej):
                        </p>
                    </YStack>
                </YStack>
            </div>
        </div>
    );
}
