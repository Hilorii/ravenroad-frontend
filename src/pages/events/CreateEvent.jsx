import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import AnimatedBackground from '../../assets/AnimatedBackground/AnimatedBackground';
import Footer from '../../containers/footer/Footer';
import BackButton from '../../components/backBt/BackButton';
import './CreateEvent.css';

export default function CreateEvent() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    // Pola formularza:
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');

    const [isPrivate, setIsPrivate] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    // Obsługa plików (avatar, banner)
    const [imageFile, setImageFile] = useState(null);
    const [bannerFile, setBannerFile] = useState(null);

    // Obsługa wysyłania formularza
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();

            // Uzupełniamy FormData:
            formData.append('name', name);
            formData.append('description', description);

            formData.append('startDate', startDate);
            formData.append('startTime', startTime);
            formData.append('endDate', endDate);
            formData.append('endTime', endTime);

            formData.append('private', isPrivate ? 1 : 0);
            formData.append('visible', isVisible ? 1 : 0);

            // Pliki (jeśli zostały wybrane)
            if (imageFile) {
                formData.append('image', imageFile);
            }
            if (bannerFile) {
                formData.append('banner', bannerFile);
            }

            // Wywołanie endpointu POST /createEvent
            const response = await fetch('http://localhost:3000/createEvent', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                    // Uwaga: nie ustawiamy Content-Type na multipart/form-data – zrobi to za nas FormData.
                },
                body: formData
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Błąd podczas tworzenia wydarzenia');
            }

            // Zakładamy, że serwer zwraca utworzony obiekt wydarzenia (w tym np. jego ID).
            const createdEvent = await response.json();

            // Po pomyślnym utworzeniu wydarzenia możemy przekierować np. do szczegółów tego wydarzenia:
            navigate(`/events`);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <AnimatedBackground />
            <Navbar />
            <BackButton />

            <div className="create-event-container">
                <h2 className="create-event-title">Utwórz nowe wydarzenie</h2>

                {error && (
                    <div className="create-event-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="create-event-form">
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

                    <label htmlFor="startDate">Data rozpoczęcia:</label>
                    <input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />

                    <label htmlFor="startTime">Godzina rozpoczęcia:</label>
                    <input
                        id="startTime"
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />

                    <label htmlFor="endDate">Data zakończenia:</label>
                    <input
                        id="endDate"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />

                    <label htmlFor="endTime">Godzina zakończenia:</label>
                    <input
                        id="endTime"
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
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
                        Utwórz wydarzenie
                    </button>
                </form>
            </div>

            <Footer />
        </>
    );
}
