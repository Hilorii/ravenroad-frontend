//USED IN NAVBAR
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
    const { user, logout, setUser } = useUser();

    // Sign out function
    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:5000/logout', {  // upewnij się, że adres URL jest poprawny
                method: 'POST',
                credentials: 'include',  // To zapewnia, że ciasteczka są dołączone do żądania
            });

            if (response.ok) {
                logout();
                navigate('/');
                window.location.reload();

            } else {
                console.error("Logout failed:", response.status);
            }
        } catch (err) {
            console.error("Logout error:", err);
        }
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

                    <Popover.Close asChild>
                        <Button size="$3" onClick={handleProfileClick}>
                            Profil
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
