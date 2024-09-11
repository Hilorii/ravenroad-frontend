import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from "../../components/navbar/Navbar";

export default function EditRoute() {
    const navigate = useNavigate();
    const { id } = useParams(); // Pobiera id trasy z URL-a
    const [routeDetails, setRouteDetails] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [date, setDate] = useState('');
    const [error, setError] = useState({ title: '', description: '' });

    // Pobierz szczegóły trasy na podstawie ID
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
                console.log('Pobrane szczegóły trasy:', data);
                setRouteDetails(data);
            } catch (err) {
                console.error('Błąd podczas pobierania szczegółów trasy:', err);
                setError(err.message);
            }
        };

        fetchRouteDetails();
    }, [id]);

    // Ustawienie danych trasy w inputach po pobraniu
    useEffect(() => {
        if (routeDetails) {
            setTitle(routeDetails.title || '');
            setDescription(routeDetails.description || '');
        }
    }, [routeDetails]);

    // Ustawienie bieżącej daty
    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        setDate(currentDate);
    }, []);

    // Obsługa zmiany tytułu i walidacja
    const handleTitleChange = (e) => {
        const value = e.target.value;
        if (value.length > 100) {
            setError({ ...error, title: 'Tytuł nie może przekraczać 100 znaków!' });
        } else {
            setError({ ...error, title: '' });
        }
        setTitle(value);
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

        if (error.title || error.description) {
            alert('Proszę poprawić błędy przed wysłaniem formularza.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', image); // jeśli nie zmienisz zdjęcia, image będzie null
        formData.append('date', date);

        try {
            const response = await fetch(`http://localhost:5000/routes/${id}`, {
                method: 'PUT', // Upewnij się, że metoda jest PUT
                credentials: 'include',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Błąd przy edycji trasy');
            }

            alert('Trasa została zaktualizowana pomyślnie!');
            navigate('/routes'); // Przekierowanie po udanej aktualizacji
        } catch (error) {
            console.error('Error:', error);
            alert('Wystąpił problem podczas edycji trasy.');
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
                            id="title"
                            value={title}
                            onChange={handleTitleChange}
                            maxLength={50}
                            required
                        />
                        <label htmlFor="title" className="form__label">Tytuł trasy:</label>
                        {error.title && <p className="error-message">{error.title}</p>}
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
                        <label htmlFor="description" className="form__label">Opis trasy:</label>
                        {error.description && <p className="error-message">{error.description}</p>}
                    </div>
                    <div className="r-form-group">
                        <input
                            type="file"
                            id="image"
                            onChange={(e) => setImage(e.target.files[0])}
                            accept="image/*"
                            hidden
                        />
                        <label className="r-input-label" htmlFor="image">Zdjęcie trasy</label>
                        <span id="file-chosen">Nie wybrano pliku</span>
                    </div>
                    <button className="edit r-add-bt" role="button" type="submit">
                        <span className="text">Zaktualizuj trasę</span>
                    </button>
                </form>
            </div>
        </div>
    );
}
