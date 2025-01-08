import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Footer, Blog, Possibility, Features, WhatRR, Header} from "./containers";
import {CTA, Brand, Navbar, Ad, Cookies} from './components'
import "./App.css"
import AnimatedBackground from './assets/AnimatedBackground/AnimatedBackground'

import CenteredTextWithLogo from './components/textWithLogo/CenteredTextWithLogo';

import { ProCard } from './components/tamagui/pro-card';
import { SpinnerLoading } from './components/tamagui/spinner';

const App = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/user', { withCredentials: true })
            .then(response => {
                setUser(response.data);
                setIsLoading(false); // Ustaw ładowanie na false po otrzymaniu danych
            })
            .catch(error => {
                console.error('There was an error fetching the user data!', error);

                // Sprawdź, czy użytkownik jest na stronie głównej
                if (window.location.pathname !== '/') {
                    navigate('/login'); // Przekierowanie na stronę logowania dla innych stron
                } else {
                    setIsLoading(false); // Jeśli jest na stronie głównej, zatrzymaj ładowanie
                }
            });
    }, [navigate]);

    if (isLoading) {
        return <SpinnerLoading/>;
    }

    return (
        <div className="">
            <AnimatedBackground />
            <Cookies/>
        <div className="">
            <div className="">
                <Navbar/>
            </div>
            {user ? (
                <div>
                    <Ad/>
                    <div className="middle yes">
                        <ProCard/>
                    </div>
                    <Footer/>
                </div>
                ) : (
                    <div>
                    <CenteredTextWithLogo/>
                    <Header/>
                    <Brand/> {/* ZMIENIĆ MARKI*/}
                    <Ad/>
                    <WhatRR/>
                    <div className="middle yes" id="pro">
                        <ProCard/>
                    </div>
                    {/*<Features/>*/}
                    {/*<Possibility/>*/}
                    <CTA/>
                    {/*<Blog/>*/}
                    <Footer/>

                </div>
            )}


        </div>
        </div>

    )
}
export default App


