//import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from '@tamagui/lucide-icons'
import type { PopoverProps } from 'tamagui'
import { Adapt, Button, Input, Label, Popover, XStack, YStack, Avatar} from 'tamagui'
import { AvatarDemo } from  './avatar'
import React from "react";


export function PopoverDemo() {
    return (
        <Demo placement="bottom" Icon={AvatarDemo} Name="bottom-popover" />
        // <XStack gap="$2" flex={1} justifyContent="center" alignItems="center">
        //     <Demo placement="bottom"   Name="bottom-popover">
        //         <Avatar circular size="$8">
        //             <Avatar.Image
        //                 accessibilityLabel="Cam"
        //                 src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
        //                 // src='../assets/default-avatar'
        //             />
        //             <Avatar.Fallback backgroundColor="$blue10" />
        //         </Avatar>
        //     </Demo>
        // </XStack>

    )

}
export function Demo({

                         Icon,

                         Name,

                         ...props

                     }: PopoverProps & { Icon?: any; Name?: string }) {

    return (

        <Popover size="$5" allowFlip {...props}>

            <Popover.Trigger asChild>

                <Button icon={Icon} />

            </Popover.Trigger>
            <Adapt when="sm" platform="touch">

                <Popover.Sheet modal dismissOnSnapToBottom>

                    <Popover.Sheet.Frame padding="$4">

                        <Adapt.Contents />

                    </Popover.Sheet.Frame>

                    <Popover.Sheet.Overlay
                        animation="lazy"
                        enterStyle={{ opacity: 0 }}
                        exitStyle={{ opacity: 0 }}
                    />

                </Popover.Sheet>

            </Adapt>
            <Popover.Content
                borderWidth={1}
                borderColor="$borderColor"
                enterStyle={{ y: -10, opacity: 0 }}
                exitStyle={{ y: -10, opacity: 0 }}
                elevate
                animation={[
                    'quick',
                    {
                        opacity: {
                            overshootClamping: true,
                        },
                    },
                ]}
            >

                <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
                <YStack gap="$3">

                    <XStack gap="$3">

                        <Label size="$3" htmlFor={Name}>

                            Name

                        </Label>

                        <Input size="$3" id={Name} />

                    </XStack>
                    <Popover.Close asChild>

                        <Button
                            size="$3"
                            onPress={() => {
                                /* Custom code goes here, does not interfere with popover closure */
                            }}
                        >

                            Submit

                        </Button>

                    </Popover.Close>

                </YStack>

            </Popover.Content>

        </Popover>

    )

}