import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from "../../components/navbar/Navbar";
import { useUser } from '../../contexts/UserContext';
import BackButton from '../../components/backBt/BackButton';
import './addEvent.css';

export default function AddEvent() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState({ title: '', description: '', startDate: '', endDate: '', image: '' });
    const navigate = useNavigate();
    const { user, setUser } = useUser();
    const { username } = useParams();
    const [image, setImage] = useState(null);
    const [isPrivate, setIsPrivate] = useState(false);

    const getCurrentDateTime = () => {
        const now = new Date();
        return now.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
    };

    useEffect(() => {
        const actualBtn = document.getElementById('image');
        const fileChosen = document.getElementById('file-chosen');

        if (actualBtn && fileChosen) {
            actualBtn.addEventListener('change', function () {
                fileChosen.textContent = this.files[0]?.name || 'Nie wybrano pliku';
                setError((prevError) => ({ ...prevError, image: '' })); // Resetuje błąd obrazu po wyborze pliku
            });
        }

        return () => {
            if (actualBtn) {
                actualBtn.removeEventListener('change', function () {
                    fileChosen.textContent = 'Nie wybrano pliku';
                });
            }
        };
    }, []);

    const handleTitleChange = (e) => {
        const value = e.target.value;
        if (value.length > 100) {
            setError({ ...error, title: 'Nazwa nie może przekraczać 100 znaków!' });
        } else {
            setError({ ...error, title: '' });
        }
        setTitle(value);
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

    const handlePrivateChange = (e) => {
        setIsPrivate(e.target.checked);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Sprawdzanie pozostałych pól
        if (error.title || error.description || !startDate || !endDate) {
            alert('Proszę poprawić błędy przed wysłaniem formularza.');
            return;
        }

        // Walidacja daty
        if (new Date(startDate) < new Date()) {
            setError({ ...error, startDate: 'Data rozpoczęcia nie może być wcześniejsza niż aktualna data.' });
            return;
        }

        if (new Date(endDate) <= new Date(startDate)) {
            setError({ ...error, endDate: 'Data zakończenia nie może być wcześniejsza niż data rozpoczęcia.' });
            return;
        }
        // Przygotowanie formData
        const formData = new FormData();
        formData.append('name', title);
        formData.append('description', description);
        formData.append('startDate', startDate.split('T')[0]);
        formData.append('startTime', startDate.split('T')[1]);
        formData.append('endDate', endDate.split('T')[0]);
        formData.append('endTime', endDate.split('T')[1]);
        formData.append('private', isPrivate ? 1 : 0);
        if (image) formData.append('image', image);

        try {
            const response = await fetch('http://localhost:5000/createEvent', {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });

            if (!response.ok) throw new Error('Błąd przy dodawaniu wydarzenia');

            alert('Wydarzenie zostało dodane pomyślnie!');
            navigate(`/profile/${user.username}`);
        } catch (error) {
            console.error('Error:', error);
            alert('Wystąpił problem podczas dodawania wydarzenia.');
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
                            id="title"
                            value={title}
                            onChange={handleTitleChange}
                            maxLength={50}
                            required
                        />
                        <label htmlFor="title" className="form__label">Nazwa wydarzenia:</label>
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
                        <label htmlFor="description" className="form__label">Opis wydarzenia:</label>
                        {error.description && <p className="error-message">{error.description}</p>}
                    </div>
                    <div className="add-route-form field">
                        <label htmlFor="startDate" className="form__label">Data i godzina rozpoczęcia:</label>
                        <input
                            type="datetime-local"
                            id="startDate"
                            className="form__field"
                            value={startDate}
                            min={getCurrentDateTime()}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                        {error.startDate && <p className="error-message">{error.startDate}</p>}
                    </div>
                    <div className="add-route-form field">
                        <label htmlFor="endDate" className="form__label">Data i godzina zakończenia:</label>
                        <input
                            type="datetime-local"
                            id="endDate"
                            className="form__field"
                            value={endDate}
                            min={startDate || getCurrentDateTime()}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
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
                                onChange={(e) => setImage(e.target.files[0])}
                                accept="image/*"
                                hidden
                                name="imageName"
                            />
                            <label className="r-input-label" htmlFor="image">Zdjęcie wydarzenia</label>
                            <span id="file-chosen">Nie wybrano pliku</span>
                            {error.image && <p className="error-message e-image-error">{error.image}</p>}
                        </div>
                    </div>
                    <button className="edit r-add-bt" role="button" type="submit">
                        <span className="text">Dodaj wydarzenie</span>
                    </button>
                </form>
            </div>
        </div>
    );
}
