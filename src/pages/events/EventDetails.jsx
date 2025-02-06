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
 * Formatuje datę z klasycznego ISO 8601, np. "2031-02-16T23:00:00.000Z"
 * do postaci "DD-MM-YYYY HH:MM" (UTC).
 */
function formatIsoNoTZ(isoString) {
    if (!isoString) {
        return 'Brak daty';
    }

    // Parsujemy do obiektu Date
    const dateObj = new Date(isoString);

    // Elementy daty/godziny (UTC). Jeśli chcesz czas lokalny, usuń "UTC" z metod.
    const dd = String(dateObj.getUTCDate()).padStart(2, '0');
    const mm = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
    const yyyy = dateObj.getUTCFullYear();
    const hh = String(dateObj.getUTCHours()).padStart(2, '0');
    const min = String(dateObj.getUTCMinutes()).padStart(2, '0');

    // godzina nie działa potem naprawię..
    // return `${dd}-${mm}-${yyyy} ${hh}:${min}`;
    return `${dd}-${mm}-${yyyy}`;
}

export default function EventDetails() {
    const { id } = useParams();
    const { user } = useUser();

    const [event, setEvent] = useState(null);
    const [error, setError] = useState(null);
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        fetchEventDetails();
        fetchEventParticipants();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    // Ścieżki do obrazków
    const bannerUrl = event.banner
        ? `http://localhost:5000/uploads/${event.banner}`
        : '/images/default-event-banner.jpg';

    const avatarUrl = event.image
        ? `http://localhost:5000/uploads/${event.image}`
        : '/images/default-event-avatar.jpg';

    // Formatowanie dat (zakładamy że event.start_date i event.end_date to ISO stringi)
    const startDateTime = formatIsoNoTZ(event.start_date);
    const endDateTime = formatIsoNoTZ(event.end_date);

    const participantsCount = participants.length;

    return (
        <>
            <AnimatedBackground />
            <Navbar />
            <BackButton />

            <div className="event-details-container">
                <div className="event-banner">
                    <img src={bannerUrl} alt="Event Banner" className="event-banner-img" />
                </div>

                <div className="event-content">
                    <div className="event-avatar-wrapper">
                        <img src={avatarUrl} alt="Event Avatar" className="d-event-avatar" />
                    </div>

                    <h1 className="event-title">
                        {event.name}
                        {user && event.created_by === user.id && (
                            <FaCrown
                                className="creator-crown"
                                title="Jesteś twórcą tego wydarzenia"
                            />
                        )}
                    </h1>

                    <p className="event-description">
                        {event.description || 'Brak opisu...'}
                    </p>

                    <div className="event-info">
                        <p>
                            <strong>Organizator:</strong> {event.creator_username || '(nieznany)'}
                        </p>
                        <p>
                            <strong>Data rozpoczęcia:</strong> {startDateTime}
                        </p>
                        <p>
                            <strong>Data zakończenia:</strong> {endDateTime}
                        </p>
                        <p>
                            <strong>Miejsce wydarzenia:</strong> {event.location || 'Brak lokalizacji'}
                        </p>
                        <p>
                            <strong>Liczba uczestników:</strong> {participantsCount}
                        </p>
                    </div>

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
