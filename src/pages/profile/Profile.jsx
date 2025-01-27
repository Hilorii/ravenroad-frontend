import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './profile.css';
import { Navbar } from '../../components/index';
import { FaCamera } from 'react-icons/fa';
import { useUser } from '../../contexts/UserContext';
import AnimatedBackground from '../../assets/AnimatedBackground/AnimatedBackground';
import { Footer } from "../../containers";
import EditProfile from './EditProfile'; // Upewnij się, że ścieżka jest poprawna

const ProfilePage = () => {
    const { username } = useParams();
    const { user } = useUser(); // Zakładamy, że z kontekstu otrzymujesz obiekt {id, username, email, ...}

    // Wyświetlana nazwa: jeśli w kontekście brak usera, użyj param z URL (lub 'Username')
    const displayName = user?.username || username || 'Username';

    const [avatarUrl, setAvatarUrl] = useState('');
    const [bannerUrl, setBannerUrl] = useState('');

    // Referencje do <input type="file"> (ukrytych)
    const avatarInputRef = useRef(null);
    const bannerInputRef = useRef(null);

    // Funkcja, która pobiera aktualne dane użytkownika (avatar, banner) z back-endu
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

                // Jeżeli w bazie przechowujesz tylko nazwę pliku, budujemy pełne URL-e do /uploads/...
                if (data.avatar) {
                    setAvatarUrl(`http://localhost:5000/uploads/${data.avatar}`);
                }
                if (data.banner) {
                    setBannerUrl(`http://localhost:5000/uploads/${data.banner}`);
                }
            } catch (err) {
                console.error('Error fetching user data:', err);
            }
        };
        fetchUserData();
    }, []);

    /**
     * Obsługa zmiany avatara
     */
    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (!file || !user?.id) return; // Brak pliku lub brak danych użytkownika

        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const response = await fetch(`http://localhost:5000/user/${user.id}/avatar`, {
                method: 'PUT', // PUT, bo aktualizujemy istniejący zasób
                credentials: 'include',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload avatar');
            }

            const data = await response.json();
            // data.user.avatar to nazwa pliku z bazy
            if (data?.user?.avatar) {
                setAvatarUrl(`http://localhost:5000/uploads/${data.user.avatar}`);
            }

            // Jeśli chcesz natychmiast odświeżyć całą stronę (np. by zaktualizować także Navbar):
            window.location.reload();

        } catch (err) {
            console.error(err);
        }
    };

    /**
     * Obsługa zmiany bannera
     */
    const handleBannerChange = async (e) => {
        const file = e.target.files[0];
        if (!file || !user?.id) return;

        const formData = new FormData();
        formData.append('banner', file);

        try {
            const response = await fetch(`http://localhost:5000/user/${user.id}/banner`, {
                method: 'PUT',
                credentials: 'include',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload banner');
            }

            const data = await response.json();
            // data.user.banner to nazwa pliku z bazy
            if (data?.user?.banner) {
                setBannerUrl(`http://localhost:5000/uploads/${data.user.banner}`);
            }

        } catch (err) {
            console.error(err);
        }
    };

    /**
     * Funkcja wywoływana po pomyślnym zapisie profilu w komponencie EditProfile.
     * Możesz tutaj np. ponownie pobrać usera z back-endu albo zrobić inny update.
     */
    const handleProfileUpdated = (updatedUser) => {
        // Prosty przykład: jeżeli chcesz natychmiast pokazać zmiany w Username
        // (o ile w "user" z kontekstu jest "username"), możesz zrobić:
        // 1) odświeżyć usera z kontekstu (jeśli w UserContext masz np. refreshUser()) lub
        // 2) zmienić local state w tym komponencie

        // Przykład minimalny (ponowne wczytanie całej strony):
        // window.location.reload();

        console.log('Zaktualizowany użytkownik:', updatedUser);
    };

    return (
        <div>
            <AnimatedBackground />
            <Navbar />

            {/* Główny kontener profilu */}
            <div className="profile-container">

                {/* BANNER */}
                <div className="profile-banner">
                    <img
                        src={bannerUrl}
                        alt="User banner"
                        className="profile-banner-img"
                    />

                    {/* Ikona do zmiany banneru */}
                    <div
                        className="profile-banner-upload"
                        onClick={() => bannerInputRef.current?.click()}
                    >
                        <FaCamera />
                    </div>
                    <input
                        type="file"
                        ref={bannerInputRef}
                        style={{ display: 'none' }}
                        onChange={handleBannerChange}
                        accept="image/*"
                    />
                </div>

                <div className="profile-content">
                    {/* AVATAR */}
                    <div className="profile-avatar-wrapper">
                        <img
                            src={avatarUrl}
                            alt="User avatar"
                            className="profile-avatar"
                        />

                        {/* Ikona do zmiany avatara */}
                        <div
                            className="profile-avatar-upload"
                            onClick={() => avatarInputRef.current?.click()}
                        >
                            <FaCamera />
                        </div>
                        <input
                            type="file"
                            ref={avatarInputRef}
                            style={{ display: 'none' }}
                            onChange={handleAvatarChange}
                            accept="image/*"
                        />
                    </div>
                    <h1 className="profile-username">{displayName}</h1>
                </div>
            </div>

            {/* Komponent do edycji profilu */}
            {user && (
                <EditProfile
                    userId={user.id}
                    initialUsername={user.username}
                    initialEmail={user.email}
                    onProfileUpdated={handleProfileUpdated}
                />
            )}

            <Footer />
        </div>
    );
};

export default ProfilePage;
