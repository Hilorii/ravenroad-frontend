import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import AnimatedBackground from '../../assets/AnimatedBackground/AnimatedBackground';
import Footer from '../../containers/footer/Footer';
import './EditGroup.css';
import BackButton from '../../components/backBt/BackButton';

// Ikony z react-icons
import {
    FaChevronDown,
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

    // Preferencje pojazdów – stan lokalny
    const [vehiclePreferences, setVehiclePreferences] = useState({
        car: false,
        truck: false,
        motorcycle: false,
        bike: false
    });

    // -----------------------------------------------------------
    //  1. Pobieranie danych grupy
    // -----------------------------------------------------------
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

            // Zapamiętujemy stare pliki (by usunąć je na serwerze, jeśli uploadujemy nowe)
            if (data.image) {
                setOldImage(data.image);
            }
            if (data.banner) {
                setOldBanner(data.banner);
            }

            // Jeżeli w odpowiedzi są preferencje pojazdów, to ustawiamy je w stanie:
            if (data.vehiclePreferences) {
                setVehiclePreferences({
                    // UWAGA: używamy "== 1", bo z bazy może przychodzić string '1'
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

    // -----------------------------------------------------------
    //  2. Obsługa zatwierdzenia formularza (PUT /groups/:id)
    // -----------------------------------------------------------
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
                throw new Error(errData.message || 'Błąd podczas aktualizacji grupy');
            }

            navigate(`/groups`);
        } catch (err) {
            setError(err.message);
        }
    };

    // -----------------------------------------------------------
    //  3. Przełączanie preferencji pojazdów (on/off)
    // -----------------------------------------------------------
    const togglePreference = (prefKey) => {
        setVehiclePreferences((prev) => ({
            ...prev,
            [prefKey]: !prev[prefKey],
        }));
    };

    // -----------------------------------------------------------
    //  4. Render – obsługa błędów lub oczekiwanie na dane
    // -----------------------------------------------------------
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

    // -----------------------------------------------------------
    //  5. Render – formularz edycji grupy
    // -----------------------------------------------------------
    return (
        <>
            <AnimatedBackground />
            <Navbar />
            <BackButton />
            <div className="edit-group-container">
                <h2 className="edit-group-title">Edytuj grupę</h2>

                <form onSubmit={handleSubmit} className="edit-group-form">
                    {/* Nazwa */}
                    <label htmlFor="group-name">Nazwa grupy:</label>
                    <input
                        id="group-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    {/* Opis */}
                    <label htmlFor="group-description">Opis:</label>
                    <textarea
                        id="group-description"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={1000}
                    />

                    {/* Prywatna */}
                    <div className="checkbox-wrapper">
                        <input
                            id="private-checkbox"
                            type="checkbox"
                            checked={isPrivate}
                            onChange={(e) => setIsPrivate(e.target.checked)}
                        />
                        <label htmlFor="private-checkbox">Prywatna:</label>
                    </div>

                    {/* Widoczna */}
                    <div className="checkbox-wrapper">
                        <input
                            id="visible-checkbox"
                            type="checkbox"
                            checked={isVisible}
                            onChange={(e) => setIsVisible(e.target.checked)}
                        />
                        <label htmlFor="visible-checkbox">Widoczna:</label>
                    </div>

                    {/* Avatar grupy */}
                    <label htmlFor="group-image">Avatar grupy:</label>
                    <input
                        id="group-image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                    />

                    {/* Banner grupy */}
                    <label htmlFor="group-banner">Banner grupy:</label>
                    <input
                        id="group-banner"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setBannerFile(e.target.files[0])}
                    />

                    {/* Preferencje pojazdów */}
                    <div className="group-vehicle-preferences">
                        <span className="group-vehicle-preferences-label">Preferencje pojazdów:</span>
                        <div className="group-vehicle-icons-row">
                            {/* Samochód */}
                            <div
                                className={`group-vehicle-icon ${vehiclePreferences.car ? 'selected' : ''}`}
                                onClick={() => togglePreference('car')}
                            >
                                <FaCar className="group-pref-icon" />
                            </div>
                            {/* Ciężarówka */}
                            <div
                                className={`group-vehicle-icon ${vehiclePreferences.truck ? 'selected' : ''}`}
                                onClick={() => togglePreference('truck')}
                            >
                                <FaTruck className="group-pref-icon" />
                            </div>
                            {/* Motocykl */}
                            <div
                                className={`group-vehicle-icon ${vehiclePreferences.motorcycle ? 'selected' : ''}`}
                                onClick={() => togglePreference('motorcycle')}
                            >
                                <FaMotorcycle className="group-pref-icon" />
                            </div>
                            {/* Rower */}
                            <div
                                className={`group-vehicle-icon ${vehiclePreferences.bike ? 'selected' : ''}`}
                                onClick={() => togglePreference('bike')}
                            >
                                <FaBicycle className="group-pref-icon" />
                            </div>
                        </div>
                    </div>

                    {/* Przycisk zapisu */}
                    <button type="submit" className="group-submit-button">
                        Zapisz zmiany
                    </button>
                </form>
            </div>

            <Footer />
        </>
    );
}
