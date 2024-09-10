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
                <div className="r-details-container">
                    <YStack className="">
                        <div className="r-details-container">
                            <h2>Trasa: {routeDetails.title}</h2>
                            <img
                                src={`http://localhost:5000/uploads/${routeDetails.image}`}
                                className="routeD-image"
                            />
                            <p><strong>Opis:</strong> {routeDetails.description}</p>
                            <p><strong>Data
                                utworzenia: </strong>{routeDetails.add_date ? new Date(routeDetails.add_date).toLocaleDateString() : 'Brak daty'}
                            </p>
                        </div>
                    </YStack>
                </div>
            </div>
        </div>
    );
};

export default RouteDetailsPage;
