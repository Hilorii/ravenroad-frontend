import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import AnimatedBackground from '../../assets/AnimatedBackground/AnimatedBackground';
import Footer from '../../containers/footer/Footer';
import './EditEvent.css';
import BackButton from '../../components/backBt/BackButton';

export default function EditEvent() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [event, setEvent] = useState(null);
    const [error, setError] = useState(null);

    // Pola formularza
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    // Obsługa avatara
    const [imageFile, setImageFile] = useState(null);
    const [oldImage, setOldImage] = useState(null);

    // Obsługa banera
    const [bannerFile, setBannerFile] = useState(null);
    const [oldBanner, setOldBanner] = useState(null);

    useEffect(() => {
        fetchEventDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Pobiera aktualne dane wydarzenia z backendu
    const fetchEventDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/events/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Błąd podczas pobierania szczegółów wydarzenia');
            }

            const data = await response.json();
            setEvent(data);

            // Uzupełniamy formularz danymi z bazy
            setName(data.name || '');
            setDescription(data.description || '');
            setIsPrivate(!!data.private);
            setIsVisible(!!data.visible);

            // Zapamiętujemy stare pliki (by usunąć je na serwerze, jeśli uploadujemy nowe)
            if (data.image) {
                setOldImage(data.image);
            }
            if (data.banner) {
                setOldBanner(data.banner);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    // Obsługa zatwierdzenia formularza
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();

            formData.append('name', name);
            formData.append('description', description);
            formData.append('private', isPrivate ? 1 : 0);
            formData.append('visible', isVisible ? 1 : 0);

            // Avatar
            if (imageFile) {
                formData.append('image', imageFile);
            }
            if (oldImage) {
                formData.append('oldImage', oldImage);
            }

            // Banner
            if (bannerFile) {
                formData.append('banner', bannerFile);
            }
            if (oldBanner) {
                formData.append('oldBanner', oldBanner);
            }

            const response = await fetch(`http://localhost:3000/events/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Błąd podczas aktualizacji wydarzenia');
            }

            // Po zapisie wracamy do widoku szczegółów wydarzenia
            navigate(`/eventDetails/${id}`);
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

    if (!event) {
        return (
            <>
                <AnimatedBackground />
                <Navbar />
                <h1 style={{ color: '#fff', textAlign: 'center', marginTop: '2rem' }}>
                    Ładowanie danych wydarzenia...
                </h1>
                <Footer />
            </>
        );
    }

    return (
        <>
            <AnimatedBackground />
            <Navbar />
            <BackButton/>
            <div className="edit-event-container">
                <h2 className="edit-event-title">Edytuj wydarzenie</h2>

                <form onSubmit={handleSubmit} className="edit-event-form">
                    <label htmlFor="event-name">Nazwa wydarzenia:</label>
                    <input
                        id="event-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <label htmlFor="event-description">Opis:</label>
                    <textarea
                        id="event-description"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <div className="checkbox-wrapper">
                        <input
                            id="private-checkbox"
                            type="checkbox"
                            checked={isPrivate}
                            onChange={(e) => setIsPrivate(e.target.checked)}
                        />
                        <label htmlFor="private-checkbox">Prywatne:</label>
                    </div>

                    <div className="checkbox-wrapper">
                        <input
                            id="visible-checkbox"
                            type="checkbox"
                            checked={isVisible}
                            onChange={(e) => setIsVisible(e.target.checked)}
                        />
                        <label htmlFor="visible-checkbox">Widoczne:</label>
                    </div>

                    <label htmlFor="event-image">Avatar wydarzenia:</label>
                    <input
                        id="event-image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                    />

                    <label htmlFor="event-banner">Baner wydarzenia:</label>
                    <input
                        id="event-banner"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setBannerFile(e.target.files[0])}
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
