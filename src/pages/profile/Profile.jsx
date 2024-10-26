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

import { PortalProvider } from '../../contexts/PortalProvider';

const ProfilePage = () => {
    const { username } = useParams();
    const { user, setUser } = useUser();
    const [activeContainer, setActiveContainer] = useState(null);

    const toggleContainer = (container) => {
        setActiveContainer((prevContainer) => (prevContainer === container ? null : container));
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
                                    <DialogDemo />
                                </div>
                                <button className="edit" role="button" onClick={() => toggleContainer("Grupy")}>
                                    <span className="text">Twoje Grupy</span>
                                </button>
                                <button className="edit" role="button" onClick={() => toggleContainer("Wydarzenia")}>
                                    <span className="text">Twoje Wydarzenia</span>
                                </button>
                                <button className="edit" role="button" onClick={() => toggleContainer("Trasy")}>
                                    <span className="text">Twoje Trasy</span>
                                </button>
                            </XStack>
                            {activeContainer === "Grupy" && <GroupsContainer />}
                            {activeContainer === "Wydarzenia" && <EventsContainer />}
                            {activeContainer === "Trasy" && <RoutesContainer />}
                        </div>
                    </div>
                </div>
            </div>
        </PortalProvider>
    );
};

export default ProfilePage;