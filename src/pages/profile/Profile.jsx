import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './profile.css';
import { Navbar } from '../../components/index';
import { XStack } from 'tamagui'

import { AvatarDemo } from '../../components/tamagui/avatar';
import { ButtonDemo } from '../../components/tamagui/buttons';
import { DialogDemo } from '../../components/tamagui/edit-profile';

import { useUser } from '../../contexts/UserContext';
import axios from 'axios';

import GroupsContainer from './Groups.jsx'
import EventsContainer from './Events'

import { PortalProvider } from '../../contexts/PortalProvider'

const ProfilePage = () => {
    const { username } = useParams();
    const { user, setUser } = useUser();
    const [isGrupyActive, setIsGrupyActive] = useState(false);
    const [isWydarzeniaActive, setIsWydarzeniaActive] = useState(false);

    const toggleGrupy = () => {
        setIsGrupyActive((prevValue) => {
            const newValue = !prevValue;
            if (newValue) {
                setIsWydarzeniaActive(false);
            }
            return newValue;
        });
    };

    const toggleWydarzenia = () => {
        setIsWydarzeniaActive((prevValue) => {
            const newValue = !prevValue;
            if (newValue) {
                setIsGrupyActive(false);
            }
            return newValue;
        });
    };
    return (
        <PortalProvider>
        <div className="App">
            <div className="gradient__bg">
                <Navbar />
                <div className="profile-container">
                    <div className="profile-info">
                        <XStack space="$3" className="profile-btContainer">
                                <div className="edit-profile-bt">
                                    <DialogDemo/>
                                </div>
                                <button className="edit" role="button"><span className="text" onClick={toggleGrupy}>Twoje Grupy</span></button>
                                <button className="edit" role="button"><span className="text" onClick={toggleWydarzenia}>Twoje Wydarzenia</span></button>
                        </XStack>
                        {isGrupyActive && !isWydarzeniaActive && <div className="gC"><GroupsContainer/></div>}
                        {isWydarzeniaActive && !isGrupyActive && <div className="gC"><EventsContainer/></div>}
                    </div>
                </div>
            </div>
        </div>
            </PortalProvider>
    );
};

export default ProfilePage;

