//USED IN APP
import type { CardProps } from 'tamagui'
import { Card, H2, Image, Paragraph, XStack, YStack } from 'tamagui'
import { useTranslation } from 'react-i18next'
import '../../App.css'

export function ProCard() {
    const { t } = useTranslation()

    return (
        <XStack className="pro-card" $sm={{ flexDirection: 'column' }} paddingHorizontal="$3" space>
            <SubscriptionCard
                title={t('title.freeFlight')}
                description={
                    <div className="container-pro">
                        <span>{t('description.freeFlight.line1')}</span>
                        <br /><span className="pro-span">{t('description.freeFlight.line2')}</span>
                        <br /><span className="pro-span">{t('description.freeFlight.line3')}</span>
                        <br /><span className="pro-span">{t('description.freeFlight.line4')}</span>
                        <br /><span className="pro-span">{t('description.freeFlight.line5')}</span>
                        <br /><span className="pro-span">{t('description.freeFlight.line6')}</span>
                        <br /><span className="pro-span">{t('description.freeFlight.line7')}</span>
                    </div>
                }
                url="https://example.com/free.png"
            />
            <SubscriptionCard
                title={t('title.silverWing')}
                description={
                    <div className="container-pro">
                        <span>{t('description.silverWing.line1')}</span>
                        <br /><span className="pro-span">{t('description.silverWing.line2')}</span>
                        <br /><span className="pro-span">{t('description.silverWing.line3')}</span>
                        <br /><span className="pro-span">{t('description.silverWing.line4')}</span>
                        <br /><span className="pro-span">{t('description.silverWing.line5')}</span>
                        <br /><span className="pro-span">{t('description.silverWing.line6')}</span>
                    </div>
                }
                url="https://example.com/silver.png"
            />
            <SubscriptionCard
                title={t('title.blackFeather')}
                description={
                    <div className="container-pro">
                        <span>{t('description.blackFeather.line1')}</span>
                        <br /><span className="pro-span">{t('description.blackFeather.line2')}</span>
                        <br /><span className="pro-span">{t('description.blackFeather.line3')}</span>
                        <br /><span className="pro-span">{t('description.blackFeather.line4')}</span>
                        <br /><span className="pro-span">{t('description.blackFeather.line5')}</span>
                        <br /><span className="pro-span">{t('description.blackFeather.line6')}</span>
                    </div>
                }
                url="https://example.com/black.png"
            />
            <SubscriptionCard
                title={t('title.shadowRaven')}
                description={
                    <div className="container-pro">
                        <span>{t('description.shadowRaven.line1')}</span>
                        <br /><span className="pro-span">{t('description.shadowRaven.line2')}</span>
                        <br /><span className="pro-span">{t('description.shadowRaven.line3')}</span>
                        <br /><span className="pro-span">{t('description.shadowRaven.line4')}</span>
                        <br /><span className="pro-span">{t('description.shadowRaven.line5')}</span>
                        <br /><span className="pro-span">{t('description.shadowRaven.line6')}</span>
                    </div>
                }
                url="https://example.com/shadow.png"
            />
        </XStack>
    )
}

export function SubscriptionCard({
                                     title,
                                     description,
                                     url,
                                     ...props
                                 }: CardProps & { title: string; description: React.ReactNode; url: string }) {
    const { t } = useTranslation()

    return (
        <Card
            elevate
            size="$4"
            bordered
            {...props}
            backgroundColor=""
            margin="$6"
            width={300}
            height={400}
            className="card"
        >
            <Card.Header padded>
                <H2 className="gradient__text" paddingBottom="$1">
                    {title}
                </H2>
                <Paragraph className="gradient__text" theme="alt2" fontSize="$8">
                    {description}
                </Paragraph>
            </Card.Header>
            <Card.Footer padded>
                <XStack flex={1} />
                <YStack flex={100} justifyContent="flex-end" alignItems="center" marginTop="$-4">
                    <button className="edit" role="button">
                        <span className="text">{t('button.moreInApp')}</span>
                    </button>
                </YStack>
            </Card.Footer>
            <Card.Background>
                <Image
                    resizeMode="contain"
                    alignSelf="center"
                    source={{
                        uri: url,
                        width: 300,
                        height: 300
                    }}
                />
            </Card.Background>
        </Card>
    )
}
