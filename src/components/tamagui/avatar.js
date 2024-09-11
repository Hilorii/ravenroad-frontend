import React, { useEffect, useState } from 'react';
import { Avatar, XStack } from 'tamagui';

export function AvatarDemo() {
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:5000/user', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();

                // Assuming the avatar filename is stored in data.avatar
                if (data.avatar) {
                    setAvatarUrl(`http://localhost:5000/uploads/${data.avatar}`);
                } else {
                    // If there's no avatar, set a default one
                    setAvatarUrl('http://localhost:5000/uploads/default-avatar.jpg');
                }
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Error loading avatar');
            }
        };

        fetchUserData();
    }, []);

    return (
        <XStack alignItems="center" gap="$6">
            <Avatar circular size="$8">
                {avatarUrl ? (
                    <Avatar.Image
                        accessibilityLabel="User Avatar"
                        src={avatarUrl}
                    />
                ) : (
                    <Avatar.Fallback backgroundColor="$blue10" />
                )}
                {error && <p className="error-message">{error}</p>}
            </Avatar>
        </XStack>
    );
}
