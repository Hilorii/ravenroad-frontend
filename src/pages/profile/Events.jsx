import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { Details, Trash, Edit, Leave } from '../../components/icons';

export default function EventsContainer() {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [menuOpen, setMenuOpen] = useState({});
    const { user } = useUser();
    const navigate = useNavigate();
    const userId = user.id;

    useEffect(() => {
        axios.get('http://localhost:5000/events', { withCredentials: true })
            .then(response => {
                if (Array.isArray(response.data)) {
                    console.log('Events fetched:', response.data); // Log do sprawdzenia pobranych danych
                    setEvents(response.data);
                    setFilteredEvents(response.data); // Inicjalizacja filtrowanych wydarzeń
                } else {
                    console.error("Expected an array of events, but received:", typeof response.data);
                }
            })
            .catch(error => {
                console.error("Error fetching events:", error);
            });
    }, []);


    const handleLeaveEvent = async (eventId) => {
        const confirmLeave = window.confirm('Czy na pewno chcesz opuścić to wydarzenie?');
        if (!confirmLeave) return;

        try {
            const response = await fetch(`http://localhost:5000/leaveEvent/${eventId}`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error leaving event');
            }

            alert('Successfully left the event!');
            const updatedEvents = events.filter(event => event.id !== eventId);
            setEvents(updatedEvents);
            setFilteredEvents(updatedEvents);
        } catch (error) {
            console.error('Error leaving event:', error);
            alert('There was a problem leaving the event.');
        }
    };

    const handleSearch = () => {
        const filtered = events.filter(event =>
            event.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredEvents(filtered);
    };

    const handleEditEvent = (eventId) => {
        navigate(`/editEvent/${eventId}`);
    };

    const handleDeleteEvent = async (eventId) => {
        const confirmDelete = window.confirm('Czy na pewno chcesz usunąć to wydarzenie?');
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:5000/deleteEvent/${eventId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!response.ok) throw new Error('Error deleting event');

            alert('Wydarzenie usunięte!');
            const updatedEvents = events.filter(event => event.id !== eventId);
            setEvents(updatedEvents);
            setFilteredEvents(updatedEvents);
        } catch (error) {
            console.error('Error:', error);
            alert('Wystąpił problem podczas usuwania tego wydarzenia.');
        }
    };

    const toggleMenu = (eventId) => {
        setMenuOpen(prevState => ({
            ...prevState,
            [eventId]: !prevState[eventId]
        }));
    };

    useEffect(() => {
        if (events.length > 0) {
            handleSearch();
        }
    }, [searchQuery, events]); // Dodaj events do zależności

    return (
        <div className="gC-container">
            <div className="g-add-search">
                <div className="g-filter">
                    <input
                        className="gC-input"
                        type="text"
                        placeholder="Szukaj wydarzeń..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="g-button-container">
                    <Link to="/createEvent" className="g-edit-bt">
                        <button className="edit e-filter-buttons" role="button"><span>Stwórz wydarzenie</span></button>
                    </Link>
                    <Link to="/joinEvents" className="g-edit-bt">
                        <button className="edit g-join-bt e-filter-buttons" role="button"><span>Znajdź wydarzenie</span></button>
                    </Link>
                </div>
            </div>

            {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                    <div key={event.id} className="route-card">
                        <div className="rC-inside">
                            <img
                                src={`http://localhost:5000/uploads/${event.image}`}
                                alt={event.name}
                                className="route-image"
                            />
                            <h2>{event.name}</h2>

                            <div className="r-button-container">
                                <button onClick={() => navigate(`/eventDetails/${event.id}`)} className="edit full-button" role="button">
                                    <span>Szczegóły</span>
                                </button>
                                {String(event.created_by) !== String(userId) && (
                                    <button onClick={() => handleLeaveEvent(event.id)} className="edit full-button" role="button">
                                        <span>Opuść wydarzenie</span>
                                    </button>
                                )}
                                {String(event.created_by) === String(userId) && (
                                    <div className="group-owner-options">
                                        <button onClick={() => handleEditEvent(event.id)} className="edit full-button" role="button">
                                            <span>Edytuj</span>
                                        </button>
                                        <button onClick={() => handleDeleteEvent(event.id)} className="edit full-button" role="button">
                                            <span>Usuń</span>
                                        </button>
                                    </div>
                                )}

                                {/* Widoczne dla mniejszych ekranów */}
                                <button onClick={() => navigate(`/eventDetails/${event.id}`)}
                                        className="icon-button-details" role="button">
                                            <span style={{color: 'white'}}>
                                                <Details/>
                                             </span>
                                </button>
                                {String(event.created_by) === String(userId) && (
                                    <>
                                        <button className="icon-button-delete"
                                                onClick={() => handleDeleteEvent(event.id)} role="button">
                                            <span style={{color: 'white'}}>
                                                <Trash/>
                                             </span>
                                        </button>
                                        <button className="icon-button-edit" onClick={() => handleEditEvent(event.id)}
                                                role="button">
                                            <span style={{color: 'white'}}>
                                                <Edit/>
                                             </span>
                                        </button>
                                    </>
                                )}
                                {String(event.created_by) !== String(userId) && (
                                    <button className="icon-button-leave" onClick={() => handleLeaveEvent(event.id)}
                                            role="button">
                                            <span style={{color: 'white'}}>
                                                <Leave/>
                                             </span>
                                    </button>
                                )}

                            </div>
                        </div>
                    </div>
                ))
            ) : events.length === 0 ? (
                <p></p>
            ) : (
                <p className="gradient__text rC-p">Nie znaleziono wydarzenia.</p>
            )}
        </div>
    );
}
