import { YStack } from 'tamagui';
import Navbar from "../../components/navbar/Navbar";
import './aboutUs.css';  // Dodaj osobny plik CSS na stylizacje, jeśli potrzebujesz
import NavbarTmp from '../../components/navbar/NavbarTmp';

export default function AboutPage() {
    return (
        <div className="App">
            <div className="gradient__bg">
                {/*<Navbar />*/}
                <NavbarTmp />
                <YStack padding="$0" space alignItems="center">
                    <h1 className="gradient__text title">O nas</h1>
                    <YStack padding="$0" space alignItems="center" maxWidth={800} textAlign="center">
                        <p className="about-text">
                            Raven Road to firma skoncentrowana na dostarczaniu najwyższej jakości usług
                            dla naszych klientów. Naszym celem jest tworzenie innowacyjnych rozwiązań,
                            które pomagają naszym klientom osiągać sukces.
                        </p>
                        <p className="about-text">
                            Wierzymy w siłę technologii i zaufanie naszych klientów. Nasz zespół
                            składa się z doświadczonych profesjonalistów, którzy każdego dnia
                            pracują nad tym, aby Twoje doświadczenie z nami było wyjątkowe.
                        </p>
                    </YStack>
                </YStack>
            </div>
        </div>
    );
}
