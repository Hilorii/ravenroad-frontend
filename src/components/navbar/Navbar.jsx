import React, { useState, useContext, useEffect, useRef } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
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
    const [toggleMenu, setToggleMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([{ id: 1, text: 'Nowe powiadomienie!' }]);
    const { t } = useTranslation();

    // Sprawdzamy, czy są jakieś nieprzeczytane powiadomienia
    const hasNewNotifications = notifications.some(notification => notification.is_read === 0);

    // Wylogowanie użytkownika
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

    // Pokazywanie / chowanie powiadomień i oznaczanie jako przeczytane
    const toggleNotifications = async () => {
        setShowNotifications(prevState => !prevState);

        if (hasNewNotifications) {
            try {
                const response = await fetch(`http://localhost:5000/notifications/mark-as-read`, {
                    method: 'PATCH',
                    credentials: 'include',
                });
                if (response.ok) {
                    const updatedNotifications = notifications.map(notification => ({
                        ...notification,
                        is_read: 1,
                    }));
                    setNotifications(updatedNotifications);
                } else {
                    console.error("Failed to mark notifications as read");
                }
            } catch (error) {
                console.error("Error marking notifications as read:", error);
            }
        }
    };

    // Kliknięcie poza popupem z powiadomieniami – zamyka je
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

    // Pobieramy powiadomienia z backendu
    useEffect(() => {
        const fetchInvitations = async () => {
            try {
                const response = await fetch(`http://localhost:5000/notifications`, {
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setNotifications(data);
                    console.log("Fetched notifications:", data);
                } else {
                    console.error("Failed to fetch invitations");
                }
            } catch (error) {
                console.error("Error fetching invitations:", error);
            }
        };

        if (user) {
            fetchInvitations();
        }
    }, [user]);

    // Komponent Menu – różne linki w zależności od stanu usera i ścieżki
    const Menu = () => {
        if (!user && window.location.pathname === "/") {
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
        } else if (user && window.location.pathname === "/") {
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
                                <AvatarMenu />
                            </div>
                            {showNotifications && (
                                <div
                                    className={`notifications-popup ${
                                        showNotifications ? 'show' : ''
                                    }`}
                                >
                                    <div className="popup-arrow"></div>
                                    {notifications.length > 0 ? (
                                        notifications.map(notification => (
                                            <div
                                                key={notification.id}
                                                className="notification-container"
                                            >
                                                <p>{notification.content}</p>
                                                <p>
                                                    {t('navbar.notifications.sentDate')}:{' '}
                                                    {new Date(notification.created_at).toLocaleDateString()}
                                                </p>
                                                <p>
                                                    {t('navbar.notifications.expireDate')}:{' '}
                                                    {new Date(
                                                        new Date(notification.created_at).getTime() +
                                                        7 * 24 * 60 * 60 * 1000
                                                    ).toLocaleDateString()}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>{t('navbar.notifications.noNotifications')}</p>
                                    )}
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
                <div className="rr__navbar-menu">
                    {toggleMenu ? (
                        <RiCloseLine
                            color="#fff"
                            size={27}
                            onClick={() => setToggleMenu(false)}
                        />
                    ) : (
                        <RiMenu3Line
                            color="#fff"
                            size={27}
                            onClick={() => setToggleMenu(true)}
                        />
                    )}
                    {toggleMenu && (
                        <div className="rr__navbar-menu_container scale-up-center">
                            <div className="rr__navbar-menu_container-links">
                                <Menu />
                                {!user ? (
                                    <div className="rr__navbar-menu_container-links-sign">
                                        <p>
                                            <Link to="/login">{t('navbar.menuItems.login')}</Link>
                                        </p>
                                        <button
                                            className="signup"
                                            onClick={() => navigate('/register')}
                                            type="button"
                                        >
                                            {t('navbar.menuItems.register')}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="rr__navbar-menu_container-links-sign">
                                        <p>
                                            <a className="nav-p" onClick={handleLogout}>
                                                {t('navbar.logout')}
                                            </a>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ScrollToTopBtn />
        </>
    );
};

export default Navbar;
