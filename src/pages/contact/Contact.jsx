// import { YStack, XStack } from 'tamagui';
// import './contact.css';
// import { FB, DC, MAIL } from '../../components/icons';
// import { contactMail } from '../../components/info';

import Navbar from '../../components/navbar/Navbar';
import { Footer } from '../../containers/index';
import AnimatedBackground from '../../assets/AnimatedBackground/AnimatedBackground';
import ContactForm from '../../components/contactForm/ContactFrom';

//POPRAW Z STAREGO TLUMACZENIA
// import { useTranslation } from 'react-i18next'; // Import i18n

import React from 'react';
import { Link } from 'react-router-dom';
import './contact.css';

const Contact = () => {
    return (
        <div className="contact-container">
            <AnimatedBackground/>
            <Navbar/>

            {/* Sekcja bannera */}
            <div className="banner">
                <div className="banner-content">
                    <h1>Contact</h1>
                    <p className="breadcrumb">
                        You Here! &gt; <Link to="/">Home</Link> &gt; Contact
                    </p>
                </div>
            </div>

            {/* Sekcja z danymi kontaktowymi */}
            <div className="contact-details">
                {/* Kolumna 1: Email */}
                <div className="contact-box">
                    <div className="icon-container email-icon">
                        {/* Możesz zamienić na własną ikonę/obrazek */}
                    </div>
                    <div className="info">
                        <h3>Our Email</h3>
                        <p>demo@example.com</p>
                    </div>
                </div>

                {/* Kolumna 2: Telefon */}
                <div className="contact-box">
                    <div className="icon-container phone-icon">
                        {/* Możesz zamienić na własną ikonę/obrazek */}
                    </div>
                    <div className="info">
                        <h3>Our Phone</h3>
                        <p>+880 563856 6485</p>
                    </div>
                </div>

                {/* Kolumna 3: Facebook */}
                <div className="contact-box">
                    <div className="icon-container facebook-icon">
                        {/* Możesz zamienić na własną ikonę/obrazek */}
                    </div>
                    <div className="info">
                        <h3>Facebook</h3>
                        <a
                            href="https://www.facebook.com/TwojProfil"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            facebook.com/TwojProfil
                        </a>
                    </div>
                </div>
            </div>
            <ContactForm />
            <Footer/>
        </div>
    );
};

export default Contact;

