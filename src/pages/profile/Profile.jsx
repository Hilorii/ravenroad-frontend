import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './profile.css';
import { Navbar } from '../../components/index';
import { XStack } from 'tamagui'

import { DialogDemo } from '../../components/tamagui/edit-profile';

import { useUser } from '../../contexts/UserContext';
import GroupsContainer from './Groups.jsx';
import EventsContainer from './Events';
import RoutesContainer from '../routes/Routes'; // Dodaj import, gdy dodasz komponent


//Nowe
import AnimatedBackground from '../../assets/AnimatedBackground/AnimatedBackground'
import {Footer, Blog, Possibility, Features, WhatRR, Header} from "../../containers";
import NeonMotorcycle from '../../components/neonMotorcycle/NeonMotorcycle';

const ProfilePage = () => {
    const { username } = useParams();
    const { user, setUser } = useUser();

    return (
            <div className="">
                <AnimatedBackground />
                <Navbar />

                <NeonMotorcycle/>

                <Footer/>
            </div>
    );
};

export default ProfilePage;