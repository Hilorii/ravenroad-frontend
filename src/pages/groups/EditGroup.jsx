import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import AnimatedBackground from '../../assets/AnimatedBackground/AnimatedBackground';
import Footer from '../../containers/footer/Footer';
import './EditGroup.css';

export default function EditGroup() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [group, setGroup] = useState(null);
    const [error, setError] = useState(null);

    // Pola formularza
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [imageFile, setImageFile] = useState(null);
    const [oldImage, setOldImage] = useState(null);

    useEffect(() => {
        fetchGroupDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchGroupDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/groups/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Błąd podczas pobierania szczegółów grupy');
            }

            const data = await response.json();
            setGroup(data);

            // Uzupełniamy formularz danymi z bazy
            setName(data.name || '');
            setDescription(data.description || '');
            setIsPrivate(!!data.private);
            setIsVisible(!!data.visible);
            setOldImage(data.image || null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();

            formData.append('name', name);
            formData.append('description', description);
            formData.append('private', isPrivate ? 1 : 0);
            formData.append('visible', isVisible ? 1 : 0);

            if (imageFile) {
                formData.append('image', imageFile);
            }
            if (oldImage) {
                // przekazujemy starą nazwę pliku, by serwer mógł ją ew. usunąć
                formData.append('oldImage', oldImage);
            }

            const response = await fetch(`http://localhost:3000/groups/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Błąd podczas aktualizacji grupy');
            }

            // Powrót do strony szczegółów po pomyślnej aktualizacji
            navigate(`/groupDetails/${id}`);
        } catch (err) {
            setError(err.message);
        }
    };

    if (error) {
        return (
            <>
                <AnimatedBackground />
                <Navbar />
                <h1 style={{ color: '#fff', textAlign: 'center', marginTop: '2rem' }}>
                    {error}
                </h1>
                <Footer />
            </>
        );
    }

    if (!group) {
        return (
            <>
                <AnimatedBackground />
                <Navbar />
                <h1 style={{ color: '#fff', textAlign: 'center', marginTop: '2rem' }}>
                    Ładowanie danych grupy...
                </h1>
                <Footer />
            </>
        );
    }

    return (
        <>
            <AnimatedBackground />
            <Navbar />

            <div className="edit-group-container">
                <h2 className="edit-group-title">Edytuj grupę</h2>

                <form onSubmit={handleSubmit} className="edit-group-form">
                    <label htmlFor="group-name">Nazwa grupy:</label>
                    <input
                        id="group-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <label htmlFor="group-description">Opis:</label>
                    <textarea
                        id="group-description"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <div className="checkbox-wrapper">
                        <label htmlFor="private-checkbox">Prywatna:</label>
                        <input
                            id="private-checkbox"
                            type="checkbox"
                            checked={isPrivate}
                            onChange={(e) => setIsPrivate(e.target.checked)}
                        />
                    </div>

                    <div className="checkbox-wrapper">
                        <label htmlFor="visible-checkbox">Widoczna:</label>
                        <input
                            id="visible-checkbox"
                            type="checkbox"
                            checked={isVisible}
                            onChange={(e) => setIsVisible(e.target.checked)}
                        />
                    </div>

                    <label htmlFor="group-image">Avatar grupy (zmień jeśli chcesz):</label>
                    <input
                        id="group-image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                    />

                    <button type="submit" className="submit-button">
                        Zapisz zmiany
                    </button>
                </form>
            </div>

            <Footer />
        </>
    );
}
