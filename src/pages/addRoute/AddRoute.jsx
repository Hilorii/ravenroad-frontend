import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from "../../components/navbar/Navbar";
import './addRoute.css';

export default function AddRoute() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [date, setDate] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0]; // Pobiera datę w formacie YYYY-MM-DD
        setDate(currentDate);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                <Navbar/>
                <form onSubmit={handleSubmit} className="add-route-form">
                    <div className="form-group">
                        <label htmlFor="title">Tytuł trasy:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Opis trasy:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
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
