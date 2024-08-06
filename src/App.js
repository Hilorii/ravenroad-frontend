import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Footer, Blog, Possibility, Features, WhatRR, Header} from "./containers";
import {CTA, Brand, Navbar} from './components'
import "./App.css"

const App = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/user', { withCredentials: true })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the user data!', error);
                navigate('/login'); // Przekierowanie na stronę logowania jeśli nie zalogowany
            });
    }, [navigate]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App">
            <div className="gradient__bg">
                <Navbar/>
                {/*<Header/>*/}
            </div>
            {/*<Brand/>*/}
            {/*<WhatRR/>*/}
            {/*<Features/>*/}
            {/*<Possibility/>*/}
            {/*<CTA/>*/}
            {/*<Blog/>*/}
            {/*<Footer/>*/}
        </div>
    )
}
export default App

