import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import './navbar.css';
import logo from '../../assets/RRlogo.png';
import { useTranslation } from 'react-i18next';

const Menu = () => {
    const { t } = useTranslation(); // Importujemy funkcję tłumaczeń
    return (
        <>
            <p><a href="/main">{t('navbar.home')}</a></p>
            <p><a href="/contact">{t('navbar.contact')}</a></p>
            <p><a href="/collaboration">{t('navbar.collaboration')}</a></p>
        </>
    );
};

const NavbarTmp = () => {
    const [toggleMenu, setToggleMenu] = useState(false);

    return (
        <div className="rr__navbar">
            <div className="rr__navbar-links">
                <div className="rr__navbar-links_logo">
                    <a href="/main"><img src={logo} alt="logo" /></a>
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
