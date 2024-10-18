import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './routes.css';
import '../profile/profile.css';

export default function RoutesContainer() {
    const [routes, setRoutes] = useState([]);
    const [filteredRoutes, setFilteredRoutes] = useState([]);
    const [sortOrder, setSortOrder] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);  // Dodany stan dla ładowania
    const navigate = useNavigate();

    useEffect(() => {
        // Pobranie tras zalogowanego użytkownika
        axios.get('http://localhost:5000/routes', { withCredentials: true })
            .then(response => {
                console.log(response.data);
                setRoutes(response.data);
                setFilteredRoutes(response.data);  // Domyślnie wyświetlamy wszystkie trasy
            })
            .catch(error => {
                console.error("Błąd podczas pobierania tras:", error);
            })
            .finally(() => {
                setLoading(false);  // Ładowanie zakończone
            });
    }, []);

    // Pozostała logika pozostaje bez zmian
    const handleDelete = async (routeId) => { /* ... */ };
    const handleSortAndFilter = () => { /* ... */ };
    const handleToggleFavourite = async (routeId, currentFavouriteStatus) => { /* ... */ };

    // Zaktualizuj listę tras po zmianie kryteriów sortowania lub wyszukiwania
    useEffect(() => {
        handleSortAndFilter();
    }, [searchQuery, sortOrder]);

    return (
        <div className="rC-container">
            <div className="r-filters">
                <input
                    className="rC-input"
                    type="text"
                    placeholder="Szukaj tras..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select className="rC-select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="asc">Od najstarszych</option>
                    <option value="desc">Od najnowszych</option>
                </select>
            </div>

            {loading ? (
                <p>Ładowanie tras...</p>  // Spinner lub tekst w trakcie ładowania
            ) : filteredRoutes.length > 0 ? (
                filteredRoutes.map((route) => (
                    <div key={route.id} className="route-card">
                        <div className="rC-inside">
                            <img
                                src={`http://localhost:5000/uploads/${route.image}`}
                                alt={route.title}
                                className="route-image"
                            />
                            <h2>{route.title}</h2>
                            <button
                                className={`r-favourite-btn ${route.favourite ? 'gold-star' : 'empty-star'}`}
                                onClick={() => handleToggleFavourite(route.id, route.favourite)}
                            >
                                ★
                            </button>
                            <p className="route-date">{route.add_date ? new Date(route.add_date).toLocaleDateString() : 'Brak daty'}</p>

                            <div className="r-button-container">
                                <button onClick={() => navigate(`/routeDetails/${route.id}`)} className="edit full-button" role="button">
                                    <span>Szczegóły</span>
                                </button>
                                <button onClick={() => handleDelete(route.id)} className="edit full-button" role="button">
                                    <span>Usuń</span>
                                </button>
                                <button onClick={() => navigate(`/routeDetails/${route.id}`)} className="icon-button-details" role="button">
                                    <span>❓</span>
                                </button>
                                <button onClick={() => handleDelete(route.id)} className="icon-button-delete" role="button">
                                    <span>🗑️</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="gradient__text rC-p">Nie znaleziono trasy.</p>
            )}
        </div>
    );
}
