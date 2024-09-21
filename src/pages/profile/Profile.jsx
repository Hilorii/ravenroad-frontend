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
        <div className="App">
            <div className="gradient__bg">
                <Navbar />
                <div className="profile-container">
                    <h2>Profile Page of {user?.username}</h2>

                    <div className="profile-info">
                        <XStack space="$3">
                                <div className="edit-profile-bt">
                                    <DialogDemo/>
                                </div>
                                <button className="edit" role="button"><span className="text" onClick={toggleGrupy}>Twoje Grupy</span></button>
                                <button className="edit" role="button"><span className="text" onClick={toggleWydarzenia}>Twoje Wydarzenia</span></button>
                        </XStack>
                        {isGrupyActive && !isWydarzeniaActive && <div className="gC"><GroupsContainer/></div>}
                        {isWydarzeniaActive && !isGrupyActive && <AvatarDemo />}
                        {/*<div className="profile-navigation">*/}
                        {/*    <Link to={`/profile/${username}/groups`}>Twoje Grupy</Link>*/}
                        {/*    <Link to={`/profile/${username}/events`}>Twoje Wydarzenia</Link>*/}
                        {/*    <Link to={`/profile/${username}/create-group`}>Stwórz Grupę</Link>*/}
                        {/*    <Link to={`/profile/${username}/create-event`}>Stwórz Wydarzenie</Link>*/}
                        {/*    <Link to={`/profile/${username}/search-groups`}>Wyszukaj Grupę</Link>*/}
                        {/*    <Link to={`/profile/${username}/search-events`}>Wyszukaj Wydarzenia</Link>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

