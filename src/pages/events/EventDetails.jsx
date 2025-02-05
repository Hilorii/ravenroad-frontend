import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import AnimatedBackground from '../../assets/AnimatedBackground/AnimatedBackground';
import Footer from '../../containers/footer/Footer';
import { useUser } from '../../contexts/UserContext';
import { FaCrown } from 'react-icons/fa';
import './EventDetails.css';
import BackButton from '../../components/backBt/BackButton';

/**
 * Funkcja formatuje ciąg ISO daty (np. "2029-11-15T23:00:00.000Z")
 * do postaci "DD-MM-RRRR HH:MM" (bez sekund).
 * Przykład:
 *   "2029-11-15T23:00:00.000Z" -> "16-11-2029 00:00" (zależnie od strefy)
 */
function formatISODate(isoString) {
    if (!isoString) {
        return 'Brak daty';
    }

    // Parsujemy ciąg ISO na obiekt Date
    const dateObj = new Date(isoString);
    // Sprawdzamy, czy parsowanie się udało (dateObj jest "Invalid Date"?)
    if (isNaN(dateObj)) {
        return 'Brak daty';
    }

    // Wyciągamy składniki daty/godziny
    const dd = String(dateObj.getDate()).padStart(2, '0');
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const yyyy = dateObj.getFullYear();

    const hh = String(dateObj.getHours()).padStart(2, '0');
    const min = String(dateObj.getMinutes()).padStart(2, '0');

    return `${dd}-${mm}-${yyyy} ${hh}:${min}`;
}

export default function EventDetails() {
    const { id } = useParams();
    const { user } = useUser(); // dane zalogowanego użytkownika

    const [event, setEvent] = useState(null);
    const [error, setError] = useState(null);

    // Lista uczestników
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        fetchEventDetails();
        fetchEventParticipants();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Pobiera szczegóły wydarzenia z /events/:id
    const fetchEventDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/events/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Błąd podczas pobierania szczegółów wydarzenia');
            }

            const data = await response.json();
            setEvent(data);
        } catch (err) {
            setError(err.message);
        }
    };

    // Pobiera listę uczestników z /event/:eventId/participants
    const fetchEventParticipants = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/event/${id}/participants`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Błąd podczas pobierania listy uczestników');
            }

            const participantsData = await response.json();
            setParticipants(participantsData);
        } catch (err) {
            setError(err.message);
        }
    };

    if (error) {
        return (
            <>
                <AnimatedBackground />
                <Navbar />
                <h1 style={{ color: '#fff', textAlign: 'center', marginTop: '2rem' }}>
                    {error}
                </h1>
                <Footer />
            </>
        );
    }

    if (!event) {
        return (
            <>
                <AnimatedBackground />
                <Navbar />
                <h1 style={{ color: '#fff', textAlign: 'center', marginTop: '2rem' }}>
                    Ładowanie szczegółów wydarzenia...
                </h1>
                <Footer />
            </>
        );
    }

    // Baner i avatar (jeśli brak -> fallback)
    const bannerUrl = event.banner
        ? `http://localhost:5000/uploads/${event.banner}`
        : '/images/default-event-banner.jpg';

    const avatarUrl = event.image
        ? `http://localhost:5000/uploads/${event.image}`
        : '/images/default-event-avatar.jpg';

    // Liczba uczestników
    const participantsCount = participants.length;

    // Formatujemy "start_date" i "end_date" jako ISO string
    // (jeśli w bazie jest "2029-11-15T23:00:00.000Z", zobaczysz w local time)
    const startDateTime = formatISODate(event.start_date);
    const endDateTime = formatISODate(event.end_date);

    return (
        <>
            <AnimatedBackground />
            <Navbar />
            <BackButton />

            <div className="event-details-container">
                {/* Banner wydarzenia */}
                <div className="event-banner">
                    <img
                        src={bannerUrl}
                        alt="Event Banner"
                        className="event-banner-img"
                    />
                </div>

                <div className="event-content">
                    {/* Avatar wydarzenia */}
                    <div className="event-avatar-wrapper">
                        <img
                            src={avatarUrl}
                            alt="Event Avatar"
                            className="d-event-avatar"
                        />
                    </div>

                    {/* Nazwa wydarzenia + korona (jeśli user jest twórcą) */}
                    <h1 className="event-title">
                        {event.name}
                        {user && event.created_by === user.id && (
                            <FaCrown
                                className="creator-crown"
                                title="Jesteś twórcą tego wydarzenia"
                            />
                        )}
                    </h1>

                    {/* Opis wydarzenia */}
                    <p className="event-description">
                        {event.description || 'Brak opisu...'}
                    </p>

                    {/* Dodatkowe informacje */}
                    <div className="event-info">
                        <p>
                            <strong>Organizator:</strong>{' '}
                            {event.creator_username || '(nieznany)'}
                        </p>
                        <p>
                            <strong>Data rozpoczęcia:</strong>{' '}
                            {startDateTime}
                        </p>
                        <p>
                            <strong>Data zakończenia:</strong>{' '}
                            {endDateTime}
                        </p>
                        <p>
                            <strong>Miejsce wydarzenia:</strong>{' '}
                            {event.location || 'Brak lokalizacji'}
                        </p>
                        <p>
                            <strong>Liczba uczestników:</strong>{' '}
                            {participantsCount}
                        </p>
                    </div>

                    {/* Lista uczestników */}
                    <div className="participants-list">
                        <h2 className="participants-list-title">Uczestnicy wydarzenia</h2>
                        <div className="participants-grid">
                            {participantsCount === 0 && (
                                <p style={{ color: '#fff' }}>
                                    Brak uczestników lub brak wyników.
                                </p>
                            )}
                            {participants.map((participant, index) => {
                                const participantAvatarUrl = participant.avatar
                                    ? `http://localhost:5000/uploads/${participant.avatar}`
                                    : '/images/default-event-avatar.jpg';

                                return (
                                    <div key={index} className="participant-item">
                                        <img
                                            src={participantAvatarUrl}
                                            alt={participant.username}
                                            className="participant-avatar"
                                        />
                                        <span className="participant-username">
                      {participant.username}
                    </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
