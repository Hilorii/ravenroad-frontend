import React from 'react';
import { useParams } from 'react-router-dom';
import './profile.css';
// { Navbar } from '../../components/navbar/Navbar'

const ProfilePage = () => {
    const { username } = useParams();

    return (
        <div className="bg">
            {/*<Navbar/>*/}
            <h1>Profil użytkownika: {username}</h1>
            {/* Tutaj dodaj szczegóły profilu użytkownika */}
        </div>
    );
};

export default ProfilePage;
