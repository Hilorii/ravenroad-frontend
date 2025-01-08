import React from 'react';
import './TopBar.css';
import { FaFacebookF, FaDiscord, FaInstagram } from 'react-icons/fa';

const TopBar = () => {
    return (
        <div className="top-bar">
            {/* Lewa część: Email */}
            <div className="top-bar-left">
                Email:&nbsp;
                <a href="mailto:demo@example.com" className="top-bar-email">
                    demo@example.com
                </a>
            </div>

            {/* Prawa część: Ikony społecznościowe */}
            <div className="top-bar-right">
                <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="top-bar-icon"
                >
                    <FaFacebookF />
                </a>
                <a
                    href="https://discord.com"
                    target="_blank"
                    rel="noreferrer"
                    className="top-bar-icon"
                >
                    <FaDiscord />
                </a>
                <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="top-bar-icon"
                >
                    <FaInstagram />
                </a>
            </div>
        </div>
    );
};

export default TopBar;
