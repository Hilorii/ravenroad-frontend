import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import './routeDetails.css';
import { YStack, XStack } from 'tamagui';

const RouteDetailsPage = () => {
    const { id } = useParams(); // Pobiera id trasy z URL-a
    const [routeDetails, setRouteDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRouteDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/routes/${id}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error(`Błąd: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                console.log('Pobrane szczegóły trasy:', data); // Logowanie danych
                setRouteDetails(data);
            } catch (err) {
                console.error('Błąd podczas pobierania szczegółów trasy:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRouteDetails();
    }, [id]);

    if (loading) {
        return <div>Ładowanie...</div>;
    }

    if (error) {
        return <div>Błąd: {error}</div>;
    }

    if (!routeDetails) {
        return <div>Nie znaleziono szczegółów trasy.</div>;
    }

    // Renderowanie szczegółów trasy
    return (
        <div className="App">
            <div className="gradient__bg">
                <Navbar />
                <XStack justifyContent="center">
                    <YStack className="r-details-container" className="gradient__text">
                        <h2 className="r-details-container">Szczegóły trasy: {routeDetails.title}</h2>
                        <img
                            src={`http://localhost:5000/uploads/${routeDetails.image}`}
                            className="route-image"
                        />
                        <p><strong>ID:</strong> {routeDetails.id}</p>
                        <p><strong>Opis:</strong> {routeDetails.description}</p>
                        <p><strong>Długość:</strong> {routeDetails.length} km</p>
                        <p><strong>Data utworzenia:</strong> {new Date(routeDetails.created_at).toLocaleDateString()}
                        </p>
                    </YStack>
                </XStack>
            </div>
        </div>
    );
};

export default RouteDetailsPage;
