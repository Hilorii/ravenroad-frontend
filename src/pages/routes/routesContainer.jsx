import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './routes.css';

export default function RoutesContainer() {
    const [routes, setRoutes] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        // Pobranie tras zalogowanego użytkownika
        axios.get('http://localhost:5000/routes', { withCredentials: true })
            .then(response => {
                console.log(response.data);
                // Sortowanie tras od najnowszej do najstarszej
                const sortedRoutes = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setRoutes(sortedRoutes);
            })
            .catch(error => {
                console.error("Błąd podczas pobierania tras:", error);
            });
    }, []);

    const handleDelete = async (routeId) => {
        console.log("Deleting route with ID:", routeId); // Logowanie ID przed usunięciem

        // Show a confirmation dialog before deleting
        const confirmDelete = window.confirm('Czy na pewno chcesz usunąć tę trasę?'); // Confirmation message

        // If the user clicks "Cancel", exit the function
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
            // Opcjonalnie: odśwież listę tras po usunięciu
            setRoutes(routes.filter(route => route.id !== routeId));
        } catch (error) {
            console.error('Error:', error);
            alert('Wystąpił problem podczas usuwania trasy.');
        }
    };




    console.log(routes);
    return (
        <div className="rC-container">
            {routes.map((route) => (
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

                        <button onClick={() => handleDelete(route.id)} className="edit" role="button">
                            <span>Usuń</span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
