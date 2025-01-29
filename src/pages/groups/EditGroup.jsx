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

    // Obsługa avatara grupy
    const [imageFile, setImageFile] = useState(null);
    const [oldImage, setOldImage] = useState(null);

    // Obsługa bannera grupy
    const [bannerFile, setBannerFile] = useState(null);
    const [oldBanner, setOldBanner] = useState(null);

    useEffect(() => {
        fetchGroupDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Pobiera aktualne dane grupy z backendu
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

            // Avatar grupy
            if (imageFile) {
                formData.append('image', imageFile);
            }
            if (oldImage) {
                formData.append('oldImage', oldImage);
            }

            // Banner grupy
            if (bannerFile) {
                formData.append('banner', bannerFile);
            }
            if (oldBanner) {
                formData.append('oldBanner', oldBanner);
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
                        <input
                            id="private-checkbox"
                            type="checkbox"
                            checked={isPrivate}
                            onChange={(e) => setIsPrivate(e.target.checked)}
                        />
                        <label htmlFor="private-checkbox">Prywatna:</label>
                    </div>

                    <div className="checkbox-wrapper">
                        <input
                            id="visible-checkbox"
                            type="checkbox"
                            checked={isVisible}
                            onChange={(e) => setIsVisible(e.target.checked)}
                        />
                        <label htmlFor="visible-checkbox">Widoczna:</label>
                    </div>

                    <label htmlFor="group-image">Avatar grupy:</label>
                    <input
                        id="group-image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                    />

                    <label htmlFor="group-banner">Banner grupy:</label>
                    <input
                        id="group-banner"
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
