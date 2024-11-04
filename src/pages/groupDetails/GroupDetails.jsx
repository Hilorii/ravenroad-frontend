import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { YStack, XStack } from 'tamagui';
import BackButton from '../../components/backBt/BackButton';
import { useUser } from '../../contexts/UserContext';
import './groupDetails.css';

const GroupDetailsPage = () => {
    const { id } = useParams(); // Pobiera id grupy z URL-a
    const [groupDetails, setGroupDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook do nawigacji
    const { user } = useUser();
    const userId = user ? user.id : null;
    const [activeTab, setActiveTab] = useState("description");
    useEffect(() => {
        const fetchGroupDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/groups/${id}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error(`Błąd: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                console.log('Pobrane szczegóły grupy:', data); // Logowanie danych
                setGroupDetails(data);
            } catch (err) {
                console.error('Błąd podczas pobierania szczegółów grupy:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGroupDetails();
    }, [id]);

    if (loading) {
        return <div>Ładowanie...</div>;
    }

    if (error) {
        return <div>Błąd: {error}</div>;
    }

    if (!groupDetails) {
        return <div>Nie znaleziono szczegółów grupy.</div>;
    }

    // Funkcja obsługująca przekierowanie do edycji trasy
    const handleEditClick = () => {
        navigate(`/editGroup/${id}`);
    };

    const renderContent = () => {
        switch (activeTab) {
            case "description":
                return (
                    <div className="group-description">
                        <p>{groupDetails.description}</p>
                    </div>
                );
            case "members":
                return (
                    <div className="group-members">
                        <p><strong>Członkowie grupy:</strong></p>
                        {/* Tutaj zaimplementuj listę członków grupy */}
                    </div>
                );
            case "settings":
                return (
                    <div className="group-settings">
                        <p><strong>Ustawienia grupy:</strong></p>
                        {/* Tutaj zaimplementuj ustawienia grupy */}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="App">
            <div className="gradient__bg">
                <Navbar />
                <BackButton />
                {String(groupDetails.created_by) === String(userId) && (
                    <button className="edit" onClick={handleEditClick} role="button" type="submit">
                        <span className="text">Edytuj grupę</span>
                    </button>
                )}
                <div className="g-details-container">
                    <div className="group-banner-container">
                        <img
                            src={`http://localhost:5000/uploads/${groupDetails.banner}`}
                            className="groupD-banner"
                        />
                        <div className="group-overlay">
                            <img
                                src={`http://localhost:5000/uploads/${groupDetails.image}`}
                                className="groupD-image"
                            />
                            <h2 className="group-name">{groupDetails.name}</h2>
                        </div>
                    </div>

                    {/* Pasek z opcjami */}
                    <div className="group-options">
                        <button onClick={() => setActiveTab("description")} className={activeTab === "description" ? "active" : ""}>Opis</button>
                        <button onClick={() => setActiveTab("members")} className={activeTab === "members" ? "active" : ""}>Członkowie grupy</button>
                        <button onClick={() => setActiveTab("settings")} className={activeTab === "settings" ? "active" : ""}>Ustawienia grupy</button>
                    </div>
                    <div className="menuG-container">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );

};

export default GroupDetailsPage;
