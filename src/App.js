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
import ServiceContainer from './components/serviceContainer/ServiceContainer';
import SatisfactionContainer from './components/satisfationContainer/SatisfactionContainer';
import PricingCards from './components/pricingCards/PricingCards';
import Motor from './components/neonMotorcycle/NeonMotorcycle';

const App = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/user', { withCredentials: true })
            .then(response => {
                setUser(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the user data!', error);
                if (window.location.pathname !== '/') {
                    navigate('/login');
                } else {
                    setIsLoading(false);
                }
            });
    }, [navigate]);

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
                        <CenteredTextWithLogo/>
                        <ServiceContainer/>
                        {/*<Motor/>*/}
                        <SatisfactionContainer/>
                        <Header/>
                        {/*<Brand/>*/}
                        <Ad/>
                        {/*<WhatRR/>*/}
                        <Features/>
                        <PricingCards/>
                        {/*<Possibility/>*/}
                        <CTA/>
                        {/*<Blog/>*/}
                        <Footer/>
                    </div>
                ) : (
                    <div>
                        <CenteredTextWithLogo/>
                        <ServiceContainer/>
                        <SatisfactionContainer/>
                        <Header/>
                        {/*<Brand/>*/}
                        <Ad/>
                        {/*<WhatRR/>*/}
                        <Features/>
                        <PricingCards/>
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


