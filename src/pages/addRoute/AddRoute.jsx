import { useState } from 'react';
import { YStack, XStack } from 'tamagui';
import Navbar from "../../components/navbar/Navbar";
import './addRoute.css';

export default function AddRoute() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', image);

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
                            //required
                        />
                    </div>
                    <button type="submit">Dodaj trasę</button>
                </form>
            </div>
        </div>
    );
}
