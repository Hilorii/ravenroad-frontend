import React, { useState, useContext, useEffect } from 'react';
import { FaInbox } from 'react-icons/fa';
import './navbar.css';
import logo from '../../assets/RRlogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { useUser } from '../../contexts/UserContext';
import { useTranslation } from 'react-i18next';

import TopBar from './TopBar';
import ScrollToTopBtn from './ScrollToTopBtn';
import AvatarMenu from '../avatarMenu/AvatarMenu';

const Navbar = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const { logout } = useUser();
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const { t } = useTranslation();

    // Czy istnieją jakieś nieprzeczytane powiadomienia
    const hasNewNotifications = notifications.some(
        (notification) => notification.is_read === 0
    );

    // Wylogowanie
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
                console.error('Logout failed:', response.status);
            }
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    // Kliknięcie w ikonę powiadomień
    const toggleNotifications = async () => {
        setShowNotifications((prev) => !prev);

        // Jeśli mamy nieprzeczytane powiadomienia -> oznacz je jako przeczytane
        if (hasNewNotifications) {
            try {
                const response = await fetch(
                    'http://localhost:5000/notifications/mark-as-read',
                    {
                        method: 'PATCH',
                        credentials: 'include',
                    }
                );
                if (response.ok) {
                    // Aktualizuj stan, żeby is_read było 1
                    const updated = notifications.map((notification) => ({
                        ...notification,
                        is_read: 1,
                    }));
                    setNotifications(updated);
                } else {
                    console.error('Failed to mark notifications as read');
                }
            } catch (error) {
                console.error('Error marking notifications as read:', error);
            }
        }
    };

    // Kliknięcie poza popupem -> zamknięcie
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                showNotifications &&
                !event.target.closest('.notifications-popup') &&
                !event.target.closest('.notify-icon')
            ) {
                setShowNotifications(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showNotifications]);

    // Pobranie powiadomień z backendu
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch('http://localhost:5000/notifications', {
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setNotifications(data);
                    console.log('Fetched notifications:', data);
                } else {
                    console.error('Failed to fetch notifications');
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        if (user) {
            fetchNotifications();
        }
    }, [user]);

    // Funkcje akceptacji/odrzucenia (placeholder)
    const handleAccept = (notificationId) => {
        console.log('Zaakceptuj powiadomienie ID:', notificationId);
        // TODO: fetch / potwierdź w backendzie
    };

    const handleReject = (notificationId) => {
        console.log('Odrzuć powiadomienie ID:', notificationId);
        // TODO: fetch / odrzuć w backendzie
    };

    // Komponent Menu (tylko na duży ekran)
    const Menu = () => {
        if (!user && window.location.pathname === '/') {
            return (
                <>
                    <p className="nav-p">
                        <a className="nav-a" href="#pro">
                            {t('navbar.menuItems.pro')}
                        </a>
                    </p>
                    <p className="nav-p">
                        <a className="nav-a" href="/register">
                            {t('navbar.menuItems.planTrip')}
                        </a>
                    </p>
                    <p className="nav-p">
                        <a className="nav-a" href="/register">
                            {t('navbar.menuItems.readyRoutes')}
                        </a>
                    </p>
                    <p className="nav-p">
                        <a className="nav-a" href="/contact">
                            {t('navbar.menuItems.contact')}
                        </a>
                    </p>
                    <p className="nav-p">
                        <a className="nav-a" href="#ad">
                            {t('navbar.menuItems.collaboration')}
                        </a>
                    </p>
                </>
            );
        } else if (user && window.location.pathname === '/') {
            return (
                <>
                    <p className="nav-p">
                        <a className="nav-a" href="#pro">
                            {t('navbar.menuItems.pro')}
                        </a>
                    </p>
                    <p className="nav-p">
                        <a className="nav-a" href="/contact">
                            {t('navbar.menuItems.contact')}
                        </a>
                    </p>
                    <p className="nav-p">
                        <a className="nav-a" href="#ad">
                            {t('navbar.menuItems.collaboration')}
                        </a>
                    </p>
                    <p className="nav-p">
                        <a className="nav-a" href={`/profile/${user?.username}`}>
                            {t('navbar.menuItems.profile')}
                        </a>
                    </p>
                </>
            );
        } else if (user) {
            return (
                <>
                    <p className="nav-p">
                        <a className="nav-a" href="/">
                            {t('navbar.menuItems.home')}
                        </a>
                    </p>
                    <p className="nav-p">
                        <a className="nav-a" href="/contact">
                            {t('navbar.menuItems.contact')}
                        </a>
                    </p>
                    <p className="nav-p">
                        <a className="nav-a" href={`/profile/${user?.username}`}>
                            {t('navbar.menuItems.profile')}
                        </a>
                    </p>
                </>
            );
        } else {
            return (
                <>
                    <p className="nav-p">
                        <a className="nav-a" href="/">
                            {t('navbar.menuItems.home')}
                        </a>
                    </p>
                    <p className="nav-p">
                        <a className="nav-a" href="/contact">
                            {t('navbar.menuItems.contact')}
                        </a>
                    </p>
                </>
            );
        }
    };

    return (
        <>
            <TopBar />
            <div className="rr__navbar">
                {/* Logo i linki (tylko na dużych ekranach) */}
                <div className="rr__navbar-links">
                    <div className="rr__navbar-links_logo">
                        <a href="/">
                            <img src={logo} alt="logo" />
                        </a>
                    </div>
                    <div className="rr__navbar-links_container">
                        <Menu />
                    </div>
                </div>

                {/* Prawa strona: powiadomienia + avatar */}
                <div className="rr__navbar-sign">
                    {user ? (
                        <div className="navbar-user">
                            <div className="avatar-notify">
                                <div
                                    className="notify-icon"
                                    onClick={toggleNotifications}
                                    style={{ position: 'relative', cursor: 'pointer' }}
                                >
                                    <FaInbox
                                        color={hasNewNotifications ? 'orange' : 'white'}
                                        size={20}
                                    />
                                    {hasNewNotifications && (
                                        <span className="notification-alert">!</span>
                                    )}
                                </div>
                                <AvatarMenu
                                    handleLogout={handleLogout}
                                    // Przekazujemy logikę menu i eventy do avatar menu
                                    notifications={notifications}
                                    showNotifications={showNotifications}
                                    setShowNotifications={setShowNotifications}
                                    handleAccept={handleAccept}
                                    handleReject={handleReject}
                                />
                            </div>

                            {/* Okienko z powiadomieniami, wyświetlane TYLKO na klik w "kopertę" */}
                            {showNotifications && (
                                <div
                                    className={`notifications-popup ${
                                        showNotifications ? 'show' : ''
                                    }`}
                                >
                                    <div className="popup-arrow"></div>
                                    <div className="notifications-list">
                                        {notifications.length > 0 ? (
                                            notifications.map((notification) => {
                                                // Obliczamy date wygaśnięcia (1 tydzień)
                                                const createdAt = new Date(notification.created_at);
                                                const expireAt = new Date(
                                                    createdAt.getTime() + 7 * 24 * 60 * 60 * 1000
                                                );

                                                return (
                                                    <div
                                                        key={notification.id}
                                                        className="notification-container"
                                                    >
                                                        <p className="notification-content">
                                                            {notification.content}
                                                        </p>

                                                        {/* Jeśli type = group lub event -> pokazujemy przyciski */}
                                                        {(notification.type === 'group' ||
                                                            notification.type === 'event') && (
                                                            <div className="notification-buttons">
                                                                <button
                                                                    className="btn-accept"
                                                                    onClick={() =>
                                                                        handleAccept(notification.id)
                                                                    }
                                                                >
                                                                    ✓
                                                                </button>
                                                                <button
                                                                    className="btn-reject"
                                                                    onClick={() =>
                                                                        handleReject(notification.id)
                                                                    }
                                                                >
                                                                    X
                                                                </button>
                                                            </div>
                                                        )}

                                                        {/* Daty małym druczkiem */}
                                                        <p className="notification-dates">
                                                            {t('navbar.notifications.sentDate')}:{' '}
                                                            {createdAt.toLocaleDateString()}
                                                        </p>
                                                        <p className="notification-dates">
                                                            {t('navbar.notifications.expireDate')}:{' '}
                                                            {expireAt.toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <p>{t('navbar.notifications.noNotifications')}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <p className="nav-p">
                                <Link to="login">{t('navbar.menuItems.login')}</Link>
                            </p>
                            <button
                                className="signup"
                                onClick={() => navigate('/register')}
                                type="button"
                            >
                                {t('navbar.menuItems.register')}
                            </button>
                        </>
                    )}
                </div>
            </div>
            <ScrollToTopBtn />
        </>
    );
};

export default Navbar;
