import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import Navbar from "../../components/navbar/Navbar";
import './Groups.css';
import AnimatedBackground from '../../assets/AnimatedBackground/AnimatedBackground';
import Footer from '../../containers/footer/Footer';

import {
    FaEdit,
    FaInfoCircle,
    FaSignOutAlt,
    FaPlus,
    FaCrown,
    FaTrash
} from 'react-icons/fa';

export default function Groups() {
    const { user } = useUser();
    const navigate = useNavigate();
    const [userGroups, setUserGroups] = useState([]);
    const [proposedGroups, setProposedGroups] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUserGroups();
        fetchProposedGroups();
    }, []);

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

    const handleEditGroup = (groupId) => {
        navigate(`/editGroup/${groupId}`);
    };

    const handleViewDetails = (groupId) => {
        navigate(`/groupDetails/${groupId}`);
    };

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

            setUserGroups(prev => prev.filter(group => group.id !== groupId));
        } catch (err) {
            setError(err.message);
        }
    };

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

            fetchUserGroups();
            fetchProposedGroups();
        } catch (err) {
            setError(err.message);
        }
    };

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

            setUserGroups(prev => prev.filter(group => group.id !== groupId));
        } catch (err) {
            setError(err.message);
        }
    };

    // Handlers for navigating to /routes and /events
    const handleNavigateToRoutes = () => {
        navigate('/routes');
    };

    const handleNavigateToEvents = () => {
        navigate('/events');
    };

    return (
        <div>
            <AnimatedBackground />
            <Navbar />

            {/* Title Section with TRASY - GRUPY - EVENTY */}
            <div className="title-container">
                <h2 className="title-item no-glow" onClick={handleNavigateToRoutes}>
                    TRASY
                </h2>
                <h1 className="groups-title">GRUPY</h1>
                <h2 className="title-item no-glow" onClick={handleNavigateToEvents}>
                    EVENTS
                </h2>
            </div>

            <div className="groups-wrapper">
                {/* TWOJE GRUPY */}
                <div className="groups-box">
                    <h2 className="groups-box-title">TWOJE GRUPY</h2>
                    <div className="groups-list">
                        {error && <p className="error-message">{error}</p>}
                        {userGroups.map((group) => (
                            <div key={group.id} className="group-item">
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

                {/* PROPONOWANE GRUPY */}
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
