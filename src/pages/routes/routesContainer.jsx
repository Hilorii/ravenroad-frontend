import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './routes.css';
import '../profile/profile.css';
import { Details, Trash } from '../../components/icons';

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
    const handleDelete = async (routeId) => {
        console.log("Deleting route with ID:", routeId);
        const confirmDelete = window.confirm('Czy na pewno chcesz usunąć tę trasę?');
        if (!confirmDelete) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:5000/routes/${routeId}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Błąd podczas usuwania trasy');
            }
            alert('Trasa została usunięta pomyślnie!');
            const updatedRoutes = routes.filter(route => route.id !== routeId);
            setRoutes(updatedRoutes);
            setFilteredRoutes(updatedRoutes);
        } catch (error) {
            console.error('Error:', error);
            alert('Wystąpił problem podczas usuwania trasy.');
        }
    };
    // Obsługa sortowania i wyszukiwania tras
    const handleSortAndFilter = () => {
        let sortedAndFilteredRoutes = routes.filter(route =>
            route.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        // Najpierw sortowanie po statusie ulubionych tras (ulubione na górze)
        sortedAndFilteredRoutes = sortedAndFilteredRoutes.sort((a, b) => b.favourite - a.favourite);
        // Sortowanie według daty dodania, jeśli wybrano opcję
        if (sortOrder) {
            sortedAndFilteredRoutes = sortedAndFilteredRoutes.sort((a, b) => {
                const dateA = new Date(a.add_date);
                const dateB = new Date(b.add_date);
                if (isNaN(dateA) || isNaN(dateB)) {
                    return 0;
                }
                return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
            });
        }
        setFilteredRoutes(sortedAndFilteredRoutes);
    };
    const handleToggleFavourite = async (routeId, currentFavouriteStatus) => {
        console.log('Zmiana ulubionego statusu dla trasy ID:', routeId, 'Obecny status:', currentFavouriteStatus);
        try {
            const response = await fetch(`http://localhost:5000/routes/${routeId}/favourite`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ favourite: !currentFavouriteStatus }) // Przesyłamy odwrócony stan
            });
            if (!response.ok) throw new Error('Błąd podczas zmiany statusu ulubionej trasy');
            console.log('Odpowiedź serwera:', response.status);
            // Lokalna zmiana statusu ulubionej trasy
            const updatedRoutes = routes.map(route =>
                route.id === routeId ? { ...route, favourite: !currentFavouriteStatus } : route
            );
            // Zaktualizowanie tras i posortowanie tak, aby ulubione były na górze
            const sortedRoutes = updatedRoutes.sort((a, b) => b.favourite - a.favourite);
            setRoutes(sortedRoutes);
            setFilteredRoutes(sortedRoutes);
        } catch (error) {
            console.error('Error:', error);
            alert('Wystąpił problem podczas zmiany statusu ulubionej trasy.');
        }
    };

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
                <p></p>
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
                                    <span style={{color: 'white'}}>
                                        <Details/>
                                    </span>
                                </button>
                                <button onClick={() => handleDelete(route.id)} className="icon-button-delete" role="button">
                                    <span style={{color: 'white'}}>
                                        <Trash/>
                                    </span>
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
