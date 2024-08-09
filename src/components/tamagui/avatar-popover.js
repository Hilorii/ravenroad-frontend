import React from 'react';
import type { PopoverProps } from 'tamagui';
import { Adapt, Button, Input, Label, Popover, XStack, YStack } from 'tamagui';
import { AvatarDemo } from './avatar';
import '../navbar/navbar.css';

import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { styled } from '@tamagui/core';

// Avatar button styles
const CustomButton = styled(Button, {
    backgroundColor: 'transparent',
    color: 'transparent',
    padding: '1px 2px',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    outline: 'none',
    hoverStyle: {
        border: 'none',
        backgroundColor: 'transparent',
    },
});

export function PopoverDemo() {
    return (
        <Demo placement="bottom" Icon={AvatarDemo} Name="bottom-popover" />
    );
}

export function Demo({
                         Icon,
                         Name,
                         ...props
                     }: PopoverProps & { Icon?: any; Name?: string }) {

    // Navigation
    const navigate = useNavigate();

    // Get user from context
    const { user, logout } = useUser();

    // Sign out function
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Navigate to profile function
    const handleProfileClick = () => {
        if (user && user.username) {
            navigate(`/profile/${user.username}`);
        } else {
            console.error('User is undefined or missing username');
        }
    };

    return (
        <Popover size="$5" allowFlip {...props}>
            <Popover.Trigger asChild>
                <CustomButton icon={Icon} />
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
                        <Button size="$3" onClick={handleProfileClick}>
                            Inne coś
                        </Button>
                    </Popover.Close>

                    <Popover.Close asChild>
                        <Button size="$3" onClick={handleLogout}>
                            Wyloguj
                        </Button>
                    </Popover.Close>
                    
                </YStack>
            </Popover.Content>
        </Popover>
    );
}
