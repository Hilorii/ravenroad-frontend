import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from "../../components/navbar/Navbar";
import { useUser } from '../../contexts/UserContext';
import BackButton from '../../components/backBt/BackButton';

export default function AddEvent() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState({ title: '', description: '' });
    const navigate = useNavigate();
    const { user, setUser } = useUser();
    const { username } = useParams();
    console.log(username);
    // Handle title change with validation
    const handleTitleChange = (e) => {
        const value = e.target.value;
        if (value.length > 100) {
            setError({ ...error, title: 'Nazwa nie może przekraczać 100 znaków!' });
        } else {
            setError({ ...error, title: '' });
        }
        setTitle(value);
    };

    // Handle description change with validation
    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        if (value.length > 1000) {
            setError({ ...error, description: 'Opis nie może przekraczać 1000 znaków!' });
        } else {
            setError({ ...error, description: '' });
        }
        setDescription(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (error.title || error.description) {
            alert('Proszę poprawić błędy przed wysłaniem formularza.');
            return;
        }

        // Przygotowanie danych do wysłania
        const data = {
            name: title,
            description: description,
        };

        try {
            const response = await fetch('http://localhost:5000/createEvent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Błąd przy dodawaniu wydarzenia');
            }

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
                    <button className="edit r-add-bt" role="button" type="submit">
                        <span className="text">Dodaj wydarzenie</span>
                    </button>
                </form>
            </div>
        </div>
    );
}
