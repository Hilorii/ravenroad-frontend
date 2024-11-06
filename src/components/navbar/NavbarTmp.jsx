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
    const [isOpen, setIsOpen] = useState(false);
        return(
            <>
                <p><a href="/main">Strona główna</a></p>
                <p><a href="/contact">Kontakt</a></p>
                <p><a href="/collaboration">Współpraca</a></p>
            </>
        )
};

const NavbarTmp = () => {
    const navigate = useNavigate();
    const [toggleMenu, setToggleMenu] = useState(false);

    return (
        <div className="rr__navbar">
            <div className="rr__navbar-links">
                <div className="rr__navbar-links_logo">
                    <a href="/main"><img src={logo} alt='logo' /></a>
                </div>
                <div className="rr__navbar-links_container">
                    <Menu />
                </div>
            </div>
            <div className="rr__navbar-menu">
                {toggleMenu
                    ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
                    : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
                {toggleMenu && (
                    <div className="rr__navbar-menu_container scale-up-center">
                        <div className="rr__navbar-menu_container-links">
                            <Menu />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavbarTmp;
