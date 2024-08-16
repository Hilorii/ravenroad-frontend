import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Footer, Blog, Possibility, Features, WhatRR, Header} from "./containers";
import {CTA, Brand, Navbar} from './components'
import "./App.css"
import { UserContext } from './contexts/UserContext'

import { ProCard } from './components/tamagui/pro-card';

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
        return <div>Loading...</div>;
    }

    return (
        <div className="App">
        <div className="gradient__bg">
            <div className="">
                <Navbar/>
                {/*<Header/>*/}
            </div>
            {user ? (
                <div>
                    <div className="middle">
                        <ProCard/>
                    </div>
                </div>
                ) : (
                    <div>
                        <Header/>
                        <div className="middle">
                            <ProCard/>
                        </div>
                    </div>
            )}


        </div>
        </div>

    )
}
export default App


