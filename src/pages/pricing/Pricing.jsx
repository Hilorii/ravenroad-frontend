import { YStack, XStack, H2, Paragraph, Card } from 'tamagui';
import { Link } from 'react-router-dom';
import Navbar from "../../components/navbar/Navbar"
import './pricing.css'
import '../profile/profile.css'
import { TabsDemo } from '../../components/tamagui/pricing-tabs'

export default function PricingPage() {
    return (
        <div className="App">
            <div className="gradient__bg">
                <Navbar/>
                <YStack padding="$6" space>
                    <h1 className="gradient__text title ">Dołącz do Raven Road. Wybierz abonament dla siebie!</h1>
                    <TabsDemo/>
                    <XStack space justifyContent="center" flexWrap="wrap">

                        {/* Miesiąc */}
                        <PricingCard
                            title="Miesiąc AI"
                            price="25 zł"
                            features={[
                                "Anuluj w dowolnym momencie",
                                "Korzystaj z zaawansowanych funkcji AI",
                                "1 urządzenie"
                            ]}
                            link=""
                            buttonText="Wypróbuj przez 7 dni!!"
                        />


                        {/* Rok */}
                        <PricingCard
                            title="Rok"
                            price="160 zł"
                            features={[
                                "Anuluj w dowolnym momencie",
                                "1 urządzenie"
                            ]}
                            link=""
                            buttonText="Wypróbuj przez 7 dni!"
                        />

                        {/* Rok z AI */}
                        <PricingCard
                            title="Rok AI"
                            price={
                                <span>
                                    <del style={{ textDecoration: 'line-through', color: 'red' }}>300 zł</del> <strong>180 zł</strong>
                                </span>
                            }
                            features={[
                                "Anuluj w dowolnym momencie",
                                "Korzystaj z zaawansowanych funkcji AI",
                                "1 urządzenie"
                            ]}
                            isRecommended={true}
                            link=""
                            buttonText="Wypróbuj przez 7 dni!"
                        />
                    </XStack>
                </YStack>
            </div>
        </div>

    );
}


function PricingCard({ title, price, features, link, buttonText, isRecommended }: {
    title: string,
    price: string | JSX.Element,
    features: string[],
    link: string,
    buttonText: string,
    isRecommended?: boolean
}) {
    return (
        <Card
            elevate size="$4"
            bordered
            width={300}
            height={400}
            padding="$4"
            marginHorizontal="$6"
            marginVertical="$8"
            backgroundColor={isRecommended ? '' : ''}
            borderWidth={isRecommended ? 2 : 1}
            borderColor={isRecommended ? '$blue10' : '$gray8'}
        >
            {isRecommended && (
                <Paragraph color="$blue10" textAlign="center" marginBottom="$2">
                    REKOMENDOWANY
                </Paragraph>
            )}
            <H2 textAlign="center" className="gradient__text">{title}</H2>
            <Paragraph textAlign="center" theme="alt1" fontSize="$8">
                <span className="price_text">
                    {price}
                </span>
            </Paragraph>
            <YStack space="$3" marginTop="$2">
                {features.map((feature, index) => (
                    <Paragraph key={index} theme="alt2">
                        <span className="gradient__text">
                            <text className="feature_text">
                                {feature}
                            </text>
                        </span>
                    </Paragraph>
                ))}
            </YStack>
            <YStack flex={1} justifyContent="flex-end" alignItems="center" marginTop="$4">
                <Link to={link}>
                    <button className="edit" role="button"><span className="text">{buttonText}</span></button>
                </Link>
            </YStack>
        </Card>
    );
}




