import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/navbar/Navbar";
import './addRoute.css';

export default function AddRoute() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [date, setDate] = useState('');
    const [error, setError] = useState({ title: '', description: '' }); // State to hold error messages
    const navigate = useNavigate();

    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        setDate(currentDate);
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
                <form onSubmit={handleSubmit} className="add-route-form">
                    <div className="form-group">
                        <label htmlFor="title">Tytuł trasy:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={handleTitleChange}
                            maxLength={50}
                            required
                        />
                        {error.title && <p className="error-message">{error.title}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Opis trasy:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={handleDescriptionChange}
                            maxLength={1000}
                            required
                        />
                        {error.description && <p className="error-message">{error.description}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Zdjęcie trasy:</label>
                        <input
                            type="file"
                            id="image"
                            onChange={(e) => setImage(e.target.files[0])}
                            accept="image/*"
                        />
                    </div>
                    <button type="submit">Dodaj trasę</button>
                </form>
            </div>
        </div>
    );
}
