import React, { useEffect, useState, useCallback } from 'react';
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

    // --------------------------
    // Tablice eventów
    // --------------------------
    const [userEvents, setUserEvents] = useState([]);       // Wydarzenia użytkownika
    const [proposedEvents, setProposedEvents] = useState([]); // Proponowane wydarzenia
    const [myActiveEvents, setMyActiveEvents] = useState([]);  // Aktywne wydarzenia
    const [myEndedEvents, setMyEndedEvents] = useState([]);    // Zakończone wydarzenia

    // --------------------------
    // Błędy / Wyszukiwanie
    // --------------------------
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [searchError, setSearchError] = useState(null);

    // --------------------------
    // Modal: USUWANIE wydarzenia
    // --------------------------
    const [eventIdToDelete, setEventIdToDelete] = useState(null);

    // --------------------------
    // Modal: OPUSZCZANIE wydarzenia
    // --------------------------
    const [eventIdToLeave, setEventIdToLeave] = useState(null);

    // --------------------------------------------------
    //  Pomocnicze funkcje do sprawdzania stanu wydarzeń
    // --------------------------------------------------
    const isActiveEvent = (eventId) =>
        myActiveEvents.some((ev) => ev.id === eventId);

    const isEndedEvent = (eventId) =>
        myEndedEvents.some((ev) => ev.id === eventId);

    // ----------------------------------
    //  Metody pobierające z backendu
    // ----------------------------------
    const fetchUserEvents = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/events', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) {
                // Jeśli brak eventów (404), ustawiamy pustą listę
                if (response.status === 404) {
                    setUserEvents([]);
                    return;
                }
                throw new Error('Błąd podczas pobierania Twoich eventów.');
            }
            const data = await response.json();
            setUserEvents(data);
        } catch (err) {
            setError(err.message);
            // Jeżeli wystąpił błąd inny niż 404 (np. 500),
            // zachowamy ewentualnie starą tablicę lub ustalimy pustą:
            setUserEvents([]);
        }
    }, []);

    const fetchProposedEvents = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/proposedEvents', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) {
                if (response.status === 404) {
                    setProposedEvents([]);
                    return;
                }
                throw new Error('Błąd podczas pobierania proponowanych eventów.');
            }
            const data = await response.json();
            setProposedEvents(data);
        } catch (err) {
            setError(err.message);
            setProposedEvents([]);
        }
    }, []);

    const fetchActiveEvents = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/activeEvents', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) {
                if (response.status === 404) {
                    setMyActiveEvents([]);
                    return;
                }
                throw new Error('Błąd podczas pobierania aktywnych eventów.');
            }
            const data = await response.json();
            setMyActiveEvents(data);
        } catch (err) {
            setError(err.message);
            setMyActiveEvents([]);
        }
    }, []);

    const fetchInactiveEvents = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/inactiveEvents', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) {
                if (response.status === 404) {
                    setMyEndedEvents([]);
                    return;
                }
                throw new Error('Błąd podczas pobierania zakończonych eventów.');
            }
            const data = await response.json();
            setMyEndedEvents(data);
        } catch (err) {
            setError(err.message);
            setMyEndedEvents([]);
        }
    }, []);

    // ------------------------------
    // useEffect: pobierz wszystkie
    // ------------------------------
    useEffect(() => {
        fetchUserEvents();
        fetchProposedEvents();
        fetchActiveEvents();
        fetchInactiveEvents();
    }, [
        fetchUserEvents,
        fetchProposedEvents,
        fetchActiveEvents,
        fetchInactiveEvents
    ]);

    // ------------------------------
    //  Resetowanie błędów
    // ------------------------------
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    useEffect(() => {
        if (searchError) {
            const timer = setTimeout(() => setSearchError(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [searchError]);

    // ---------------------------------------------------------
    //  Akcje: edycja, detale, dołącz, potwierdzanie modali itd.
    // ---------------------------------------------------------
    const handleEditEvent = (eventId) => {
        navigate(`/editEvent/${eventId}`);
    };

    const handleViewDetails = (eventId) => {
        navigate(`/eventDetails/${eventId}`);
    };

    // --------------------------------------
    //  OPUSZCZANIE WYDARZENIA z potwierdzeniem
    // --------------------------------------
    const confirmLeaveEvent = (eventId) => {
        setEventIdToLeave(eventId);
    };

    const handleConfirmLeaveEvent = async () => {
        if (!eventIdToLeave) return;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/leaveEvent/${eventIdToLeave}`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Błąd podczas opuszczania wydarzenia.');
            }

            // Po opuszczeniu odśwież
            fetchUserEvents();
            fetchActiveEvents();
            fetchInactiveEvents();
        } catch (err) {
            setError(err.message);
        } finally {
            // zamykamy modal
            setEventIdToLeave(null);
        }
    };

    const handleCancelLeaveEvent = () => {
        setEventIdToLeave(null);
    };

    // ------------
    //  DOŁĄCZANIE
    // ------------
    const handleJoinEvent = async (eventId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/joinEvent/${eventId}`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Błąd podczas dołączania do wydarzenia.');
            }

            // Odśwież
            fetchUserEvents();
            fetchProposedEvents();
            fetchActiveEvents();
            fetchInactiveEvents();
        } catch (err) {
            setError(err.message);
        }
    };

    // ---------------------------------------------
    //  USUWANIE WYDARZENIA z potwierdzeniem (modal)
    // ---------------------------------------------
    const confirmDeleteEvent = (eventId) => {
        setEventIdToDelete(eventId);
    };

    const handleConfirmDeleteEvent = async () => {
        if (!eventIdToDelete) return;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/deleteEvent/${eventIdToDelete}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Błąd podczas usuwania wydarzenia.');
            }

            // Odśwież
            fetchUserEvents();
            fetchActiveEvents();
            fetchInactiveEvents();
        } catch (err) {
            setError(err.message);
        } finally {
            setEventIdToDelete(null);
        }
    };

    const handleCancelDeleteEvent = () => {
        setEventIdToDelete(null);
    };

    // ----------------------------------
    // Nawigacja (trasy / grupy)
    // ----------------------------------
    const handleNavigateToRoutes = () => {
        navigate('/routes');
    };

    const handleNavigateToGroups = () => {
        navigate('/groups');
    };

    // ----------------------------------
    //  Wyszukiwanie
    // ----------------------------------
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        try {
            const token = localStorage.getItem('token');
            setSearchError(null);

            const response = await fetch(
                `http://localhost:3000/searchEvents?query=${encodeURIComponent(searchQuery)}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
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

    // ----------------------------------
    // Render
    // ----------------------------------
    return (
        <div>
            <AnimatedBackground />
            <Navbar />

            {/* Title Section: TRASY - EVENTY - GRUPY */}
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
                                Wyczyść
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
                                            {/* Detale */}
                                            <FaInfoCircle
                                                className="event-icon"
                                                title="Detale wydarzenia"
                                                onClick={() => handleViewDetails(event.id)}
                                            />
                                            {/* Dołącz */}
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

            {/* TWOJE EVENTY i PROPONOWANE EVENTY */}
            <div className="events-wrapper">
                {/* TWOJE EVENTY */}
                <div className="events-box">
                    <h2 className="events-box-title">TWOJE EVENTY</h2>
                    <div className="events-list">
                        {userEvents.length === 0 ? (
                            <p className="error-message">Brak Twoich eventów.</p>
                        ) : (
                            userEvents.map((event) => {
                                const active = isActiveEvent(event.id);
                                const ended = isEndedEvent(event.id);

                                return (
                                    <div key={event.id} className="event-item">
                                        {/* Korona, jeśli user jest twórcą */}
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
                                            {active ? (
                                                <>
                                                    {/* Aktywny: tylko detale */}
                                                    <FaInfoCircle
                                                        className="event-icon"
                                                        title="Detale wydarzenia"
                                                        onClick={() => handleViewDetails(event.id)}
                                                    />
                                                </>
                                            ) : ended ? (
                                                <>
                                                    {/* Zakończony: detale + usuń (jeśli user jest twórcą) */}
                                                    <FaInfoCircle
                                                        className="event-icon"
                                                        title="Detale wydarzenia"
                                                        onClick={() => handleViewDetails(event.id)}
                                                    />
                                                    {user && event.created_by === user.id && (
                                                        <FaTrash
                                                            className="event-icon"
                                                            title="Usuń wydarzenie"
                                                            onClick={() => confirmDeleteEvent(event.id)}
                                                        />
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    {/* Ani aktywny, ani zakończony */}
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
                                                                onClick={() => confirmDeleteEvent(event.id)}
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
                                                        onClick={() => confirmLeaveEvent(event.id)}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* PROPONOWANE EVENTY */}
                <div className="events-box">
                    <h2 className="events-box-title">PROPONOWANE EVENTY</h2>
                    <div className="events-list">
                        {proposedEvents.length === 0 ? (
                            <p className="error-message">Brak proponowanych eventów.</p>
                        ) : (
                            proposedEvents.map((event) => (
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
                        )}
                    </div>
                </div>
            </div>

            {/* TWOJE AKTYWNE EVENTY & TWOJE ZAKOŃCZONE EVENTY */}
            <div className="events-wrapper">
                {/* AKTYWNE */}
                <div className="events-box active-events-box">
                    <h2 className="events-box-title active-events-title">
                        TWOJE AKTYWNE EVENTY
                    </h2>
                    <div className="events-list">
                        {myActiveEvents.length === 0 ? (
                            <p className="error-message">Brak aktywnych eventów.</p>
                        ) : (
                            myActiveEvents.map((event) => (
                                <div key={event.id} className="event-item">
                                    <img
                                        src={`http://localhost:5000/uploads/${event.image}`}
                                        alt={event.name}
                                        className="event-avatar"
                                    />
                                    <span className="event-name">{event.name}</span>
                                    {/* Tylko detale */}
                                    <div className="event-actions">
                                        <FaInfoCircle
                                            className="event-icon"
                                            title="Detale wydarzenia"
                                            onClick={() => handleViewDetails(event.id)}
                                        />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* ZAKOŃCZONE */}
                <div className="events-box ended-events-box">
                    <h2 className="events-box-title ended-events-title">
                        TWOJE ZAKOŃCZONE EVENTY
                    </h2>
                    <div className="events-list">
                        {myEndedEvents.length === 0 ? (
                            <p className="error-message">Brak zakończonych eventów.</p>
                        ) : (
                            myEndedEvents.map((event) => (
                                <div key={event.id} className="event-item">
                                    <img
                                        src={`http://localhost:5000/uploads/${event.image}`}
                                        alt={event.name}
                                        className="event-avatar"
                                    />
                                    <span className="event-name">{event.name}</span>

                                    {/* Tylko detale + (opcjonalnie usuń jeśli user jest twórcą) */}
                                    <div className="event-actions">
                                        <FaInfoCircle
                                            className="event-icon"
                                            title="Detale wydarzenia"
                                            onClick={() => handleViewDetails(event.id)}
                                        />
                                        {user && event.created_by === user.id && (
                                            <FaTrash
                                                className="event-icon"
                                                title="Usuń wydarzenie"
                                                onClick={() => confirmDeleteEvent(event.id)}
                                            />
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Modal potwierdzenia USUNIĘCIA wydarzenia */}
            {eventIdToDelete && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Czy na pewno chcesz usunąć to wydarzenie?</h2>
                        <div className="modal-buttons">
                            <button
                                className="confirm-button"
                                onClick={handleConfirmDeleteEvent}
                            >
                                Tak, usuń
                            </button>
                            <button
                                className="cancel-button"
                                onClick={handleCancelDeleteEvent}
                            >
                                Anuluj
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal potwierdzenia OPUSZCZENIA wydarzenia */}
            {eventIdToLeave && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Czy na pewno chcesz opuścić to wydarzenie?</h2>
                        <div className="modal-buttons">
                            <button
                                className="confirm-button"
                                onClick={handleConfirmLeaveEvent}
                            >
                                Tak, opuść
                            </button>
                            <button
                                className="cancel-button"
                                onClick={handleCancelLeaveEvent}
                            >
                                Anuluj
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <SquaresEvent />
            <Footer />
        </div>
    );
}
