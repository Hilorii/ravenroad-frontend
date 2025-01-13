import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import './AvatarMenu.css';

const AvatarMenu = () => {
    const { user, logout } = useUser();
    const navigate = useNavigate();

    const [avatarUrl, setAvatarUrl] = useState('');
    const [error, setError] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Pobieranie awatara z serwera
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
                } else {
                    // domyślny avatar, jeśli brak
                    setAvatarUrl('http://localhost:5000/uploads/default-avatar.jpg');
                }
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Error loading avatar');
            }
        };

        fetchUserData();
    }, []);

    // Funkcja wylogowania
    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:5000/logout', {
                method: 'POST',
                credentials: 'include',
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

    // Przejście do profilu
    const handleProfileClick = () => {
        if (user && user.username) {
            navigate(`/profile/${user.username}`);
        } else {
            console.error('User is undefined or missing username');
        }
    };

    // Przełączanie widoczności menu
    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    // Zamykanie menu po kliknięciu poza jego obszarem
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false); // Zamknij menu
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="avatar-container" ref={menuRef}>
            <div
                className="avatar"
                onClick={toggleMenu}
                style={{ backgroundImage: `url(${avatarUrl})` }}
            >
                {/* Biała strzałka w prawym dolnym rogu */}
                <div className="avatar-arrow"></div>
            </div>

            {menuOpen && (
                <div className="avatar-menu">
                    <button onClick={handleProfileClick}>Profil</button>
                    <button onClick={handleLogout}>Wyloguj</button>
                </div>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default AvatarMenu;
