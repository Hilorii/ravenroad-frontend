import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from "../../components/navbar/Navbar";
import { useUser } from '../../contexts/UserContext';

export default function EditEvent() {
    const navigate = useNavigate();
    const { id } = useParams(); // Pobiera id trasy z URL-a
    const [eventDetails, setEventDetails] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [date, setDate] = useState('');
    const [error, setError] = useState({ name: '', description: '' });
    const { user, setUser } = useUser();
    // Pobierz szczegóły trasy na podstawie ID
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
                console.log('Pobrane szczegóły wydarzenia:', data);
                setEventDetails(data);
            } catch (err) {
                console.error('Błąd podczas pobierania szczegółów wydarzenia:', err);
                setError(err.message);
            }
        };

        fetchEventDetails();
    }, [id]);

    // Ustawienie danych trasy w inputach po pobraniu
    useEffect(() => {
        if (eventDetails) {
            setName(eventDetails.name || '');
            setDescription(eventDetails.description || '');
        }
    }, [eventDetails]);

    // Ustawienie bieżącej daty
    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        setDate(currentDate);
    }, []);

    // Obsługa zmiany tytułu i walidacja
    const handleNameChange = (e) => {
        const value = e.target.value;
        if (value.length > 100) {
            setError({ ...error, name: 'Nazwa nie może przekraczać 100 znaków!' });
        } else {
            setError({ ...error, name: '' });
        }
        setName(value);
    };

    // Obsługa zmiany opisu i walidacja
    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        if (value.length > 1000) {
            setError({ ...error, description: 'Opis nie może przekraczać 1000 znaków!' });
        } else {
            setError({ ...error, description: '' });
        }
        setDescription(value);
    };

    // Wysyłanie danych formularza do backendu
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (error.name || error.description) {
            alert('Proszę poprawić błędy przed wysłaniem formularza.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('image', image); // jeśli nie zmienisz zdjęcia, image będzie null
        formData.append('date', date);

        try {
            const response = await fetch(`http://localhost:5000/events/${id}`, {
                method: 'PUT', // Upewnij się, że metoda jest PUT
                credentials: 'include',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Błąd przy edycji wydarzenia');
            }

            alert('Wydarzenie została zaktualizowana pomyślnie!');
            navigate(`/profile/${user.username}`); // Przekierowanie po udanej aktualizacji
        } catch (error) {
            console.error('Error:', error);
            alert('Wystąpił problem podczas edycji wydarzenia.');
        }
    };

    return (
        <div className="App">
            <div className="gradient__bg">
                <Navbar />
                <form onSubmit={handleSubmit} className="add-route-form-main">
                    <div className="add-route-form field">
                        <input
                            placeholder=""
                            className="form__field"
                            type="text"
                            id="name"
                            value={name}
                            onChange={handleNameChange}
                            maxLength={50}
                            required
                        />
                        <label htmlFor="name" className="form__label">Nazwa wydarzenia:</label>
                        {error.name && <p className="error-message">{error.name}</p>}
                    </div>
                    <div className="add-route-text field">
                        <textarea
                            placeholder=""
                            className="r-desc form__field"
                            id="description"
                            value={description}
                            onChange={handleDescriptionChange}
                            maxLength={1000}
                            required
                        />
                        <label htmlFor="description" className="form__label">Opis wdyarzenia:</label>
                        {error.description && <p className="error-message">{error.description}</p>}
                    </div>
                    {/* W WYPADKU DODANIA ZDJĘĆ DO GRUP */}
                    {/*<div className="r-form-group">*/}
                    {/*    <input*/}
                    {/*        type="file"*/}
                    {/*        id="image"*/}
                    {/*        onChange={(e) => setImage(e.target.files[0])}*/}
                    {/*        accept="image/*"*/}
                    {/*        hidden*/}
                    {/*    />*/}
                    {/*    <label className="r-input-label" htmlFor="image">Zdjęcie grupy</label>*/}
                    {/*    <span id="file-chosen">Nie wybrano pliku</span>*/}
                    {/*</div>*/}
                    <button className="edit r-add-bt" role="button" type="submit">
                        <span className="text">Zaktualizuj wydarzenie</span>
                    </button>
                </form>
            </div>
        </div>
    );
}
