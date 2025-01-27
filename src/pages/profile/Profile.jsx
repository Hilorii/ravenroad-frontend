import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './profile.css';
import { Navbar } from '../../components/index';
import { FaCamera, FaCar, FaTruck, FaMotorcycle, FaBicycle } from 'react-icons/fa';
import { useUser } from '../../contexts/UserContext';
import AnimatedBackground from '../../assets/AnimatedBackground/AnimatedBackground';
import { Footer } from "../../containers";
import EditProfile from './EditProfile'; // Upewnij się, że ścieżka jest poprawna

const ProfilePage = () => {
    const { username } = useParams();
    const { user } = useUser(); // Zakładamy, że z kontekstu otrzymujesz obiekt { id, username, email, ...}

    // Wyświetlana nazwa: jeśli w kontekście brak usera, użyj param z URL (lub 'Username')
    const displayName = user?.username || username || 'Username';

    // Avatar / Banner
    const [avatarUrl, setAvatarUrl] = useState('');
    const [bannerUrl, setBannerUrl] = useState('');

    // Preferencje pojazdów
    const [car, setCar] = useState(false);
    const [truck, setTruck] = useState(false);
    const [motorcycle, setMotorcycle] = useState(false);
    const [bike, setBike] = useState(false);

    // Referencje do <input type="file"> (ukrytych)
    const avatarInputRef = useRef(null);
    const bannerInputRef = useRef(null);

    // Pobieranie danych o użytkowniku (avatar, banner)
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

    // Pobieranie preferencji pojazdów
    useEffect(() => {
        if (!user?.id) return;

        const fetchPreferences = async () => {
            try {
                const res = await fetch(`http://localhost:5000/user/${user.id}/preferences`, {
                    method: 'GET',
                    credentials: 'include'
                });
                if (!res.ok) {
                    console.error('Failed to fetch user preferences');
                    return;
                }
                const prefs = await res.json();
                // prefs ma np. { car: 1, truck: 0, motorcycle: 1, bike: 0 }
                setCar(prefs.car === 1);
                setTruck(prefs.truck === 1);
                setMotorcycle(prefs.motorcycle === 1);
                setBike(prefs.bike === 1);
            } catch (err) {
                console.error('Error fetching preferences:', err);
            }
        };

        fetchPreferences();
    }, [user?.id]);

    /**
     * Obsługa zmiany avatara
     */
    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (!file || !user?.id) return;

        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const response = await fetch(`http://localhost:5000/user/${user.id}/avatar`, {
                method: 'PUT',
                credentials: 'include',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload avatar');
            }

            const data = await response.json();
            if (data?.user?.avatar) {
                setAvatarUrl(`http://localhost:5000/uploads/${data.user.avatar}`);
            }

            // Odśwież całą stronę (np. by zaktualizować Navbar):
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
            if (data?.user?.banner) {
                setBannerUrl(`http://localhost:5000/uploads/${data.user.banner}`);
            }

        } catch (err) {
            console.error(err);
        }
    };

    /**
     * Funkcja wywoływana po pomyślnym zapisie profilu w komponencie EditProfile.
     */
    const handleProfileUpdated = (updatedUser) => {
        console.log('Zaktualizowany użytkownik:', updatedUser);
        // Możesz np. ponownie pobrać usera z back-endu lub
        // zrobić window.location.reload();
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

                    {/* Nazwa użytkownika i IKONKI preferencji */}
                    <h1 className="profile-username">
                        {displayName}

                        {/* Sekcja ikonek pojazdów obok nazwy użytkownika */}
                        <div className="profile-preferences">
                            {car && <FaCar className="vehicle-icon active" />}
                            {truck && <FaTruck className="vehicle-icon active" />}
                            {motorcycle && <FaMotorcycle className="vehicle-icon active" />}
                            {bike && <FaBicycle className="vehicle-icon active" />}
                        </div>
                    </h1>
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
