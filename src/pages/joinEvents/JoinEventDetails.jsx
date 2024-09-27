import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { YStack, XStack } from 'tamagui';
import BackButton from '../../components/backBt/BackButton';
import axios from 'axios';
import { useUser } from '../../contexts/UserContext';

const JoinEventDetailsPage = () => {
    const { id } = useParams(); // Pobiera id grupy z URL-a
    const [eventDetails, setEventDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook do nawigacji
    const { user } = useUser();
    const token = user ? user.token : null;

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

    const handleEventJoin = async (eventId) => {
        try {
            const response = await axios.post(`/joinEvent/${eventId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`  // Użycie tokena
                }
            });
            alert(response.data.message);  // Pomyślne dołączenie
            // Odświeżenie danych grupy po dołączeniu
            setEventDetails(prev => ({ ...prev, joined: true }));
        } catch (error) {
            console.error('Error joining event:', error);
            alert(error.response?.data?.error || 'Błąd podczas dołączania do wydarzenia');
        }
    };

    // Renderowanie szczegółów grupy
    return (
        <div className="App">
            <div className="gradient__bg">
                <Navbar />
                <BackButton/>
                <div className="r-details-container">
                    <YStack className="">
                        <div className="r-details-container">
                            <h2>Grupa: {eventDetails.name}</h2>
                            <p><strong>Opis:</strong> {eventDetails.description}</p>
                            <button className="edit" onClick={() => handleEventJoin(eventDetails.id)} role="button" type="submit">
                                <span className="text">Dołącz do wydarzenia!</span>
                            </button>
                        </div>
                    </YStack>
                </div>
            </div>
        </div>
    );
};

export default JoinEventDetailsPage;
