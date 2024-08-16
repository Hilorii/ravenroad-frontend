import { Spinner, YStack } from 'tamagui';

export function SpinnerLoading() {
    return (
        <YStack
            alignItems="center"
            justifyContent="center"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            backgroundColor="$background"
            width="100vw"
            height="100vh"
        >

            <div className="bg">
                <Spinner size="large" color="$orange10" />
            </div>

        </YStack>
    );
}
