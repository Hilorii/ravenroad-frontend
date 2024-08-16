//USED IN APP
import type { CardProps } from 'tamagui'
import { Card, H2, Image, Paragraph, XStack, YStack } from 'tamagui'
import { Link } from 'react-router-dom'
import '../../App.css'

export function ProCard() {
    return (
        <XStack $sm={{ flexDirection: 'column' }} paddingHorizontal="$4" space>
            <SubscriptionCard
                title="Miesiąc"
                description="Anuluj w dowolnym momencie!"
                url="https://example.com/month.png"
                animation="bouncy"
                size="$4"
                width={250}
                height={300}
                scale={0.9}
                hoverStyle={{ scale: 0.925 }}
                pressStyle={{ scale: 0.875 }}
            />
            <SubscriptionCard
                title="Rok"
                description={<><span>Otrymasz:</span><br/><span>- kopa w pupe</span></>}
                url="https://example.com/year.png"
                animation="bouncy"
                size="$4"
                width={250}
                height={300}
                scale={0.9}
                hoverStyle={{ scale: 0.925 }}
                pressStyle={{ scale: 0.875 }}
            />
            <SubscriptionCard
                title="Rok (AI)"
                description="Specjalna oferta na subskrypcję AI!"
                url="https://example.com/year-ai.png"
                animation="bouncy"
                size="$4"
                width={250}
                height={300}
                scale={0.9}
                hoverStyle={{ scale: 0.925 }}
                pressStyle={{ scale: 0.875 }}
            />
        </XStack>
    )
}

export function SubscriptionCard({ title, description, url, ...props }: CardProps & { title: string, description: string, url: string }) {
    return (
        <Card elevate size="$4"
              bordered {...props}
              backgroundColor={''}
              margin="$6"
              width={300}
              height={400}

        >
            <Card.Header padded>
                <H2 className="gradient__text">{title}</H2>
                    <Paragraph className="gradient__text" theme="alt2" fontSize="$8">{description}</Paragraph>
            </Card.Header>

            <Card.Footer padded>
                <XStack flex={1} />
                <YStack flex={100} justifyContent="flex-end" alignItems="center" marginTop="$4">
                    <Link to="/pricing">
                        <button className="edit" role="button"><span className="text">Wypróbuj za darmo!</span></button>
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
