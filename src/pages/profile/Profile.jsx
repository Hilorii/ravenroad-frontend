import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './profile.css';
import { Navbar } from '../../components/index';

import { AvatarDemo } from '../../components/tamagui/avatar';
import { ButtonDemo } from '../../components/tamagui/buttons';
import { DialogDemo } from '../../components/tamagui/edit-profile';

import { useUser } from '../../contexts/UserContext';
import axios from 'axios';


const ProfilePage = () => {
    const { username } = useParams();
    const { user, setUser } = useUser();






    return (
        <div className="App">
            <div className="gradient__bg">
                <Navbar />
                <div className="profile-container">
                    <h2>Profile Page of {user?.username}</h2>

                    <div className="profile-info">
                        <div className="profile-avatar">
                            {user?.avatar ? (
                                <img src={`http://localhost:5000/${user.avatar}`} alt="Profile" />
                            ) : (
                                <AvatarDemo />
                            )}
                        </div>
                        <div className="edit-profile-bt">
                            <DialogDemo/>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

