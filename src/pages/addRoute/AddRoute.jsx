import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/navbar/Navbar";
import './addRoute.css';

export default function AddRoute() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [date, setDate] = useState('');
    const [error, setError] = useState({ title: '', description: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        setDate(currentDate);
    }, []);

    useEffect(() => {
        const actualBtn = document.getElementById('image');
        const fileChosen = document.getElementById('file-chosen');

        // Check if elements exist before adding event listeners
        if (actualBtn && fileChosen) {
            actualBtn.addEventListener('change', function () {
                fileChosen.textContent = this.files[0]?.name || 'Nie wybrano pliku';
            });
        }

        // Clean up the event listener when the component unmounts
        return () => {
            if (actualBtn) {
                actualBtn.removeEventListener('change', function () {
                    fileChosen.textContent = 'Nie wybrano pliku';
                });
            }
        };
    }, []);

    // Handle title change with validation
    const handleTitleChange = (e) => {
        const value = e.target.value;
        if (value.length > 100) {
            setError({ ...error, title: 'Tytuł nie może przekraczać 100 znaków!' });
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

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', image);
        formData.append('date', date);

        try {
            const response = await fetch('http://localhost:5000/addRoute', {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Błąd przy dodawaniu trasy');
            }

            alert('Trasa została dodana pomyślnie!');
            navigate('/routes');
        } catch (error) {
            console.error('Error:', error);
            alert('Wystąpił problem podczas dodawania trasy.');
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
                            required
                            hidden
                        />
                        <label className="r-input-label" htmlFor="image">Zdjęcie trasy</label>
                        <span id="file-chosen">Nie wybrano pliku</span>
                    </div>
                    <button className="edit r-add-bt" role="button" type="submit">
                        <span className="text">Dodaj trasę</span>
                    </button>
                </form>
            </div>
        </div>
    );
}
