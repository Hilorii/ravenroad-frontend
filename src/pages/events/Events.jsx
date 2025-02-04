import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import Navbar from "../../components/navbar/Navbar";
import AnimatedBackground from '../../assets/AnimatedBackground/AnimatedBackground';
import Footer from '../../containers/footer/Footer';
import './Events.css';
import SquaresEvent from '../../components/linkSquares/LinkSquaresEvents';

import {
    FaEdit,
    FaInfoCircle,
    FaSignOutAlt,
    FaPlus,
    FaCrown,
    FaTrash
} from 'react-icons/fa';

export default function Events() {
    const { user } = useUser();
    const navigate = useNavigate();
    const [userEvents, setUserEvents] = useState([]);
    const [proposedEvents, setProposedEvents] = useState([]);
    const [error, setError] = useState(null); // Błędy przy pobieraniu eventów

    // Stany dla wyszukiwarki
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [searchError, setSearchError] = useState(null); // Błędy wyłącznie dla wyszukiwania

    useEffect(() => {
        fetchUserEvents();
        fetchProposedEvents();
    }, []);

    // Auto reset alertów - usuwamy komunikat o błędzie po 5 sekundach
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    useEffect(() => {
        if (searchError) {
            const timer = setTimeout(() => {
                setSearchError(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [searchError]);

    const fetchUserEvents = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/events', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Błąd podczas pobierania Twoich wydarzeń.');
            }

            const data = await response.json();
            setUserEvents(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchProposedEvents = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/events', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Błąd podczas pobierania proponowanych wydarzeń.');
            }

            const data = await response.json();
            setProposedEvents(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEditEvent = (eventId) => {
        navigate(`/editEvent/${eventId}`);
    };

    const handleViewDetails = (eventId) => {
        navigate(`/eventDetails/${eventId}`);
    };

    const handleLeaveEvent = async (eventId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/leaveEvent/${eventId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Błąd podczas opuszczania wydarzenia.');
            }

            setUserEvents(prev => prev.filter(ev => ev.id !== eventId));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleJoinEvent = async (eventId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/joinEvent/${eventId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Błąd podczas dołączania do wydarzenia.');
            }

            // Po dołączeniu odświeżamy listy
            fetchUserEvents();
            fetchProposedEvents();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/deleteEvent/${eventId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Błąd podczas usuwania wydarzenia.');
            }

            setUserEvents(prev => prev.filter(ev => ev.id !== eventId));
        } catch (err) {
            setError(err.message);
        }
    };

    // Nawigacja do tras i grup
    const handleNavigateToRoutes = () => {
        navigate('/routes');
    };

    const handleNavigateToGroups = () => {
        navigate('/groups');
    };

    // Handler wyszukiwania – komunikaty błędów tutaj trafiają do searchError
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            return;
        }
        try {
            const token = localStorage.getItem('token');
            setSearchError(null);

            const response = await fetch(
                `http://localhost:3000/searchEvents?query=${encodeURIComponent(searchQuery)}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Błąd podczas wyszukiwania wydarzeń.');
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

    return (
        <div>
            <AnimatedBackground />
            <Navbar />

            {/* Title Section with TRASY - EVENTY - GRUPY */}
            <div className="title-container">
                <h2 className="title-item no-glow" onClick={handleNavigateToRoutes}>
                    TRASY
                </h2>
                <h1 className="events-title">EVENTY</h1>
                <h2 className="title-item no-glow" onClick={handleNavigateToGroups}>
                    GRUPY
                </h2>
            </div>

            {/* Pasek wyszukiwania */}
            <div className="search-container">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Wyszukaj wydarzenie..."
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
                <div className="events-wrapper">
                    <div className="events-box search-results-box">
                        <div className="search-results-header">
                            <h2 className="events-box-title">WYNIKI WYSZUKIWANIA</h2>
                            <button className="clear-search-button" onClick={clearSearch}>
                                Wyczyść wyszukiwanie
                            </button>
                        </div>
                        <div className="events-list">
                            {searchError ? (
                                <p className="error-message">{searchError}</p>
                            ) : searchResults.length > 0 ? (
                                searchResults.map((event) => (
                                    <div key={event.id} className="event-item">
                                        <img
                                            src={`http://localhost:5000/uploads/${event.image}`}
                                            alt={event.name}
                                            className="event-avatar"
                                        />
                                        <span className="event-name">{event.name}</span>
                                        <div className="event-actions">
                                            <FaInfoCircle
                                                className="event-icon"
                                                title="Detale wydarzenia"
                                                onClick={() => handleViewDetails(event.id)}
                                            />
                                            <FaPlus
                                                className="event-icon"
                                                title="Dołącz do wydarzenia"
                                                onClick={() => handleJoinEvent(event.id)}
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

            <div className="events-wrapper">
                {/* TWOJE EVENTY */}
                <div className="events-box">
                    <h2 className="events-box-title">TWOJE EVENTY</h2>
                    <div className="events-list">
                        {error && <p className="error-message">{error}</p>}
                        {userEvents.map((event) => (
                            <div key={event.id} className="event-item">
                                {user && event.created_by === user.id && (
                                    <FaCrown className="event-crown" />
                                )}
                                <img
                                    src={`http://localhost:5000/uploads/${event.image}`}
                                    alt={event.name}
                                    className="event-avatar"
                                />
                                <span className="event-name">{event.name}</span>
                                <div className="event-actions">
                                    {user && event.created_by === user.id && (
                                        <>
                                            <FaEdit
                                                className="event-icon"
                                                title="Edytuj wydarzenie"
                                                onClick={() => handleEditEvent(event.id)}
                                            />
                                            <FaTrash
                                                className="event-icon"
                                                title="Usuń wydarzenie"
                                                onClick={() => handleDeleteEvent(event.id)}
                                            />
                                        </>
                                    )}
                                    <FaInfoCircle
                                        className="event-icon"
                                        title="Detale wydarzenia"
                                        onClick={() => handleViewDetails(event.id)}
                                    />
                                    <FaSignOutAlt
                                        className="event-icon"
                                        title="Opuść wydarzenie"
                                        onClick={() => handleLeaveEvent(event.id)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* PROPONOWANE EVENTY */}
                <div className="events-box">
                    <h2 className="events-box-title">PROPONOWANE EVENTY</h2>
                    <div className="events-list">
                        {error && <p className="error-message">{error}</p>}
                        {proposedEvents.map((event) => (
                            <div key={event.id} className="event-item">
                                <img
                                    src={`http://localhost:5000/uploads/${event.image}`}
                                    alt={event.name}
                                    className="event-avatar"
                                />
                                <span className="event-name">{event.name}</span>
                                <div className="event-actions">
                                    <FaInfoCircle
                                        className="event-icon"
                                        title="Detale wydarzenia"
                                        onClick={() => handleViewDetails(event.id)}
                                    />
                                    <FaPlus
                                        className="event-icon"
                                        title="Dołącz do wydarzenia"
                                        onClick={() => handleJoinEvent(event.id)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <SquaresEvent />

            <Footer />
        </div>
    );
}
