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
        <Tabs
            defaultValue="tab1"
            orientation="horizontal"
            flexDirection="column"
            width={600}
            height={600}
            borderRadius="$4"
            borderWidth="$0.25"
            overflow="hidden"
            borderColor="transparent"
        >

            <Tabs.List
                separator={<Separator vertical />}
                disablePassBorderRadius="bottom"
                aria-label="Manage your account"
            >

                <Tabs.Tab flex={1} value="tab1">

                    <SizableText fontFamily="$body">Profile</SizableText>

                </Tabs.Tab>

                <Tabs.Tab flex={1} value="tab2">

                    <SizableText fontFamily="$body">Connections</SizableText>

                </Tabs.Tab>

                <Tabs.Tab flex={1} value="tab3">

                    <SizableText fontFamily="$body">Notifications</SizableText>

                </Tabs.Tab>

            </Tabs.List>

            <Separator />

            <TabsContent value="tab1">

                <H5>Profilee</H5>
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

            </TabsContent>
            <TabsContent value="tab2">

                <H5>Connections</H5>

            </TabsContent>
            <TabsContent value="tab3">

                <H5>Notifications</H5>

            </TabsContent>

        </Tabs>

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

//Tworzenie kart
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