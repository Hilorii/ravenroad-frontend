//USED IN PRICING.JSX
import React from 'react'
import type { TabsContentProps } from 'tamagui'
import { Button, H5, Separator, SizableText, Tabs, XStack, YStack, isWeb } from 'tamagui'

//Tworzenie kart
import {  H2, Paragraph, Card } from 'tamagui';
import { Link } from 'react-router-dom';
import Navbar from "../../components/navbar/Navbar"
import '../../pages/pricing/pricing.css'
import '../../pages/profile/profile.css'

const demos = ['horizontal'];

export function TabsDemo() {

    const [demoIndex, setDemoIndex] = React.useState(0)

    const demo = demos[demoIndex]
    return (


        <YStack
            paddingHorizontal="$4"
            {...(isWeb && {
                position: 'unset',
            })}
        >

                <HorizontalTabs/>

                <XStack
                    alignItems="center"
                    space
                    position="absolute"
                    bottom="$3"
                    left="$4"
                    $xxs={{display: 'none'}}
                >

                </XStack>

        </YStack>


)

}

const HorizontalTabs = () => {

    return (
        <div className="pricing-tab-nav">
        <Tabs
            defaultValue="tab1"
            orientation="horizontal"
            flexDirection="column"
            width={1300}
            height={700}
            borderWidth="0.25"
            overflow="hidden"
            borderColor="transparent"
            scale={1}
        >

            <Tabs.List
                separator={<Separator vertical/>}
            >
                <CustomTab value="tab0" label="Wersja Darmowa" />
                <CustomTab value="tab1" label="Premium Miesięczny" />
                <CustomTab value="tab2" label="Premium Roczny" />
                <CustomTab value="tab3" label="Premium Roczny Plus" />
            </Tabs.List>

            {/*FREE FLIGHT*/}
            <TabsContent value="tab0">

                <PricingCard
                    title="Free Flight"
                    price="0zł"
                    features={[
                        <strong>Anuluj w dowolnym momencie!</strong>,
                        <>
                            <strong>Podstawowa nawigacja</strong> - Standardowa funkcja nawigacji z dostępem do tras.
                        </>,
                        <>
                            <strong>Tworzenie tras</strong> - Możliwość ręcznego tworzenia i zapisywania własnych tras.
                        </>,
                        <>
                            <strong>Ocenianie tras</strong> - Przeglądanie i ocenianie tras innych użytkowników.
                        </>,
                        <>
                            <strong>Udostępnianie tras na Facebook'u</strong> -  Możliwość publikowania podsumowań tras na swoim profilu.
                        </>,
                        <>
                            <strong>Zgłaszanie zdarzeń na drodze</strong> -  Poinformuj innych o sytuacji na drodze.
                        </>,
                        <>
                            <strong>Zapisywanie się do eventów</strong> -  Możliwość dołączania do wydarzeń stworzonych przez innych użytkowników lub firmy.
                        </>,
                        <>
                            <strong>Zapisywanie się na wyjazdy</strong> -Możliwość dołączenia do zaplanowanych wyjazdów innych użytkowników.
                        </>,
                        <>
                            <strong>Możliwość zobaczenia innych użytkowników na mapie</strong> -  Możliwość podglądu lokalizacji innych użytkowników w czasie rzeczywistym.
                        </>,
                    ]}
                    link=""
                    buttonText="Więcej w aplikacji!"
                />
            </TabsContent>

            {/*SILVER WING*/}
            <TabsContent value="tab1">

                <PricingCard
                    title="Silver Wing"
                    price="25 zł / miesiąc"
                    features={[
                        <strong>Anuluj w dowolnym momencie!</strong>,
                        <strong>Wszytsko co w Free Flight, plus:</strong>,
                        <>
                            <strong>Generowanie tras za pomocą AI</strong> -  Funkcja automatycznego generowania tras na podstawie preferencji i opisu użytkownika. Do 5 tras na miesiąc.
                        </>,
                        <>
                            <strong>Mapy offline</strong> - Pełny dostęp do map offline, bez ograniczeń.
                        </>,
                        <>
                            <strong>Nagrywanie tras z pomiarami</strong> -  Możliwość nagrywania swoich tras z pomiarem prędkości i przechyłów oraz możliwość udostępniania danych na Facebook'u.
                        </>,
                        <>
                            <strong>Publikowanie nagranych tras</strong> -  Opcja publikowania nagranych tras (np. offroad) w aplikacji..
                        </>,
                    ]}
                    link=""
                    buttonText="Więcej w aplikacji!"
                />

            </TabsContent>

            {/*BLACK FEATHER*/}
            <TabsContent value="tab2">

                <PricingCard
                    title="Black Feather"
                    price="160 zł / rok"
                    features={[
                        <strong>Anuluj w dowolnym momencie!</strong>,
                        <strong>Wszytsko co w Silver Wing, plus:</strong>,
                        <>
                            <strong>Generowanie tras za pomocą AI</strong> -  Funkcja automatycznego generowania tras na podstawie preferencji i opisu użytkownika. Do 10 tras na miesiąc.
                        </>,
                        <>
                            <strong>Planowanie tras na określony dzień</strong> - Tworzenie tras z wyprzedzeniem i publikowanie ich z opcją dopisania się innych użytkowników.
                        </>,
                        <>
                            <strong>Tworzenie wydarzeń</strong> -  Możliwość tworzenia wydarzeń (dla użytkowników, firm i grup).
                        </>,
                        <>
                            <strong>Tworzenie grup</strong> -   Opcja tworzenia grup, w których inni użytkownicy mogą się zapisywać i dzielić trasami oraz wydarzeniami.
                        </>,
                    ]}
                    link=""
                    buttonText="Więcej w aplikacji!"
                />

            </TabsContent>

            {/*SHADOW RAVEN*/}
            <TabsContent value="tab3">
                <PricingCard
                    title="Shadow Raven"
                    price="180 zł / rok"
                    features={[
                        <strong>Anuluj w dowolnym momencie!</strong>,
                        <strong>Wszytsko co w Black Feather, plus:</strong>,
                        <>
                            <strong>Generowanie tras za pomocą AI</strong> -  Funkcja automatycznego generowania tras na podstawie preferencji i opisu użytkownika. Do 20 tras na miesiąc.
                        </>,
                        <>
                            <strong>Priorytetowe wsparcie</strong> - Szybsze wsparcie techniczne i priorytetowy dostęp do nowych funkcji.
                        </>,
                        <>
                            <strong>Ekskluzywne trasy i wydarzenia</strong> -   Dostęp do specjalnych tras i wydarzeń przygotowanych przez partnerów Raven Road.
                        </>,
                        <>
                            <strong>Nielimitowane zapisywanie tras offline</strong> -   Brak limitu w liczbie zapisanych tras offline.
                        </>,
                    ]}
                    link=""
                    buttonText="Więcej w aplikacji!"
                />
                
            </TabsContent>
        </Tabs>
        </div>
    )

}



const TabsContent = (props: TabsContentProps) => {

    return (

        <Tabs.Content
            key="tab3"
            padding="$2"
            alignItems="center"
            justifyContent="center"
            flex={1}
            borderRadius="$2"
            borderTopLeftRadius={0}
            borderTopRightRadius={0}
            borderWidth="$2"
            {...props}
        >

            {props.children}

        </Tabs.Content>

    )

}

//Tworzy zakładki
const CustomTab = ({ value, label }) => {
    return (
        <Tabs.Tab
            flex={1}
            value={value}
            backgroundColor="transparent"
            borderColor="white"
            hoverStyle={{
                backgroundColor: "transparent",
                borderColor: "blue",
            }}
            pressStyle={{
                borderColor: "blue",
            }}
            focusStyle={{
                backgroundColor: "transparent",
                borderColor: "blue",
            }}
        >
            <SizableText
                color="white"
                fontSize="20px"
            >
                {label}
            </SizableText>
        </Tabs.Tab>
    );
};

//////////////////////////////////////////////// Tworzenie kart
function PricingCard({ title, price, features, link, buttonText, isRecommended }) {
    return (
        <Card
            elevate size="$4"
            bordered
            width={800}
            height={600}
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
                            <span className="feature_text">
                                {feature}
                            </span>
                        </span>
                    </Paragraph>
                ))}
            </YStack>
            <YStack flex={1} justifyContent="flex-end" alignItems="center" marginTop="$4">
                {/*<Link to="/pricing/purchase" onClick={() => {*/}
                {/*    localStorage.setItem('subscriptionName', title);*/}
                {/*    localStorage.setItem('price', price);*/}
                {/*}}>*/}
                    <button className="edit" role="button"><span className="text">{buttonText}</span></button>
                {/*</Link>*/}
            </YStack>
        </Card>
    );
}
