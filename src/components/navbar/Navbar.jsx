import React, {useState, useContext} from 'react';
import {RiMenu3Line, RiCloseLine} from 'react-icons/ri';
import './navbar.css';
import logo from '../../assets/RRlogo.png'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { useUser } from '../../contexts/UserContext';
//Tamagui imports
import { PopoverDemo } from '../../components/tamagui/avatar-popover'


const Menu = () => {
    const { user, setUser } = useUser();
    if (!user && window.location.pathname === "/") {
        return (
            <>
                <p><a href="#pro">Pro</a></p>
                <p><a href="#features">Możliwości</a></p>
                <p><a href="/Signup">Zaplanuj podróż</a></p>
                <p><a href="/Signup">Gotowe trasy</a></p>
                <p><a href="/contact">Kontakt</a></p>
                <p><a href="/collaboration">Współpraca</a></p>
            </>
        );
    } else if (user){
        return (
            <>
                <p><a href="/">Strona główna</a></p>
                <p><a href="/contact">Kontakt</a></p>
                <p><a href="#niewiem">Zaplanuj podróż</a></p>
                <p><a href="/readyRoutes">Gotowe trasy</a></p>
                <p><a href="/routes">Twoje trasy</a></p>
                <p><a href="/collaboration">Współpraca</a></p>
            </>
        )
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
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const [toggleMenu, setToggleMenu] = useState(false);
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
                        <PopoverDemo/>
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
                            <Menu/>
                            <div className="rr__navbar-menu_container=links-sign">
                                <p><a href="#login">Login</a></p>
                                <button type="button">Zarejestruj</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Navbar
