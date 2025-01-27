import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './profile.css';
import { Navbar } from '../../components/index';
import { FaCamera } from 'react-icons/fa';
import { useUser } from '../../contexts/UserContext';
import AnimatedBackground from '../../assets/AnimatedBackground/AnimatedBackground';
import { Footer } from "../../containers";
import EditProfile from './EditProfile';

const ProfilePage = () => {
    const { username } = useParams();
    const { user } = useUser();

    // Jeżeli user istnieje (z kontekstu) to bierzemy user.username; w innym przypadku param z URL-a:
    const displayName = user?.username || username || 'Username';

    const [avatarUrl, setAvatarUrl] = useState('');
    const [bannerUrl, setBannerUrl] = useState('');

    // Referencje do inputów pliku (aby ukryć input i wywołać kliknięcie)
    const avatarInputRef = useRef(null);
    const bannerInputRef = useRef(null);

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

                // Jeżeli w bazie przechowujesz tylko nazwę pliku, to budujemy pełny URL do /uploads/...
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
                method: 'PUT',                // Zmieniamy na PUT
                credentials: 'include',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload avatar');
            }

            const data = await response.json();
            // data.user.avatar - nazwa pliku z bazy
            if (data?.user?.avatar) {
                setAvatarUrl(`http://localhost:5000/uploads/${data.user.avatar}`);
            }
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
                method: 'PUT',               // Zmieniamy na PUT
                credentials: 'include',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload banner');
            }

            const data = await response.json();
            // data.user.banner - nazwa pliku z bazy
            if (data?.user?.banner) {
                setBannerUrl(`http://localhost:5000/uploads/${data.user.banner}`);
            }
        } catch (err) {
            console.error(err);
        }
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

            <EditProfile/>

            <Footer />
        </div>
    );
};

export default ProfilePage;
