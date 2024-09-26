import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { YStack, XStack } from 'tamagui';

const GroupDetailsPage = () => {
    const { id } = useParams(); // Pobiera id grupy z URL-a
    const [groupDetails, setGroupDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook do nawigacji

    useEffect(() => {
        const fetchGroupDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/groups/${id}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error(`Błąd: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                console.log('Pobrane szczegóły grupy:', data); // Logowanie danych
                setGroupDetails(data);
            } catch (err) {
                console.error('Błąd podczas pobierania szczegółów grupy:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGroupDetails();
    }, [id]);

    if (loading) {
        return <div>Ładowanie...</div>;
    }

    if (error) {
        return <div>Błąd: {error}</div>;
    }

    if (!groupDetails) {
        return <div>Nie znaleziono szczegółów grupy.</div>;
    }

    // Funkcja obsługująca przekierowanie do edycji trasy
    const handleEditClick = () => {
        navigate(`/editGroup/${id}`);
    };

    // Renderowanie szczegółów trasy
    return (
        <div className="App">
            <div className="gradient__bg">
                <Navbar />
                <div className="r-details-container">
                    <YStack className="">
                        <div className="r-details-container">
                            <h2>Trasa: {groupDetails.name}</h2>
                            {/*<img*/}
                            {/*    src={`http://localhost:5000/uploads/${groupDetails.image}`}*/}
                            {/*    className="routeD-image"*/}
                            {/*/>*/}
                            <p><strong>Opis:</strong> {groupDetails.description}</p>
                            {/*<p><strong>Data utworzenia: </strong>{groupDetails.add_date ? new Date(groupDetails.add_date).toLocaleDateString() : 'Brak daty'}</p>*/}
                            {/* Przycisk do edycji trasy */}
                            <button className="edit" onClick={handleEditClick} role="button" type="submit">
                                <span className="text">Edytuj grupę</span>
                            </button>
                        </div>
                    </YStack>
                </div>
            </div>
        </div>
    );
};

export default GroupDetailsPage;
