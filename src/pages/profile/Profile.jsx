import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import './profile.css';
import { Navbar } from '../../components/index';
import { XStack } from 'tamagui';

import { DialogDemo } from '../../components/tamagui/edit-profile';

import { useUser } from '../../contexts/UserContext';
import GroupsContainer from './Groups.jsx';
import EventsContainer from './Events';
import RoutesContainer from '../routes/Routes'; // Dodaj import, gdy dodasz komponent

//Nowe
import AnimatedBackground from '../../assets/AnimatedBackground/AnimatedBackground';
import { Footer, Blog, Possibility, Features, WhatRR, Header } from "../../containers";
import NeonMotorcycle from '../../components/neonMotorcycle/NeonMotorcycle';

const ProfilePage = () => {
    const { username } = useParams();
    const { user } = useUser();
    const displayName = user?.username || username || 'Username';
    const [avatarUrl, setAvatarUrl] = useState('');
    const [bannerUrl, setBannerUrl] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:5000/user', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                    setAvatarUrl(`http://localhost:5000/uploads/${data.avatar}`);
                    setBannerUrl(`http://localhost:5000/uploads/${data.banner}`);
            } catch (err) {
                console.error('Error fetching user data:', err);
            }
        };
        fetchUserData();
    }, []);

    return (
        <div>
            <AnimatedBackground />
            <Navbar />

            {/* Główny kontener profilu */}
            <div className="profile-container">
                {/*BANNER*/}
                <div className="profile-banner">
                    <img
                        src={bannerUrl}
                        alt="User banner"
                        className="profile-banner-img"
                    />
                </div>

                <div className="profile-content">
                    {/*AVATAR*/}
                    <div className="profile-avatar-wrapper">
                        <img
                            src={avatarUrl}
                            alt="User avatar"
                            className="profile-avatar"
                        />
                    </div>
                    <h1 className="profile-username">{displayName}</h1>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProfilePage;
