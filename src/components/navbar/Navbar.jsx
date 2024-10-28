import React, { useState, useContext, useEffect } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { FaInbox } from 'react-icons/fa';
import './navbar.css';
import logo from '../../assets/RRlogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { useUser } from '../../contexts/UserContext';
import { PopoverDemo } from '../../components/tamagui/avatar-popover';

const Menu = () => {
    const { user, setUser } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    if (!user && window.location.pathname === "/") {
        return (
            <>
                {/*<p><a href="/">Strona główna</a></p>*/}
                <p><a href="#pro">Pro</a></p>
                {/*<p><a href="#features">Możliwości</a></p>*/}
                <p><a href="/Signup">Zaplanuj podróż</a></p>
                <p><a href="/Signup">Gotowe trasy</a></p>
                <p><a href="/contact">Kontakt</a></p>
                <p><a href="/collaboration">Współpraca</a></p>
            </>
        );
    } else if (user && window.location.pathname === "/") {
        return (
            <>
                <p><a href="#pro">Pro</a></p>
                <p><a href="/contact">Kontakt</a></p>
                <p><a href="#niewiem">Zaplanuj podróż</a></p>
                <p><a href="/readyRoutes">Gotowe trasy</a></p>
                <p><a href="/joinEvents">Nadchodzące wydarzenia</a></p>
                <p><a href="/collaboration">Współpraca</a></p>
                <p><a href="/profile/${user.username}">Profil</a></p>
            </>
        );
    } else if (user) {
        return (
            <>
                <p><a href="/">Strona główna</a></p>
                <p><a href="/contact">Kontakt</a></p>
                {/*<p><a href="#niewiem">Zaplanuj podróż</a></p>*/}
                <p><a href="/readyRoutes">Gotowe trasy</a></p>
                <p><a href="/joinEvents">Nadchodzące wydarzenia</a></p>
                <p><a href="/collaboration">Współpraca</a></p>
                <p><a href="/profile/${user.username}">Profil</a></p>
            </>
        );
    } else {
        return (
            <>
                <p><a href="/">Strona główna</a></p>
                <p><a href="/contact">Kontakt</a></p>
                <p><a href="/collaboration">Współpraca</a></p>
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

    const toggleNotifications = () => {
        setShowNotifications(prevState => !prevState);
    };

    // Ukrywanie popupu po kliknięciu poza nim
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

    //fetch zaproszeń
    useEffect(() => {
        const fetchInvitations = async () => {
            try {
                const response = await fetch(`http://localhost:5000/invitations`, { credentials: 'include' });
                if (response.ok) {
                    const data = await response.json();
                    setNotifications(data); // Store invitations in the notifications state
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
                        <div className="notify-icon" onClick={toggleNotifications} style={{ position: 'relative', cursor: 'pointer' }}>
                            <FaInbox color={notifications.length > 0 ? 'orange' : 'white'} size={20} />
                            {notifications.length > 0 && (
                                <span className="notification-alert">!</span>
                            )}
                        </div>
                        <PopoverDemo />
                        {showNotifications && (
                            <div className={`notifications-popup ${showNotifications ? 'show' : ''}`}>
                                <div className="popup-arrow"></div>
                                {notifications.length > 0 ? (
                                    notifications.map((invitation) => (
                                        <div key={invitation.id} className="notification-container">
                                            <p>Od: {invitation.sender_username}</p>
                                            {invitation.grupa && <p>Zaproszenie do grupy ID: {invitation.grupa_id}</p>}
                                            {invitation.event && <p>Zaproszenie na wydarzenie ID: {invitation.event_id}</p>}
                                            {invitation.route && <p>Zaproszenie do trasy ID: {invitation.route_id}</p>}
                                            <p>Data wysłania: {new Date(invitation.send_date).toLocaleString()}</p>
                                            <p>Data ważności: {new Date(invitation.valid_date).toLocaleString()}</p>
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
                        <p><Link to="login">Login</Link></p>
                        <button className="signup" onClick={() => navigate('/Signup')} type="button">Zarejestruj</button>
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
                                        onClick={() => navigate('/Signup')}
                                        type="button"
                                    >
                                        Zarejestruj
                                    </button>
                                </div>
                            ) : (
                                <div className="rr__navbar-menu_container-links-sign">
                                    <p><a onClick={handleLogout}>Wyloguj</a></p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
