import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { Details, Plus } from '../../components/icons';

export default function JoinEventsContainer() {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [menuOpen, setMenuOpen] = useState({});
    const [loading, setLoading] = useState(true); // Nowy stan do śledzenia ładowania
    const { user } = useUser();
    const navigate = useNavigate();
    const userId = user ? user.id : null;
    const token = user ? user.token : null;

    // Wydzielenie funkcji do pobierania wydarzeń
    const fetchEvents = () => {
        setLoading(true);  // Rozpocznij ładowanie
        axios.get('http://localhost:5000/joinEvents', { withCredentials: true })
            .then(response => {
                if (Array.isArray(response.data)) {
                    console.log("Pobrane wydarzenia:", response.data); // Logowanie pobranych danych
                    setEvents(response.data);
                    setFilteredEvents(response.data);
                } else {
                    console.error("Oczekiwano tablicy wydarzeń, ale otrzymano:", typeof response.data);
                }
            })
            .catch(error => {
                console.error("Błąd podczas pobierania wydarzeń:", error);
            })
            .finally(() => {
                setLoading(false);  // Zakończ ładowanie po zakończeniu pobierania
            });
    };

    // Wywołanie fetchEvents w useEffect, aby wydarzenia były pobrane na początku
    useEffect(() => {
        fetchEvents();
    }, []);

    const handleSearch = () => {
        const filtered = events.filter(event =>
            event.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredEvents(filtered);
    };

    const handleEventJoin = async (eventId) => {
        try {
            const response = await axios.post(`/joinEvent/${eventId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`  // Użycie tokena
                }
            });
            alert(response.data.message);  // Pomyślne dołączenie

            // Filtruj wydarzenie z listy, do którego użytkownik właśnie dołączył
            const updatedEvents = events.filter(event => event.id !== eventId);
            setEvents(updatedEvents);
            setFilteredEvents(updatedEvents);

        } catch (error) {
            console.error('Błąd podczas dołączania do wydarzenia:', error);
            alert(error.response?.data?.error || 'Błąd podczas dołączania do wydarzenia');
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

    if (loading) {
        return <div>Ładowanie wydarzeń...</div>; // Komunikat ładowania
    }

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
            </div>

            {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                    <div key={event.id} className="route-card">
                        <div className="rC-inside">
                            <img
                                src={`http://localhost:5000/uploads/default-avatar.jpg`}
                                alt={event.name}
                                className="route-image"
                            />
                            <h2>{event.name}</h2>
                            <div className="r-button-container">
                                <button onClick={() => navigate(`/joinEventDetails/${event.id}`)}
                                        className="edit full-button" role="button">
                                    <span>Szczegóły</span>
                                </button>

                                {/* Przycisk Dołącz z ikonką */}
                                <button className="edit full-button" role="button"
                                        onClick={() => handleEventJoin(event.id)}>
                                    <span>Dołącz</span>
                                </button>


                                {/* Widoczne dla mniejszych ekranów */}
                                <div className="icon-buttons">
                                    <button onClick={() => navigate(`/joinEventDetails/${event.id}`)}
                                            className="icon-button-details" role="button">
                                    <span style={{color: 'white'}}>
                                        <Details/>
                                    </span>
                                    </button>
                                    <button className="icon-button-delete" onClick={() => handleEventJoin(event.id)}
                                            role="button">
                                    <span style={{color: 'white'}}>
                                        <Plus/>
                                    </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="gradient__text rC-p">Nie znaleziono wydarzenia.</p>
            )}
        </div>
    );
}
