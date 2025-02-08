import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import AnimatedBackground from '../../assets/AnimatedBackground/AnimatedBackground';
import Footer from '../../containers/footer/Footer';
import BackButton from '../../components/backBt/BackButton';
import './EditEvent.css';

export default function EditEvent() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [event, setEvent] = useState(null);
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

    // Obsługa plików
    const [imageFile, setImageFile] = useState(null);
    const [oldImage, setOldImage] = useState(null);

    const [bannerFile, setBannerFile] = useState(null);
    const [oldBanner, setOldBanner] = useState(null);

    useEffect(() => {
        fetchEventDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

            // Przykładowo, jeśli backend zwraca klucze:
            // name, description, start_date, start_time, end_date, end_time, private, visible, image, banner
            setName(data.name || '');
            setDescription(data.description || '');

            // Formatowanie daty/godziny jeśli trzeba (np. "2023-10-05T22:00:00.000Z" -> "2023-10-05")
            const start_date_formatted = data.start_date
                ? data.start_date.substring(0, 10)
                : '';
            const end_date_formatted = data.end_date
                ? data.end_date.substring(0, 10)
                : '';

            const start_time_formatted = data.start_time
                ? data.start_time.substring(0, 5) // "HH:MM"
                : '';
            const end_time_formatted = data.end_time
                ? data.end_time.substring(0, 5)
                : '';

            setStartDate(start_date_formatted);
            setStartTime(start_time_formatted);
            setEndDate(end_date_formatted);
            setEndTime(end_time_formatted);

            // Pola prywatne i widoczne
            setIsPrivate(!!data.private);
            setIsVisible(!!data.visible);

            // Zapamiętujemy stare pliki
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();

            // Uzupełniamy FormData zgodnie z tym, co przyjmuje Twój endpoint PUT
            formData.append('name', name);
            formData.append('description', description);

            formData.append('startDate', startDate);
            formData.append('startTime', startTime);
            formData.append('endDate', endDate);
            formData.append('endTime', endTime);

            formData.append('private', isPrivate ? 1 : 0);
            formData.append('visible', isVisible ? 1 : 0);

            // Pliki
            if (imageFile) {
                formData.append('image', imageFile);
            }
            if (oldImage) {
                formData.append('oldImage', oldImage);
            }

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
                    // UWAGA: NIE ustawiamy tu Content-Type na multipart/form-data.
                    // fetch + FormData zrobi to automatycznie.
                },
                body: formData
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Błąd podczas aktualizacji wydarzenia');
            }

            navigate(`/events}`);
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
            <BackButton />
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
                        Zapisz zmiany
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}
