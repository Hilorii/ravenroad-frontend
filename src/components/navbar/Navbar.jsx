import React, {useState, useContext} from 'react';
import {RiMenu3Line, RiCloseLine} from 'react-icons/ri';
import './navbar.css';
import logo from '../../assets/RRlogo.png'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

//Tamagui imports
import { PopoverDemo } from '../../components/tamagui/avatar-popover'


const Menu = () => (
    <>
        <p><a href="#pro">Pro</a></p>
        <p><a href="#features">Możliwości</a></p>
        <p><a href="#createroute">Zaplanuj podróż</a></p>
        <p><a href="#routes">Gotowe trasy</a></p>
    </>
)


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
