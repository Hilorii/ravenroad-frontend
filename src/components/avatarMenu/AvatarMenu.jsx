import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import './AvatarMenu.css';

// Funkcja, która zwraca listę linków (to, co było w <Menu />),
function getMenuItems(user) {
    // Prosta logika na wzór Navbar -> można rozszerzyć zależnie od stanu usera
    const links = [];
    if (!user) {
        links.push({ label: 'Start', path: '/' });
        links.push({ label: 'Kontakt', path: '/contact' });
    } else {
        // Zalogowany
        links.push({ label: 'Start', path: '/' });
        links.push({ label: 'Kontakt', path: '/contact' });
        // links.push({ label: 'Profil', path: `/profile/${user.username}` });
    }
    return links;
}

const AvatarMenu = ({
                        handleLogout,
                        notifications,
                        showNotifications,
                        setShowNotifications,
                        handleAccept,
                        handleReject,
                    }) => {
    const { user, logout } = useUser();
    const navigate = useNavigate();

    const [avatarUrl, setAvatarUrl] = useState('');
    const [error, setError] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Stan do wykrywania szerokości ekranu
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const isMobile = windowWidth < 1000; // breakpoint musi być zgodny z tym w navbar.css

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
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Kliknięcie "Wyloguj"
    const handleLogoutClick = async () => {
        if (handleLogout) {
            await handleLogout();
        }
    };

    // Gdy jest mały ekran -> w avatar menu pokażemy linki z getMenuItems
    const menuItems = getMenuItems(user);

    return (
        <div className="avatar-container" ref={menuRef}>
            <div className="avatar" onClick={toggleMenu}>
                <img src={avatarUrl} alt="User avatar" className="profile-avatar" />
                <div className="avatar-arrow"></div>
            </div>

            {menuOpen && (
                <div className="avatar-menu">
                    {/* Jeśli jest mały ekran, pokaż także linki z "Menu" */}
                    {isMobile && (
                        <>
                            {menuItems.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        navigate(item.path);
                                        setMenuOpen(false);
                                    }}
                                >
                                    {item.label}
                                </button>
                            ))}
                            <hr />
                        </>
                    )}

                    {/* Te przyciski zawsze: Profil + Wyloguj */}
                    <button
                        onClick={() => {
                            handleProfileClick();
                            setMenuOpen(false);
                        }}
                    >
                        Profil
                    </button>
                    <button
                        onClick={() => {
                            handleLogoutClick();
                            setMenuOpen(false);
                        }}
                    >
                        Wyloguj
                    </button>
                </div>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default AvatarMenu;
