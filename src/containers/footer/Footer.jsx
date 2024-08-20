import React from 'react';
import rrLogo from '../../assets/RRlogo.png';
import './footer.css';
import { contactMail } from '../../components/info';

const Footer = () => (
    <div className="rr__footer section__padding">
        {/*<div className="rr__footer-heading">*/}
        {/*    <h1 className="gradient__text">Jesteś gotowy na swoją podróż do przyszłości?</h1>*/}
        {/*</div>*/}

        {/*<div className="rr__footer-btn">*/}
        {/*    <p>Poproś o wczesny dostęp!</p>*/}
        {/*</div>*/}

        <div className="rr__footer-links">
            <div className="rr__footer-links_logo">
                <img src={rrLogo} alt="rr_logo" />
                <p>Raven Road sp z o.o., <br />Wszelkie prawa zastrzerzone</p>
            </div>
            <div className="rr__footer-links_div">
                <h4>Linki</h4>
                <p>Historie</p>
                <p>FAQ</p>
                <p>Pomoc</p>
                <p><a href="/termsofuse">Warunki użytkowania</a></p>
                <p><a href="/privacypolicy">Polityka prywatności</a></p>
            </div>
            <div className="rr__footer-links_div">
                <h4>Firma</h4>
                <p>O nas</p>
                <p><a href="/pricing">Raven PRO</a></p>
                <p>Zespół</p>
                <p><a href="/contact">Kontakt</a></p>
            </div>
            <div className="rr__footer-links_div">
            <h4>Zapraszamy do kontaktu</h4>
                <p>Discord: już wkrótce!</p>
                <p><a href="https://www.facebook.com/profile.php?id=61564039045420">Facebook</a></p>
                <p>Email: {contactMail}</p>
            </div>
        </div>

        <div className="rr__footer-copyright">
            <p>@2024 Raven Road. All rights reserved.</p>
        </div>
    </div>
);

export default Footer;
