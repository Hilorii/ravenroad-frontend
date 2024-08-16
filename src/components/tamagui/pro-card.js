//USED IN APP
import type { CardProps } from 'tamagui'
import { Button, Card, H2, Image, Paragraph, XStack } from 'tamagui'
import { Link } from 'react-router-dom'

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
        <Card elevate size="$4" bordered {...props}>
            <Card.Header padded>
                <H2>{title}</H2>
                <Paragraph theme="alt2">{description}</Paragraph>
            </Card.Header>

            <Card.Footer padded>
                <XStack flex={1} />
                <Link to="/pricing">
                    <Button borderRadius="$10">Wypróbuj za darmo!</Button>
                </Link>
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
