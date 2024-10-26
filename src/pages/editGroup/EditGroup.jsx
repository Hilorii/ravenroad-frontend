import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from "../../components/navbar/Navbar";
import { useUser } from '../../contexts/UserContext';
import BackButton from '../../components/backBt/BackButton';

export default function EditGroup() {
    const navigate = useNavigate();
    const { id } = useParams(); // Pobiera id trasy z URL-a
    const [routeDetails, setRouteDetails] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState('Nie wybrano pliku');
    const [date, setDate] = useState('');
    const [error, setError] = useState({ name: '', description: '' });
    const { user, setUser } = useUser();
    const [isPrivate, setIsPrivate] = useState(false);

    // Pobierz szczegóły trasy na podstawie ID
    useEffect(() => {
        const fetchRouteDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/groups/${id}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error(`Błąd: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                console.log('Pobrane szczegóły grupy:', data);
                setRouteDetails(data);
            } catch (err) {
                console.error('Błąd podczas pobierania szczegółów grupy:', err);
                setError(err.message);
            }
        };

        fetchRouteDetails();
    }, [id]);

    // Ustawienie danych trasy w inputach po pobraniu
    useEffect(() => {
        if (routeDetails) {
            setName(routeDetails.name || '');
            setDescription(routeDetails.description || '');
            setIsPrivate(routeDetails.private === 1); // Ustawiamy checkbox na podstawie wartości private
        }
    }, [routeDetails]);

    // Ustawienie bieżącej daty
    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        setDate(currentDate);
    }, []);

    // Obsługa zmiany tytułu i walidacja
    const handleNameChange = (e) => {
        const value = e.target.value;
        if (value.length > 100) {
            setError({ ...error, name: 'Tytuł nie może przekraczać 100 znaków!' });
        } else {
            setError({ ...error, name: '' });
        }
        setName(value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setFileName(file.name);
        } else {
            setFileName('Nie wybrano pliku');
        }
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
        formData.append('private', isPrivate ? 1 : 0); 

        try {
            const response = await fetch(`http://localhost:5000/groups/${id}`, {
                method: 'PUT',
                credentials: 'include',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Błąd przy edycji grupy');
            }

            alert('Grupa została zaktualizowana pomyślnie!');
            navigate(`/profile/${user.username}`); // Przekierowanie po udanej aktualizacji
        } catch (error) {
            console.error('Error:', error);
            alert('Wystąpił problem podczas edycji grupy.');
        }
    };

    const handlePrivateChange = (e) => {
        setIsPrivate(e.target.checked);
    };

    return (
        <div className="App">
            <div className="gradient__bg">
                <Navbar/>
                <BackButton/>
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
                        <label htmlFor="name" className="form__label">Nazwa grupy:</label>
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
                        <label htmlFor="description" className="form__label">Opis grupy:</label>
                        {error.description && <p className="error-message">{error.description}</p>}
                    </div>
                    <div className="g-checkbox-field">
                        <input
                            type="checkbox"
                            id="private"
                            checked={isPrivate}
                            onChange={handlePrivateChange}
                        />
                        <label htmlFor="private" className="g-checkbox-label">Grupa prywatna</label>
                    </div>
                    <div className="e-image">
                        <div className="r-form-group">
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={handleImageChange}
                                accept="image/*"
                                hidden
                            />
                            <label className="r-input-label" htmlFor="image">Zdjęcie grupy</label>
                            <span id="file-chosen">{fileName}</span>
                        </div>
                    </div>
                    <button className="edit r-add-bt" role="button" type="submit">
                        <span className="text">Zaktualizuj grupę</span>
                    </button>
                </form>
            </div>
        </div>
    );
}
