import React, { useState, useContext, useEffect } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { FaInbox } from 'react-icons/fa';
import './navbar.css';
import logo from '../../assets/RRlogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { useUser } from '../../contexts/UserContext';
import { PopoverDemo } from '../../components/tamagui/avatar-popover';
import TopBar from './TopBar';
import ScrollToTopBtn from './ScrollToTopBtn';
import AvatarMenu from '../avatarMenu/AvatarMenu';

const Menu = () => {
    const { user, setUser } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    if (!user && window.location.pathname === "/") {
        return (
            <>
                <p className="nav-p"><a className="nav-a" href="#pro">Pro</a></p>
                <p className="nav-p"><a className="nav-a" href="/register">Zaplanuj podróż</a></p>
                <p className="nav-p"><a className="nav-a" href="/register">Gotowe trasy</a></p>
                <p className="nav-p"><a className="nav-a" href="/contact">Kontakt</a></p>
                <p className="nav-p"><a className="nav-a" href="#ad">Współpraca</a></p>
            </>
        );
    } else if (user && window.location.pathname === "/") {
        return (
            <>
                <p className="nav-p"><a className="nav-a" href="#pro">Pro</a></p>
                <p className="nav-p"><a className="nav-a" href="/contact">Kontakt</a></p>
                <p className="nav-p"><a className="nav-a" href="#niewiem">Zaplanuj podróż</a></p>
                <p className="nav-p"><a className="nav-a" href="/readyRoutes">Gotowe trasy</a></p>
                <p className="nav-p"><a className="nav-a" href="/joinEvents">Nadchodzące wydarzenia</a></p>
                <p className="nav-p"><a className="nav-a" href="#ad">Współpraca</a></p>
                <p className="nav-p"><a className="nav-a" href={`/profile/${user.username}`}>Profil</a></p>
            </>
        );
    } else if (user) {
        return (
            <>
                <p className="nav-p"><a className="nav-a" href="/">Strona główna</a></p>
                <p className="nav-p"><a className="nav-a" href="/contact">Kontakt</a></p>
                <p className="nav-p"><a className="nav-a" href="/readyRoutes">Gotowe trasy</a></p>
                <p className="nav-p"><a className="nav-a" href="/joinEvents">Nadchodzące wydarzenia</a></p>
                <p className="nav-p"><a className="nav-a" href="#ad">Współpraca</a></p>
                <p className="nav-p"><a className="nav-a" href={`/profile/${user.username}`}>Profil</a></p>
            </>
        );
    } else {
        return (
            <>
                <p className="nav-p"><a className="nav-a" href="/">Strona główna</a></p>
                <p className="nav-p"><a className="nav-a" href="/contact">Kontakt</a></p>
                <p className="nav-p"><a className="nav-a" href="#ad">Współpraca</a></p>
            </>
        );
    }
};

const Navbar = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const { logout } = useUser();
    const [toggleMenu, setToggleMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([{ id: 1, text: 'Nowe powiadomienie!' }]);

    const hasNewNotifications = notifications.some(notification => notification.is_read === 0);
    console.log("New notifications exist:", hasNewNotifications);
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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showNotifications && !event.target.closest('.notifications-popup') && !event.target.closest('.notify-icon')) {
                setShowNotifications(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showNotifications]);

    useEffect(() => {
        const fetchInvitations = async () => {
            try {
                const response = await fetch(`http://localhost:5000/notifications`, { credentials: 'include' });
                if (response.ok) {
                    const data = await response.json();
                    setNotifications(data);
                    console.log("Fetched notifications:", data); // Dodano logowanie
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

    return (
        <>
        <TopBar />
        <div className="rr__navbar">
            <div className="rr__navbar-links">
                <div className="rr__navbar-links_logo">
                    <a href="/"><img src={logo} alt='logo' /></a>
                </div>
                <div className="rr__navbar-links_container">
                    <Menu />
                </div>
            </div>
            <div className="rr__navbar-sign">
                {user ? (
                    <div className="navbar-user">
                        <div className="avatar-notify">
                            <div className="notify-icon" onClick={toggleNotifications} style={{ position: 'relative', cursor: 'pointer' }}>
                                <FaInbox color={hasNewNotifications ? 'orange' : 'white'} size={20} />
                                {hasNewNotifications && (
                                    <span className="notification-alert">!</span>
                                )}
                            </div>
                            <AvatarMenu/>
                        </div>
                        {showNotifications && (
                            <div className={`notifications-popup ${showNotifications ? 'show' : ''}`}>
                                <div className="popup-arrow"></div>
                                {notifications.length > 0 ? (
                                    notifications.map((notification) => (
                                        <div key={notification.id} className="notification-container">
                                            <p>{notification.content}</p>
                                            <p>Data wysłania: {new Date(notification.created_at).toLocaleDateString()}</p>
                                            <p>Data ważności: {new Date(new Date(notification.created_at).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>Brak nowych powiadomień</p>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <p className="nav-p"><Link to="login">Login</Link></p>
                        <button className="signup" onClick={() => navigate('/register')} type="button">Zarejestruj</button>
                    </>
                )}
            </div>
            <div className="rr__navbar-menu">
                {toggleMenu
                    ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
                    : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
                {toggleMenu && (
                    <div className="rr__navbar-menu_container scale-up-center">
                        <div className="rr__navbar-menu_container-links">
                            <Menu />
                            {!user ? (
                                <div className="rr__navbar-menu_container-links-sign">
                                    <p>
                                        <Link to="/login">Login</Link>
                                    </p>
                                    <button
                                        className="signup"
                                        onClick={() => navigate('/register')}
                                        type="button"
                                    >
                                        Zarejestruj
                                    </button>
                                </div>
                            ) : (
                                <div className="rr__navbar-menu_container-links-sign">
                                    <p><a className="nav-p" onClick={handleLogout}>Wyloguj</a></p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
            <ScrollToTopBtn/>
        </>

    );
};

export default Navbar;
