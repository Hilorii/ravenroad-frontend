import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from "../../components/navbar/Navbar";
import BackButton from '../../components/backBt/BackButton';
import { useUser } from '../../contexts/UserContext';

export default function EditRoute() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [routeDetails, setRouteDetails] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState('Nie wybrano pliku'); 
    const [date, setDate] = useState('');
    const [error, setError] = useState({ title: '', description: '' });
    const [isPrivate, setIsPrivate] = useState(false);
    const { user } = useUser();
    
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
                setRouteDetails(data);
            } catch (err) {
                console.error('Błąd podczas pobierania szczegółów trasy:', err);
                setError(err.message);
            }
        };

        fetchRouteDetails();
    }, [id]);

    useEffect(() => {
        if (routeDetails) {
            setTitle(routeDetails.title || '');
            setDescription(routeDetails.description || '');
            setIsPrivate(routeDetails.private === 1);
        }
    }, [routeDetails]);

    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        setDate(currentDate);
    }, []);

    const handleTitleChange = (e) => {
        const value = e.target.value;
        if (value.length > 100) {
            setError({ ...error, title: 'Tytuł nie może przekraczać 100 znaków!' });
        } else {
            setError({ ...error, title: '' });
        }
        setTitle(value);
    };
    const handlePrivateChange = (e) => {
        setIsPrivate(e.target.checked);
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

    // Obsługa zmiany pliku
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setFileName(file.name); // Aktualizacja stanu z nazwą pliku
        } else {
            setFileName('Nie wybrano pliku');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (error.title || error.description) {
            alert('Proszę poprawić błędy przed wysłaniem formularza.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', image);
        formData.append('date', date);
        formData.append('private', isPrivate ? 1 : 0);

        try {
            const response = await fetch(`http://localhost:5000/routes/${id}`, {
                method: 'PUT',
                credentials: 'include',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Błąd przy edycji trasy');
            }

            alert('Trasa została zaktualizowana pomyślnie!');
            navigate(`/profile/${user.username}`);
        } catch (error) {
            console.error('Error:', error);
            alert('Wystąpił problem podczas edycji trasy.');
        }
    };

    return (
        <div className="App">
            <div className="gradient__bg">
                <Navbar />
                <BackButton/>
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
                    <div className="e-checkbox-field">
                        <input
                            type="checkbox"
                            id="private"
                            checked={isPrivate}
                            onChange={handlePrivateChange}
                        />
                        <label htmlFor="private" className="g-checkbox-label">Trasa prywatna</label>
                    </div>
                    <div className="r-form-group">
                        <input
                            type="file"
                            id="image"
                            onChange={handleImageChange}
                            accept="image/*"
                            hidden
                        />
                        <label className="r-input-label" htmlFor="image">Zdjęcie trasy</label>
                        <span id="file-chosen">{fileName}</span> {/* Wyświetlanie nazwy pliku */}
                    </div>
                    <button className="edit r-add-bt" role="button" type="submit">
                        <span className="text">Zaktualizuj trasę</span>
                    </button>
                </form>
            </div>
        </div>
    );
}
