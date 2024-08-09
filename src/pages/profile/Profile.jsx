import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './profile.css';
import { Navbar } from '../../components/index';

import { AvatarDemo } from '../../components/tamagui/avatar';
import { ButtonDemo } from '../../components/tamagui/buttons';

import { useUser } from '../../contexts/UserContext';
import axios from 'axios';


const ProfilePage = () => {
    const { username } = useParams();
    const { user, setUser } = useUser(); // Użycie kontekstu użytkownika
    const [isEditing, setIsEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({
        name: '',
        email: '',
        avatar: '',
    });

    useEffect(() => {
        if (user) {
            setUpdatedUser({
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser({ ...updatedUser, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setUpdatedUser({ ...updatedUser, avatar: file });
    };

    const handleSaveChanges = async () => {
        try {
            // Logika wysyłania zmienionych danych do API
            const formData = new FormData();
            formData.append('name', updatedUser.name);
            formData.append('email', updatedUser.email);
            if (updatedUser.avatar) {
                formData.append('avatar', updatedUser.avatar);
            }

            const response = await axios.put(`http://localhost:5000/user/${username}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setUser(response.data);
            setIsEditing(false); // Przestaw na tryb wyświetlania
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

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
                        {isEditing ? (
                            <div className="profile-edit-form">
                                <label>
                                    Name:
                                    <input
                                        placeholder="Podaj nową nazwę użytkownika"
                                        type="text"
                                        name="name"
                                        value={updatedUser.name}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Email:
                                    <input
                                        placeholder="Podaj nowy email"
                                        type="email"
                                        name="email"
                                        value={updatedUser.email}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Profile Picture:
                                    <input
                                        type="file"
                                        name="avatar"
                                        onChange={handleFileChange}
                                    />
                                </label>
                                <button onClick={handleSaveChanges}>Save Changes</button>
                                <button onClick={() => setIsEditing(false)}>Cancel</button>
                            </div>
                        ) : (
                            <div className="profile-details">
                                <p>Name: {user?.name}</p>
                                <p>Email: {user?.email}</p>
                                <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

