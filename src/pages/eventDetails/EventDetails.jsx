import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { YStack, XStack } from 'tamagui';
import BackButton from '../../components/backBt/BackButton';
import { useUser } from '../../contexts/UserContext';

const EventDetailsPage = () => {
    const { id } = useParams(); // Pobiera id wydarzenia z URL-a
    const [eventDetails, setEventDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook do nawigacji
    const { user } = useUser();
    const userId = user ? user.id : null;
    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/events/${id}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error(`Błąd: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                console.log('Pobrane szczegóły wydarzenia:', data); // Logowanie danych
                setEventDetails(data);
            } catch (err) {
                console.error('Błąd podczas pobierania szczegółów wydarzenia:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [id]);

    if (loading) {
        return <div>Ładowanie...</div>;
    }

    if (error) {
        return <div>Błąd: {error}</div>;
    }

    if (!eventDetails) {
        return <div>Nie znaleziono szczegółów wydarzenia.</div>;
    }

    // Funkcja obsługująca przekierowanie do edycji wydarzenia
    const handleEditClick = () => {
        navigate(`/editEvent/${id}`);
    };

    // Renderowanie szczegółów trasy
    return (
        <div className="App">
            <div className="gradient__bg">
                <Navbar />
                <BackButton/>
                <div className="r-details-container">
                    <YStack className="">
                        <div className="r-details-container">
                            <h2>Wydarzenie: {eventDetails.name}</h2>
                            {/*<img*/}
                            {/*    src={`http://localhost:5000/uploads/${groupDetails.image}`}*/}
                            {/*    className="routeD-image"*/}
                            {/*/>*/}
                            <p><strong>Opis:</strong> {eventDetails.description}</p>
                            {/*<p><strong>Data utworzenia: </strong>{groupDetails.add_date ? new Date(groupDetails.add_date).toLocaleDateString() : 'Brak daty'}</p>*/}
                            {/* Przycisk do edycji trasy */}
                            {String(eventDetails.created_by) === String(userId) && (
                                <button className="edit" onClick={handleEditClick} role="button" type="submit">
                                    <span className="text">Edytuj wydarzenie</span>
                                </button>
                            )}
                        </div>
                    </YStack>
                </div>
            </div>
        </div>
    );
};

export default EventDetailsPage;
