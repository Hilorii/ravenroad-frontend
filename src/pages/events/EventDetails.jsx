import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import AnimatedBackground from '../../assets/AnimatedBackground/AnimatedBackground';
import Footer from '../../containers/footer/Footer';
import { useUser } from '../../contexts/UserContext';
import { FaCrown } from 'react-icons/fa';
import './EventDetails.css';
import BackButton from '../../components/backBt/BackButton';

export default function EventDetails() {
    const { id } = useParams();
    const { user } = useUser(); // informacje o zalogowanym użytkowniku

    const [event, setEvent] = useState(null);
    const [error, setError] = useState(null);

    // Lista uczestników pobierana z innego endpointu
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        fetchEventDetails();
        fetchEventParticipants();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Pobieranie szczegółów wydarzenia
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

    // Pobieranie listy uczestników z endpointu /event/:eventId/participants
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

    // Fallbacki dla banera i avatara, jeśli nie ma w bazie
    const bannerUrl = event.banner
        ? `http://localhost:5000/uploads/${event.banner}`
        : '/images/default-event-banner.jpg';

    const avatarUrl = event.image
        ? `http://localhost:5000/uploads/${event.image}`
        : '/images/default-event-avatar.jpg';

    // Liczba uczestników -> bierzemy z participants
    const participantsCount = participants.length;

    return (
        <>
            <AnimatedBackground />
            <Navbar />
            <BackButton />

            <div className="event-details-container">
                {/* BANNER WYDARZENIA */}
                <div className="event-banner">
                    <img
                        src={bannerUrl}
                        alt="Event Banner"
                        className="event-banner-img"
                    />
                </div>

                <div className="event-content">
                    {/* AVATAR WYDARZENIA */}
                    <div className="event-avatar-wrapper">
                        <img
                            src={avatarUrl}
                            alt="Event Avatar"
                            className="d-event-avatar"
                        />
                    </div>

                    {/* NAZWA WYDARZENIA + (opcjonalna) korona organizatora */}
                    <h1 className="event-title">
                        {event.name}
                        {/* Jeśli zalogowany user jest twórcą => pokazujemy koronę */}
                        {user && event.created_by === user.id && (
                            <FaCrown
                                className="creator-crown"
                                title="Jesteś twórcą tego wydarzenia"
                            />
                        )}
                    </h1>

                    {/* OPIS WYDARZENIA */}
                    <p className="event-description">
                        {event.description || 'Brak opisu...'}
                    </p>

                    {/* DODATKOWE INFORMACJE */}
                    <div className="event-info">
                        <p>
                            <strong>Organizator:</strong>{' '}
                            {event.creator_username || '(nieznany)'}
                        </p>
                        <p><strong>Data:</strong> {event.date || 'Brak daty'}</p>
                        <p><strong>Miejsce:</strong> {event.location || 'Brak lokalizacji'}</p>
                        <p><strong>Liczba uczestników:</strong> {participantsCount}</p>
                    </div>

                    {/* LISTA UCZESTNIKÓW */}
                    <div className="participants-list">
                        <h2 className="participants-list-title">Uczestnicy wydarzenia</h2>
                        <div className="participants-grid">
                            {participantsCount === 0 && (
                                <p style={{ color: '#fff' }}>Brak uczestników lub brak wyników.</p>
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
