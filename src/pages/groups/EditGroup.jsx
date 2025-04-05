import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import AnimatedBackground from '../../assets/AnimatedBackground/AnimatedBackground';
import Footer from '../../containers/footer/Footer';
import './EditGroup.css';
import BackButton from '../../components/backBt/BackButton';

// Ikony
import {
    FaCar,
    FaTruck,
    FaMotorcycle,
    FaBicycle
} from 'react-icons/fa';

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

    // Preferencje pojazdów
    const [vehiclePreferences, setVehiclePreferences] = useState({
        car: false,
        truck: false,
        motorcycle: false,
        bike: false
    });

    // 1. Pobierz dane grupy
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
                throw new Error(
                    errData.error || 'Błąd podczas pobierania szczegółów grupy'
                );
            }

            const data = await response.json();
            setGroup(data);

            // Ustawiamy wartości do formularza
            setName(data.name || '');
            setDescription(data.description || '');
            setIsPrivate(!!data.private);
            setIsVisible(!!data.visible);

            if (data.image) setOldImage(data.image);
            if (data.banner) setOldBanner(data.banner);

            // Preferencje pojazdów
            if (data.vehiclePreferences) {
                setVehiclePreferences({
                    car: data.vehiclePreferences.car == 1,
                    truck: data.vehiclePreferences.truck == 1,
                    motorcycle: data.vehiclePreferences.motorcycle == 1,
                    bike: data.vehiclePreferences.bike == 1
                });
            }
        } catch (err) {
            setError(err.message);
        }
    };

    // 2. Obsługa zatwierdzenia formularza (PUT /groups/:id)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();

            formData.append('name', name);
            formData.append('description', description);
            formData.append('private', isPrivate ? 1 : 0);
            formData.append('visible', isVisible ? 1 : 0);

            // Jeśli użytkownik wgrał nowy avatar
            if (imageFile) {
                formData.append('image', imageFile);
            }
            // Stary plik (by usunąć na serwerze)
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

            // Preferencje pojazdów
            formData.append('car', vehiclePreferences.car ? 1 : 0);
            formData.append('truck', vehiclePreferences.truck ? 1 : 0);
            formData.append('motorcycle', vehiclePreferences.motorcycle ? 1 : 0);
            formData.append('bike', vehiclePreferences.bike ? 1 : 0);

            const response = await fetch(`http://localhost:3000/groups/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(
                    errData.error || 'Błąd podczas aktualizacji grupy'
                );
            }

            // Po pomyślnym zapisie – na /groups z flagą "groupEdited: true"
            navigate('/groups', {
                state: { groupEdited: true }
            });

        } catch (err) {
            setError(err.message);
        }
    };

    // 3. Przełączanie preferencji pojazdów
    const togglePreference = (prefKey) => {
        setVehiclePreferences((prev) => ({
            ...prev,
            [prefKey]: !prev[prefKey],
        }));
    };

    // 4. Obsługa błędów / oczekiwanie
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

    // 5. Render formularza
    return (
        <>
            <AnimatedBackground />
            <Navbar />
            <BackButton />

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
                        maxLength={1000}
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

                    <div className="group-vehicle-preferences">
                        <span className="group-vehicle-preferences-label">
                            Preferencje pojazdów:
                        </span>
                        <div className="group-vehicle-icons-row">
                            <div
                                className={`group-vehicle-icon ${
                                    vehiclePreferences.car ? 'selected' : ''
                                }`}
                                onClick={() => togglePreference('car')}
                            >
                                <FaCar className="group-pref-icon" />
                            </div>
                            <div
                                className={`group-vehicle-icon ${
                                    vehiclePreferences.truck ? 'selected' : ''
                                }`}
                                onClick={() => togglePreference('truck')}
                            >
                                <FaTruck className="group-pref-icon" />
                            </div>
                            <div
                                className={`group-vehicle-icon ${
                                    vehiclePreferences.motorcycle ? 'selected' : ''
                                }`}
                                onClick={() => togglePreference('motorcycle')}
                            >
                                <FaMotorcycle className="group-pref-icon" />
                            </div>
                            <div
                                className={`group-vehicle-icon ${
                                    vehiclePreferences.bike ? 'selected' : ''
                                }`}
                                onClick={() => togglePreference('bike')}
                            >
                                <FaBicycle className="group-pref-icon" />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="group-submit-button">
                        Zapisz zmiany
                    </button>
                </form>
            </div>

            <Footer />
        </>
    );
}
