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

    // Czy są nieprzeczytane
    const hasNewNotifications = notifications.some(n => n.is_read === 0);

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

    // Otwórz/Zamknij popup z powiadomieniami
    const toggleNotifications = async () => {
        setShowNotifications(prev => !prev);

        // Oznacz jako przeczytane, jeśli są
        if (hasNewNotifications) {
            try {
                const response = await fetch('http://localhost:5000/notifications/mark-as-read', {
                    method: 'PATCH',
                    credentials: 'include',
                });
                if (response.ok) {
                    const updated = notifications.map(n => ({ ...n, is_read: 1 }));
                    setNotifications(updated);
                } else {
                    console.error('Failed to mark notifications as read');
                }
            } catch (error) {
                console.error('Error marking notifications as read:', error);
            }
        }
    };

    // Kliknięcie poza popup -> zamknij
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

    // Pobieranie powiadomień
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

    // === FUNKCJE AKCJI POWIADOMIENIA ===
    const handleAccept = async (notificationId) => {
        try {
            const response = await fetch(
                `http://localhost:5000/notifications/${notificationId}/confirm`,
                {
                    method: 'POST',
                    credentials: 'include',
                }
            );
            if (response.ok) {
                setNotifications(prev => prev.filter(n => n.notification_id !== notificationId));
                console.log(`Notification ${notificationId} confirmed`);
            } else {
                console.error('Failed to confirm membership', response.status);
            }
        } catch (error) {
            console.error('Error confirming membership:', error);
        }
    };

    const handleReject = async (notificationId) => {
        try {
            const response = await fetch(
                `http://localhost:5000/notifications/${notificationId}/reject`,
                {
                    method: 'POST',
                    credentials: 'include',
                }
            );
            if (response.ok) {
                setNotifications(prev => prev.filter(n => n.notification_id !== notificationId));
                console.log(`Notification ${notificationId} rejected`);
            } else {
                console.error('Failed to reject membership', response.status);
            }
        } catch (error) {
            console.error('Error rejecting membership:', error);
        }
    };

    const handleDeleteNotification = async (notificationId) => {
        try {
            const response = await fetch(
                `http://localhost:5000/notifications/${notificationId}`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                }
            );
            if (response.ok) {
                setNotifications(prev => prev.filter(n => n.notification_id !== notificationId));
                console.log(`Notification ${notificationId} deleted.`);
            } else {
                console.error('Failed to delete notification', response.status);
            }
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    // === RENDER MENU (tylko duże ekrany) ===
    const Menu = () => {
        if (!user && window.location.pathname === '/') {
            return (
                <>
                    <p className="nav-p">
                        <a className="nav-a" href="#pro">{t('navbar.menuItems.pro')}</a>
                    </p>
                    <p className="nav-p">
                        <a className="nav-a" href="/register">{t('navbar.menuItems.planTrip')}</a>
                    </p>
                    <p className="nav-p">
                        <a className="nav-a" href="/register">{t('navbar.menuItems.readyRoutes')}</a>
                    </p>
                    <p className="nav-p">
                        <a className="nav-a" href="/contact">{t('navbar.menuItems.contact')}</a>
                    </p>
                    <p className="nav-p">
                        <a className="nav-a" href="#ad">{t('navbar.menuItems.collaboration')}</a>
                    </p>
                </>
            );
        } else if (user && window.location.pathname === '/') {
            return (
                <>
                    <p className="nav-p">
                        <a className="nav-a" href="#pro">{t('navbar.menuItems.pro')}</a>
                    </p>
                    <p className="nav-p">
                        <a className="nav-a" href="/contact">{t('navbar.menuItems.contact')}</a>
                    </p>
                    <p className="nav-p">
                        <a className="nav-a" href="#ad">{t('navbar.menuItems.collaboration')}</a>
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
                        <a className="nav-a" href="/">{t('navbar.menuItems.home')}</a>
                    </p>
                    <p className="nav-p">
                        <a className="nav-a" href="/contact">{t('navbar.menuItems.contact')}</a>
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
                        <a className="nav-a" href="/">{t('navbar.menuItems.home')}</a>
                    </p>
                    <p className="nav-p">
                        <a className="nav-a" href="/contact">{t('navbar.menuItems.contact')}</a>
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
                                {/* AvatarMenu – niezmieniony */}
                                <AvatarMenu
                                    handleLogout={handleLogout}
                                    notifications={notifications}
                                    showNotifications={showNotifications}
                                    setShowNotifications={setShowNotifications}
                                    handleAccept={handleAccept}
                                    handleReject={handleReject}
                                />
                            </div>

                            {showNotifications && (
                                <div className={`notifications-popup ${showNotifications ? 'show' : ''}`}>
                                    <div className="popup-arrow"></div>
                                    <div className="notifications-list">
                                        {notifications.length > 0 ? (
                                            notifications.map(notification => {
                                                // klucz = notification.notification_id
                                                const createdAt = new Date(notification.created_at);
                                                const expireAt = new Date(createdAt.getTime() + 7 * 24 * 60 * 60 * 1000);

                                                return (
                                                    <div
                                                        key={notification.notification_id}
                                                        className="notification-container"
                                                    >
                                                        {/* Mały czerwony X */}
                                                        <div
                                                            className="close-notification"
                                                            onClick={() =>
                                                                handleDeleteNotification(notification.notification_id)
                                                            }
                                                        >
                                                            ✕
                                                        </div>

                                                        <p className="notification-content">
                                                            {notification.content}
                                                        </p>

                                                        {/* Pokaż przyciski jeśli type=group lub event */}
                                                        {(notification.type === 'group' ||
                                                            notification.type === 'event') && (
                                                            <div className="notification-buttons">
                                                                <button
                                                                    className="btn-accept"
                                                                    onClick={() =>
                                                                        handleAccept(notification.notification_id)
                                                                    }
                                                                >
                                                                    ✓
                                                                </button>
                                                                <button
                                                                    className="btn-reject"
                                                                    onClick={() =>
                                                                        handleReject(notification.notification_id)
                                                                    }
                                                                >
                                                                    X
                                                                </button>
                                                            </div>
                                                        )}

                                                        <p className="notification-dates">
                                                            {t('navbar.notifications.sentDate')}:{" "}
                                                            {createdAt.toLocaleDateString()}
                                                        </p>
                                                        <p className="notification-dates">
                                                            {t('navbar.notifications.expireDate')}:{" "}
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
