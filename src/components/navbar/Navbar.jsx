import React, {useState} from 'react';
import {RiMenu3Line, RiCloseLine} from 'react-icons/ri';
import './navbar.css';
import logo from '../../assets/RRlogo.png'

const Menu = () => (
    <>
        <p><a href="#pro">Pro</a></p>
        <p><a href="#features">Możliwości</a></p>
        <p><a href="#createroute">Zaplanuj podróż</a></p>
        <p><a href="#routes">Gotowe trasy</a></p>
    </>
)

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    return (
        <div className="rr__navbar">
            <div className="rr__navbar-links">
                <div className="rr__navbar-links_logo">
                    <a href="#home"><img src={logo} alt='logo' /></a>
                </div>
                <div className="rr__navbar-links_container">
                    <Menu />
                </div>
            </div>
            <div className="rr__navbar-sign">
                <p><a href="#login">Login</a></p>
                <button type="button">Zarejestruj</button>
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
