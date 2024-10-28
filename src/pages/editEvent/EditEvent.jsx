import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from "../../components/navbar/Navbar";
import { useUser } from '../../contexts/UserContext';
import BackButton from '../../components/backBt/BackButton';

export default function EditEvent() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [eventDetails, setEventDetails] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState('Nie wybrano pliku');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState({ name: '', description: '', startDate: '', endDate: '' });
    const { user } = useUser();
    const [isPrivate, setIsPrivate] = useState(false);

    // Pobierz szczegóły wydarzenia
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
                setEventDetails(data);
            } catch (err) {
                console.error('Błąd podczas pobierania szczegółów wydarzenia:', err);
                setError(err.message);
            }
        };

        fetchEventDetails();
    }, [id]);

    // Ustawienie danych wydarzenia po pobraniu
    useEffect(() => {
        if (eventDetails) {
            console.log('Dane wydarzenia:', eventDetails);

            const { start_date, start_time, end_date, end_time, name, description } = eventDetails;

            // Funkcja do formatowania daty i godziny
            const formatDateTime = (date, time) => {
                if (!date || !time) return ''; // Sprawdzamy, czy obie wartości istnieją

                // Zwracamy datę w formacie RRRR-MM-DDTHH:MM
                return `${date.split('T')[0]}T${time.slice(0, 5)}`;
            };

            setStartDate(formatDateTime(start_date, start_time));
            setEndDate(formatDateTime(end_date, end_time));
            setIsPrivate(eventDetails.private === 1);
            setName(name || '');
            setDescription(description || '');
        }
    }, [eventDetails]);
    
    // Walidacja dat
    const validateDates = (startDate, endDate) => {
        const currentDate = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);
        let hasError = false;

        // Sprawdź, czy data rozpoczęcia nie jest w przeszłości
        if (start < currentDate) {
            setError((prevError) => ({
                ...prevError,
                startDate: 'Data rozpoczęcia nie może być wcześniejsza niż aktualna.',
            }));
            hasError = true;
        } else {
            setError((prevError) => ({
                ...prevError,
                startDate: '',
            }));
        }

        // Sprawdź, czy data zakończenia nie jest wcześniejsza niż data rozpoczęcia
        if (end < start) {
            setError((prevError) => ({
                ...prevError,
                endDate: 'Data zakończenia nie może być wcześniejsza niż data rozpoczęcia.',
            }));
            hasError = true;
        } else {
            setError((prevError) => ({
                ...prevError,
                endDate: '',
            }));
        }

        return !hasError;
    };


    const handleNameChange = (e) => {
        const value = e.target.value;
        if (value.length > 100) {
            setError({ ...error, name: 'Nazwa nie może przekraczać 100 znaków!' });
        } else {
            setError({ ...error, name: '' });
        }
        setName(value);
    };

    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        if (value.length > 1000) {
            setError({ ...error, description: 'Opis nie może przekraczać 1000 znaków!' });
        } else {
            setError({ ...error, description: '' });
        }
        setDescription(value);
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
    const handlePrivateChange = (e) => {
        setIsPrivate(e.target.checked);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (error.name || error.description || error.startDate || error.endDate || !validateDates()) {
            alert('Proszę poprawić błędy przed wysłaniem formularza.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('image', image);
        formData.append('startDate', startDate.split('T')[0]);
        formData.append('startTime', startDate.split('T')[1]);
        formData.append('endDate', endDate.split('T')[0]);
        formData.append('endTime', endDate.split('T')[1]);
        formData.append('private', isPrivate ? 1 : 0);

        try {
            const response = await fetch(`http://localhost:5000/events/${id}`, {
                method: 'PUT',
                credentials: 'include',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Błąd przy edycji wydarzenia');
            }

            alert('Wydarzenie zostało zaktualizowane pomyślnie!');
            navigate(`/profile/${user.username}`);
        } catch (error) {
            console.error('Error:', error);
            alert('Wystąpił problem podczas edycji wydarzenia.');
        }
    };

    return (
        <div className="App">
            <div className="gradient__bg">
                <Navbar />
                <BackButton />
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
                    />
                        <label htmlFor="description" className="form__label">Opis wydarzenia:</label>
                        {error.description && <p className="error-message">{error.description}</p>}
                    </div>

                    <div className="add-route-form field">
                        <label htmlFor="startDate" className="form__label">Data i godzina rozpoczęcia:</label>
                        <input
                            type="datetime-local"
                            id="startDate"
                            className="form__field"
                            value={startDate || ''} // Pusty string jeśli brak danych
                            onChange={(e) => {
                                const value = e.target.value;
                                setStartDate(value);
                                validateDates(value, endDate);
                            }}
                        />
                        {error.startDate && <p className="error-message">{error.startDate}</p>}
                    </div>

                    <div className="add-route-form field">
                        <label htmlFor="endDate" className="form__label">Data i godzina zakończenia:</label>
                        <input
                            type="datetime-local"
                            id="endDate"
                            className="form__field"
                            value={endDate || ''} // Pusty string jeśli brak danych
                            onChange={(e) => {
                                const value = e.target.value;
                                setEndDate(value);
                                validateDates(startDate, value);
                            }}
                        />
                        {error.endDate && <p className="error-message">{error.endDate}</p>}
                    </div>
                    <div className="e-checkbox-field">
                        <input
                            type="checkbox"
                            id="private"
                            checked={isPrivate}
                            onChange={handlePrivateChange}
                        />
                        <label htmlFor="private" className="g-checkbox-label">Wydarzenie prywatne</label>
                    </div>
                    <div className="e-image">
                        <div className="r-form-group">
                            <input
                                type="file"
                                id="image"
                                onChange={handleImageChange}
                                accept="image/*"
                                hidden
                            />
                            <label className="r-input-label" htmlFor="image">Zdjęcie wydarzenia</label>
                            <span id="file-chosen">{fileName}</span>
                        </div>
                    </div>

                    <button className="edit r-add-bt" role="button" type="submit">
                        <span className="text">Zaktualizuj wydarzenie</span>
                    </button>
                </form>
            </div>
        </div>
    );
}
