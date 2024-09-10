import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RoutesContainer() {
    const [routes, setRoutes] = useState([]);
    const [filteredRoutes, setFilteredRoutes] = useState([]);
    const [sortOrder, setSortOrder] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Pobranie tras zalogowanego użytkownika
        axios.get('http://localhost:5000/readyRoutes', { withCredentials: true })
            .then(response => {
                console.log(response.data);
                setRoutes(response.data);
                setFilteredRoutes(response.data);  // Domyślnie wyświetlamy wszystkie trasy
            })
            .catch(error => {
                console.error("Błąd podczas pobierania tras:", error);
            });
    }, []);

    // Obsługa sortowania i wyszukiwania tras
    const handleSortAndFilter = () => {
        let sortedAndFilteredRoutes = routes.filter(route =>
            route.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (sortOrder) {
            sortedAndFilteredRoutes = sortedAndFilteredRoutes.sort((a, b) => {
                const dateA = new Date(a.add_date);
                const dateB = new Date(b.add_date);

                // Sprawdzamy, czy daty są poprawnie przekształcone
                if (isNaN(dateA) || isNaN(dateB)) {
                    return 0;
                }

                return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
            });
        }

        setFilteredRoutes(sortedAndFilteredRoutes);
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

            {filteredRoutes.length > 0 ? (
                filteredRoutes.map((route) => (
                    <div key={route.id} className="route-card">
                        <img
                            src={`http://localhost:5000/uploads/${route.image}`}
                            alt={route.title}
                            className="route-image"
                        />
                        <h2>{route.title}</h2>
                        <p>{route.add_date ? new Date(route.add_date).toLocaleDateString() : 'Brak daty'}</p>

                        <div className="r-button-container">
                            <button onClick={() => navigate(`/routeDetails/${route.id}`)} className="edit" role="button">
                                <span>Szczegóły</span>
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="gradient__text rC-p">Nie znaleziono trasy.</p>
            )}
        </div>
    );
}
