import { Card, XStack, YStack, H2, Paragraph, Button } from 'tamagui'
import { Link } from 'react-router-dom'
import { Navbar } from '../../components/index';

export default function PricingPage() {
    return (
        <div className="App">
            <div className="gradient__bg">
                <Navbar/>
                {/*<YStack padding="$6" space>*/}
                {/*    <H2>Nasze plany subskrypcyjne</H2>*/}
                {/*    <Paragraph theme="alt2">Wybierz plan, który najlepiej pasuje do Twoich potrzeb!</Paragraph>*/}

                {/*    <XStack space justifyContent="space-around" flexWrap="wrap">*/}
                {/*        <PricingCard*/}
                {/*            title="Plan miesięczny"*/}
                {/*            price="25 zł"*/}
                {/*            description="Idealny, jeśli chcesz wypróbować nasze usługi."*/}
                {/*            link=""*/}
                {/*        />*/}
                {/*        <PricingCard*/}
                {/*            title="Plan roczny"*/}
                {/*            price="160 zł"*/}
                {/*            description="Oszczędzaj z planem rocznym!"*/}
                {/*            link=""*/}
                {/*        />*/}
                {/*        <PricingCard*/}
                {/*            title="Plan roczny (AI)"*/}
                {/*            price="180 zł"*/}
                {/*            description="Dostęp do zaawansowanych funkcji AI."*/}
                {/*            link=""*/}
                {/*        />*/}
                {/*    </XStack>*/}
                {/*</YStack>*/}
            </div>
        </div>
    )
}

function PricingCard({ title, price, description, link }: { title: string, price: string, description: string, link: string }) {
    return (
        <Card elevate size="$4" bordered width={250} height={300} space="$4" padding="$4">
            <H2>{title}</H2>
            <Paragraph theme="alt1">{price}</Paragraph>
            <Paragraph>{description}</Paragraph>

            <YStack flex={1} justifyContent="flex-end">
                <Link to={link}>
                    <Button borderRadius="$10">Wybierz plan</Button>
                </Link>
            </YStack>
        </Card>
    )
}
