import React, { useEffect, useState } from 'react';
import Navbar from "../../components/navbar/Navbar";
import './Groups.css';
import { Link } from 'react-router-dom';
import AnimatedBackground from '../../assets/AnimatedBackground/AnimatedBackground';
import Footer from '../../containers/footer/Footer';
// Ikony przykładowo z react-icons (npm install react-icons)
import { FaEdit, FaInfoCircle, FaSignOutAlt } from 'react-icons/fa';

export default function Groups() {
    const [userGroups, setUserGroups] = useState([]);
    const [proposedGroups, setProposedGroups] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUserGroups();
        fetchProposedGroups();
    }, []);

    const fetchUserGroups = async () => {
        try {
            const token = localStorage.getItem('token'); // lub skąd pobierasz token
            const response = await fetch('http://localhost:3000/groups', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Błąd podczas pobierania Twoich grup');
            }

            const data = await response.json();
            setUserGroups(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchProposedGroups = async () => {
        try {
            const token = localStorage.getItem('token'); // lub skąd pobierasz token
            const response = await fetch('http://localhost:3000/searchGroups', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                // Jeśli np. zwracasz 404 przy braku wyników, możesz obsłużyć to inaczej.
                throw new Error('Błąd podczas pobierania proponowanych grup.');
            }

            const data = await response.json();
            setProposedGroups(data);
        } catch (err) {
            setError(err.message);
        }
    };

    // Przykładowe „puste” metody do obsługi ikon:
    const handleEditGroup = (groupId) => {
        console.log("Edycja grupy ID:", groupId);
    };

    const handleViewDetails = (groupId) => {
        console.log("Detale grupy ID:", groupId);
    };

    const handleLeaveGroup = (groupId) => {
        console.log("Opuszczenie grupy ID:", groupId);
    };

    return (
        <div>
            <AnimatedBackground/>
            <Navbar/>
            {/* Dodaj napis "Grupy" */}
            <h1 className="groups-title">Grupy</h1>
            <div className="groups-wrapper">
                {/* PIERWSZY PROSTOKĄT: TWOJE GRUPY */}
                <div className="groups-box">
                    <h2 className="groups-box-title">TWOJE GRUPY</h2>
                    <div className="groups-list">
                        {error && <p className="error-message">{error}</p>}
                        {userGroups.map((group) => (
                            <div key={group.id} className="group-item">
                                <img
                                    src={`http://localhost:5000/uploads/${group.image}`}
                                    alt={group.name}
                                    className="group-avatar"
                                />
                                <span className="group-name">{group.name}</span>
                                <div className="group-actions">
                                    <FaEdit
                                        className="group-icon"
                                        title="Edytuj grupę"
                                        onClick={() => handleEditGroup(group.id)}
                                    />
                                    <FaInfoCircle
                                        className="group-icon"
                                        title="Detale grupy"
                                        onClick={() => handleViewDetails(group.id)}
                                    />
                                    <FaSignOutAlt
                                        className="group-icon"
                                        title="Opuść grupę"
                                        onClick={() => handleLeaveGroup(group.id)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* DRUGI PROSTOKĄT: PROPONOWANE GRUPY */}
                <div className="groups-box">
                    <h2 className="groups-box-title">PROPONOWANE GRUPY</h2>
                    <div className="groups-list">
                        {error && <p className="error-message">{error}</p>}
                        {proposedGroups.map((group) => (
                            <div key={group.id} className="group-item">
                                <img
                                    src={`http://localhost:5000/uploads/${group.image}`}
                                    alt={group.name}
                                    className="group-avatar"
                                />
                                <span className="group-name">{group.name}</span>
                                <div className="group-actions">
                                    <FaInfoCircle
                                        className="group-icon"
                                        title="Detale grupy"
                                        onClick={() => handleViewDetails(group.id)}
                                    />
                                    <FaSignOutAlt
                                        className="group-icon"
                                        title="Opuść grupę"
                                        onClick={() => handleLeaveGroup(group.id)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
