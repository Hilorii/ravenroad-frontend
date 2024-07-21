import React from 'react';
import './header.css';
import people from "../../assets/people.png"
import banner from "../../assets/banner.jpg"

const Header = () => {
    return (
        <div className="rr__header section__padding" id="Home">
            <div className="rr__header-content">
                <h1 className="gradient__text">
                    Zaplanuj swoją wspaniałą podróż z Raven Road
                </h1>
                <p>
                    Dołącz do wspaniałego community Raven Road już dziś za free!
                </p>

                <div className="rr__header-content__input">
                    <input type="email" placeholder="Twój adres email"/>
                    <button type="button">W drogę</button>
                </div>

                <div className="rr__header-content__people">
                    <img src={people} alt="people "/>
                    <p>1,600 osób w Polsce już korzysta z naszej aplikacji!</p>
                </div>
            </div>
            <div className="rr__header-image">
                <img src={banner} alt="banner" />
            </div>
        </div>
    )
}
export default Header
