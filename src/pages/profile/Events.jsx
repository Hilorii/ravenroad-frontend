import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

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
                    setEvents(response.data);
                    setFilteredEvents(response.data);
                } else {
                    console.error("Expected an array of events, but received:", typeof response.data);
                }
            })
            .catch(error => {
                console.error("Error fetching events:", error);
            });
    }, []);

    const handleLeaveEvent = async (eventId) => {
        const confirmLeave = window.confirm('Are you sure you want to leave this event?');
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
        const confirmDelete = window.confirm('Are you sure you want to delete this event?');
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:5000/deleteEvent/${eventId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!response.ok) throw new Error('Error deleting event');

            alert('Event deleted!');
            const updatedEvents = events.filter(event => event.id !== eventId);
            setEvents(updatedEvents);
            setFilteredEvents(updatedEvents);
        } catch (error) {
            console.error('Error:', error);
            alert('There was a problem deleting the event.');
        }
    };

    const toggleMenu = (eventId) => {
        setMenuOpen(prevState => ({
            ...prevState,
            [eventId]: !prevState[eventId]
        }));
    };

    useEffect(() => {
        handleSearch();
    }, [searchQuery]);

    return (
        <div className="gC-container">
            <div className="g-add-search">
                <div className="g-filter">
                    <input
                        className="gC-input"
                        type="text"
                        placeholder="Search events..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="g-button-container">
                    <Link to="/createEvent" className="g-edit-bt">
                        <button className="edit" role="button"><span>Stwórz wydarzenie</span></button>
                    </Link>
                    <Link to="/joinEvents" className="g-edit-bt">
                        <button className="edit" role="button"><span>Znajdź wydarzenie</span></button>
                    </Link>
                </div>
            </div>

            {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                    <div key={event.id} className="group-card">
                        <h2>{event.name}</h2>

                        <div className="g-ham-button-container">
                            <button onClick={() => toggleMenu(event.id)} className="hamburger-btn">
                                {menuOpen[event.id] ? "▲" : "☰"}
                            </button>

                            {menuOpen[event.id] && (
                                <div className="g-dropdown-menu">
                                    <button onClick={() => navigate(`/eventDetails/${event.id}`)} className="edit" role="button">
                                        <span>Szczegóły</span>
                                          </button>

                            {/* Show "Leave Event" button only if the user is not the creator */}
                            {String(event.created_by) !== String(userId) && (
                                <button onClick={() => handleLeaveEvent(event.id)} className="edit" role="button">
                            <span>Leave Event</span>
                        </button>
                        )}

                        {/* Show edit and delete options only if the user is the creator */}
                        {String(event.created_by) === String(userId) && (
                        <div className="group-owner-options">
                            <button onClick={() => handleEditEvent(event.id)} className="edit" role="button">
                                <span>Edytuj</span>
                            </button>
                            <button onClick={() => handleDeleteEvent(event.id)} className="edit" role="button">
                                <span>Usuń</span>
                            </button>
                        </div>
                        )}
                    </div>
                )}
        </div>
</div>
))
) : (
        <p className="gradient__text rC-p">Nie znaleziono wydarzenia.</p>
    )}
</div>
);
}