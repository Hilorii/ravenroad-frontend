import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';        // do nawigacji między stronami
import { useUser } from '../../contexts/UserContext';
import Navbar from "../../components/navbar/Navbar";
import './Groups.css';
import AnimatedBackground from '../../assets/AnimatedBackground/AnimatedBackground';
import Footer from '../../containers/footer/Footer';

// Ikony z react-icons
import {
    FaEdit,
    FaInfoCircle,
    FaSignOutAlt,
    FaPlus,
    FaCrown,
    FaTrash  // Dodajemy ikonę kosza, jeśli chcesz obsługiwać usuwanie grupy
} from 'react-icons/fa';

export default function Groups() {
    const { user } = useUser(); // Pobieramy obiekt `user` z kontekstu
    const navigate = useNavigate();
    const [userGroups, setUserGroups] = useState([]);
    const [proposedGroups, setProposedGroups] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUserGroups();
        fetchProposedGroups();
    }, []);

    // Funkcja pobierania "Twoich grup"
    const fetchUserGroups = async () => {
        try {
            const token = localStorage.getItem('token');
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

    // Funkcja pobierania "Proponowanych grup"
    const fetchProposedGroups = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/searchGroups', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Błąd podczas pobierania proponowanych grup.');
            }

            const data = await response.json();
            setProposedGroups(data);
        } catch (err) {
            setError(err.message);
        }
    };

    // --------------------- OBSŁUGA PRZYCISKÓW / IKON ---------------------

    // 1. Przekierowanie do strony edycji grupy
    const handleEditGroup = (groupId) => {
        // Zakładamy, że masz zdefiniowaną trasę np. /editGroup/:groupId
        navigate(`/editGroup/${groupId}`);
    };

    // 2. Przekierowanie do strony detali grupy
    const handleViewDetails = (groupId) => {
        navigate(`/groupDetails/${groupId}`);
    };

    // 3. Opuszczenie grupy (POST /leaveGroup/:groupId)
    const handleLeaveGroup = async (groupId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/leaveGroup/${groupId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Błąd podczas opuszczania grupy');
            }

            // Po opuszczeniu grupy — np. odśwież listę grup
            setUserGroups(prev => prev.filter(group => group.id !== groupId));
        } catch (err) {
            setError(err.message);
        }
    };

    // 4. Dołączenie do grupy (POST /joinGroup/:groupId)
    const handleJoinGroup = async (groupId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/joinGroup/${groupId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Błąd podczas dołączania do grupy');
            }

            // Po dołączeniu — np. odśwież listę Twoich grup i/lub proponowanych
            fetchUserGroups();
            fetchProposedGroups();
        } catch (err) {
            setError(err.message);
        }
    };

    // 5. Usuwanie grupy (DELETE /deleteGroup/:groupId) — tylko dla właściciela
    const handleDeleteGroup = async (groupId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/deleteGroup/${groupId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Błąd podczas usuwania grupy');
            }

            // Po usunięciu usuwamy ją z listy userGroups
            setUserGroups(prev => prev.filter(group => group.id !== groupId));
        } catch (err) {
            setError(err.message);
        }
    };

    // --------------------- RENDER KOMPONENTU ---------------------

    return (
        <div>
            <AnimatedBackground />
            <Navbar />
            {/* Napis "Grupy" */}
            <h1 className="groups-title">Grupy</h1>

            <div className="groups-wrapper">
                {/* PIERWSZY PROSTOKĄT: TWOJE GRUPY */}
                <div className="groups-box">
                    <h2 className="groups-box-title">TWOJE GRUPY</h2>
                    <div className="groups-list">
                        {error && <p className="error-message">{error}</p>}
                        {userGroups.map((group) => (
                            <div key={group.id} className="group-item">
                                {/* Złota koronka dla właściciela grupy */}
                                {user && group.created_by === user.id && (
                                    <FaCrown className="group-crown" />
                                )}
                                <img
                                    src={`http://localhost:5000/uploads/${group.image}`}
                                    alt={group.name}
                                    className="group-avatar"
                                />
                                <span className="group-name">{group.name}</span>

                                <div className="group-actions">
                                    {/* Ikona edycji widoczna tylko dla właściciela */}
                                    {user && group.created_by === user.id && (
                                        <>
                                            <FaEdit
                                                className="group-icon"
                                                title="Edytuj grupę"
                                                onClick={() => handleEditGroup(group.id)}
                                            />
                                            <FaTrash
                                                className="group-icon"
                                                title="Usuń grupę"
                                                onClick={() => handleDeleteGroup(group.id)}
                                            />
                                        </>
                                    )}

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
                                    {/* Zmieniona ikona na dołączanie */}
                                    <FaPlus
                                        className="group-icon"
                                        title="Dołącz do grupy"
                                        onClick={() => handleJoinGroup(group.id)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
