import { YStack, XStack, } from 'tamagui';
import Navbar from "../../components/navbar/Navbar"
import './pricing.css'
import '../profile/profile.css'
import { TabsDemo } from '../../components/tamagui/pricing-tabs'

export default function PricingPage() {
    return (
        <div className="App">
            <div className="gradient__bg">
                <Navbar/>
                <YStack padding="$0" space>
                    <h1 className="gradient__text titlee ">Dołącz do Raven Road. Wybierz abonament dla siebie!</h1>
                    <XStack space justifyContent="center" flexWrap="wrap">
                        <TabsDemo/>
                    </XStack>
                </YStack>
            </div>
        </div>

    );
}




