import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import Navbar from "../../components/navbar/Navbar";
import './Groups.css';
import AnimatedBackground from '../../assets/AnimatedBackground/AnimatedBackground';
import Footer from '../../containers/footer/Footer';
import SquaresGroup from '../../components/linkSquares/LinkSquaresGroups';

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

    // Stany związane z grupami
    const [userGroups, setUserGroups] = useState([]);
    const [proposedGroups, setProposedGroups] = useState([]);

    // Stany związane z wyszukiwarką
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [searchError, setSearchError] = useState(null);

    // **Stan do modala usuwania grupy**
    const [groupIdToDelete, setGroupIdToDelete] = useState(null);

    // **Stan do modala opuszczania grupy**
    const [groupIdToLeave, setGroupIdToLeave] = useState(null);

    useEffect(() => {
        fetchUserGroups();
        fetchProposedGroups();
    }, []);

    // Reset komunikatu o błędzie wyszukiwania po 5 sekundach
    useEffect(() => {
        if (searchError) {
            const timer = setTimeout(() => {
                setSearchError(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [searchError]);

    // --------------------------------------------------------------------------
    //                            POBIERANIE GRUP
    // --------------------------------------------------------------------------
    const fetchUserGroups = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/groups', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Jeżeli nie ma grup, API może zwrócić pustą tablicę lub status 404
            if (!response.ok) {
                if (response.status === 404) {
                    setUserGroups([]);
                    return;
                }
                throw new Error('Błąd podczas pobierania Twoich grup');
            }

            const data = await response.json();
            setUserGroups(data);
        } catch (err) {
            console.error(err.message);
            // Jeśli błąd, po prostu ustawiamy pustą listę
            setUserGroups([]);
        }
    };

    const fetchProposedGroups = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/proposedGroups', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                if (response.status === 404) {
                    setProposedGroups([]);
                    return;
                }
                throw new Error('Błąd podczas pobierania proponowanych grup.');
            }

            const data = await response.json();
            setProposedGroups(data);
        } catch (err) {
            console.error(err.message);
            setProposedGroups([]);
        }
    };

    // --------------------------------------------------------------------------
    //                           OBŁUGA GRUP (CRUD)
    // --------------------------------------------------------------------------
    // Edycja grupy
    const handleEditGroup = (groupId) => {
        navigate(`/editGroup/${groupId}`);
    };

    // Detale grupy
    const handleViewDetails = (groupId) => {
        navigate(`/groupDetails/${groupId}`);
    };

    // ----------------------------------------------------------------------------
    //        OPUSZCZANIE GRUPY (z modalem potwierdzenia, analogicznie do usuwania)
    // ----------------------------------------------------------------------------

    // Najpierw ustawiamy groupIdToLeave (otwiera modal)
    const confirmLeaveGroup = (groupId) => {
        setGroupIdToLeave(groupId);
    };

    // Gdy użytkownik potwierdzi opuszczenie
    const handleConfirmLeave = async () => {
        if (!groupIdToLeave) return;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/leaveGroup/${groupIdToLeave}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Błąd podczas opuszczania grupy');
            }

            // Usuwamy grupę z listy userGroups
            setUserGroups((prev) => prev.filter((group) => group.id !== groupIdToLeave));
        } catch (err) {
            console.error(err.message);
        } finally {
            // Zamykamy modal
            setGroupIdToLeave(null);
        }
    };

    // Gdy użytkownik anuluje opuszczenie
    const handleCancelLeave = () => {
        setGroupIdToLeave(null);
    };

    // ----------------------------------------------------------------------------
    //        DOŁĄCZANIE GRUPY
    // ----------------------------------------------------------------------------
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

            // Po dołączeniu odświeżamy listy
            fetchUserGroups();
            fetchProposedGroups();
        } catch (err) {
            console.error(err.message);
        }
    };

    // ----------------------------------------------------------------------------
    //        USUWANIE GRUPY (z modalem potwierdzenia)
    // ----------------------------------------------------------------------------
    const confirmDeleteGroup = (groupId) => {
        setGroupIdToDelete(groupId);
    };

    const handleConfirmDelete = async () => {
        if (!groupIdToDelete) return;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/deleteGroup/${groupIdToDelete}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Błąd podczas usuwania grupy');
            }

            // Usuwamy grupę z listy userGroups
            setUserGroups((prev) => prev.filter((group) => group.id !== groupIdToDelete));
        } catch (err) {
            console.error(err.message);
        } finally {
            setGroupIdToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setGroupIdToDelete(null);
    };

    // ----------------------------------------------------------------------------
    //        NAWIGACJA
    // ----------------------------------------------------------------------------
    const handleNavigateToRoutes = () => {
        navigate('/routes');
    };

    const handleNavigateToEvents = () => {
        navigate('/events');
    };

    // ----------------------------------------------------------------------------
    //        WYSZUKIWANIE GRUP
    // ----------------------------------------------------------------------------
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            return;
        }
        try {
            const token = localStorage.getItem('token');
            setSearchError(null);

            const response = await fetch(
                `http://localhost:3000/searchGroups?query=${encodeURIComponent(searchQuery)}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Błąd podczas wyszukiwania grup');
            }

            const data = await response.json();
            setSearchResults(data);
        } catch (err) {
            setSearchError(err.message);
            setSearchResults([]);
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults(null);
        setSearchError(null);
    };

    // ----------------------------------------------------------------------------
    //        RENDER
    // ----------------------------------------------------------------------------
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

            {/* Pasek wyszukiwania */}
            <div className="search-container">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Wyszukaj grupę..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-button">
                        Szukaj
                    </button>
                </form>
            </div>

            {/* Sekcja wyników wyszukiwania */}
            {searchResults !== null && (
                <div className="groups-wrapper">
                    <div className="groups-box search-results-box">
                        <div className="search-results-header">
                            <h2 className="groups-box-title">WYNIKI WYSZUKIWANIA</h2>
                            <button
                                className="clear-search-button"
                                onClick={clearSearch}
                            >
                                Wyczyść wyszukiwanie
                            </button>
                        </div>
                        <div className="groups-list">
                            {searchError ? (
                                <p className="error-message">{searchError}</p>
                            ) : searchResults.length > 0 ? (
                                searchResults.map((group) => (
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
                                ))
                            ) : (
                                <p className="error-message">Brak wyników wyszukiwania.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="groups-wrapper">
                {/* TWOJE GRUPY */}
                <div className="groups-box">
                    <h2 className="groups-box-title">TWOJE GRUPY</h2>
                    <div className="groups-list">
                        {userGroups.length === 0 ? (
                            <p className="no-groups-message">Brak Twoich grup.</p>
                        ) : (
                            userGroups.map((group) => (
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
                                                    onClick={() => confirmDeleteGroup(group.id)}
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
                                            onClick={() => confirmLeaveGroup(group.id)}
                                        />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* PROPONOWANE GRUPY */}
                <div className="groups-box">
                    <h2 className="groups-box-title">PROPONOWANE GRUPY</h2>
                    <div className="groups-list">
                        {proposedGroups.length === 0 ? (
                            <p className="no-groups-message">Brak proponowanych grup.</p>
                        ) : (
                            proposedGroups.map((group) => (
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
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Modal potwierdzenia usunięcia */}
            {groupIdToDelete && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Czy na pewno chcesz usunąć tę grupę?</h2>
                        <div className="modal-buttons">
                            <button
                                className="confirm-button"
                                onClick={handleConfirmDelete}
                            >
                                Tak, usuń
                            </button>
                            <button
                                className="cancel-button"
                                onClick={handleCancelDelete}
                            >
                                Anuluj
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal potwierdzenia opuszczenia grupy */}
            {groupIdToLeave && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Czy na pewno chcesz opuścić tę grupę?</h2>
                        <div className="modal-buttons">
                            <button
                                className="confirm-button"
                                onClick={handleConfirmLeave}
                            >
                                Tak, opuść
                            </button>
                            <button
                                className="cancel-button"
                                onClick={handleCancelLeave}
                            >
                                Anuluj
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <SquaresGroup />
            <Footer />
        </div>
    );
}
