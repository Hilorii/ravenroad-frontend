//USED IN APP
import type { CardProps } from 'tamagui'
import { Card, H2, Image, Paragraph, XStack, YStack } from 'tamagui'
import { Link } from 'react-router-dom'
import '../../App.css'

export function ProCard() {
    return (
        <XStack className='pro-card' $sm={{ flexDirection: 'column' }} paddingHorizontal="$3" space>
            <SubscriptionCard
                title="Free Flight"
                description={
                <div className="container-pro">
                    <span>Otrymasz za <strong>DARMO:</strong></span>
                    <br/><span className="pro-span">- Podstawowa nawigacja</span>
                    <br/><span className="pro-span">- Tworzenie tras</span>
                    <br/><span className="pro-span">- Ocenianie tras</span>
                    <br/><span className="pro-span">- Zapisywanie się do eventów</span>
                    <br/><span className="pro-span">- Zapisywanie się na wyjazdy</span>
                    <br/><span className="pro-span">- I nie tylko...</span>
                </div>
                }
                url="https://example.com/year.png"
                animation="bouncy"
                size="$4"
                width={250}
                height={300}
                scale={1.1}
                hoverStyle={{ scale: 0.925 }}
                pressStyle={{ scale: 0.875 }}
            />
            <SubscriptionCard
                title="Silver Wing"
                description={
                    <div className="container-pro">
                        <span>Otrymasz na <strong>MIESIĄC:</strong></span>
                        <br/><span className="pro-span">- Wszystko z Free Flight</span>
                        <br/><span className="pro-span">- Generowanie tras z pomocą AI</span>
                        <br/><span className="pro-span">- Mapy offline</span>
                        <br/><span className="pro-span">- Nagrywanie tras z pomiarami</span>
                        <br/><span className="pro-span">- I nie tylko...</span>
                    </div>
                }
                url="https://example.com/month.png"
                animation="bouncy"
                size="$4"
                width={250}
                height={300}
                scale={1.1}
                hoverStyle={{scale: 0.925}}
                pressStyle={{scale: 0.875}}
            />
            <SubscriptionCard
                title="Black Feather"
                description={
                    <div className="container-pro">
                        <span>Otrymasz na <strong>ROK:</strong></span>
                        <br/><span className="pro-span">- Wszystko z Silver Wing</span>
                        <br/><span className="pro-span">- Planowanie tras na określony dzień</span>
                        <br/><span className="pro-span">- Tworzenie wydarzeń</span>
                        <br/><span className="pro-span">- Tworzenie grup</span>
                        <br/><span className="pro-span">- I nie tylko...</span>
                    </div>
                }
                url="https://example.com/year.png"
                animation="bouncy"
                size="$4"
                width={250}
                height={300}
                scale={1.1}
                hoverStyle={{scale: 0.925}}
                pressStyle={{scale: 0.875}}
            />
            <SubscriptionCard
                title="Shadow Raven"
                description={
                    <div className="container-pro">
                        <span>Otrymasz na <strong>ROK:</strong></span>
                        <br/><span className="pro-span">- Wszystko z Black Feather</span>
                        <br/><span className="pro-span">- Priorytetowe wsparcie</span>
                        <br/><span className="pro-span">- Ekskluzywne trasy i wydarzenia</span>
                        <br/><span className="pro-span">- Nielimitowane zapisywanie tras offline</span>
                        <br/><span className="pro-span">- I nie tylko...</span>
                    </div>
                }
                url="https://example.com/year-ai.png"
                animation="bouncy"
                size="$4"
                width={250}
                height={300}
                scale={1.1}
                hoverStyle={{scale: 0.925}}
                pressStyle={{scale: 0.875}}
            />
        </XStack>
    )
}

export function SubscriptionCard({
                                     title,
                                     description,
                                     url,
                                     ...props
                                 }: CardProps & { title: string, description: string, url: string }) {
    return (
        <Card elevate size="$4"
              bordered {...props}
              backgroundColor={''}
              margin="$6"
              width={300}
              height={400}
              className="card"

        >
            <Card.Header padded>
                <H2 className="gradient__text" paddingBottom="$1">{title}</H2>
                    <Paragraph className="gradient__text" theme="alt2" fontSize="$8" >{description}</Paragraph>
            </Card.Header>

            <Card.Footer padded>
                <XStack flex={1} />
                <YStack flex={100} justifyContent="flex-end" alignItems="center" marginTop="$-4">
                    <Link to="/pricing">
                        <button className="edit" role="button"><span className="text">Dowiedz się więcej!</span></button>
                    </Link>
                </YStack>
            </Card.Footer>

            <Card.Background>
            <Image
                    resizeMode="contain"
                    alignSelf="center"
                    source={{
                        uri: url,
                        width: 300,
                        height: 300,
                    }}
                />
            </Card.Background>
        </Card>
    )
}
