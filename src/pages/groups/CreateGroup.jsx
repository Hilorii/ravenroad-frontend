import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import AnimatedBackground from '../../assets/AnimatedBackground/AnimatedBackground';
import Footer from '../../containers/footer/Footer';
import BackButton from '../../components/backBt/BackButton';
import './CreateGroup.css';

// Ikony do preferencji pojazdów
import {
    FaCar,
    FaTruck,
    FaMotorcycle,
    FaBicycle
} from 'react-icons/fa';

export default function CreateGroup() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    // Pola formularza
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    // Obsługa avatara grupy
    const [imageFile, setImageFile] = useState(null);

    // Obsługa bannera grupy
    const [bannerFile, setBannerFile] = useState(null);

    // Preferencje pojazdów – stan lokalny
    const [vehiclePreferences, setVehiclePreferences] = useState({
        car: false,
        truck: false,
        motorcycle: false,
        bike: false
    });

    // Funkcja do przełączania stanu preferencji
    const togglePreference = (prefKey) => {
        setVehiclePreferences((prev) => ({
            ...prev,
            [prefKey]: !prev[prefKey],
        }));
    };

    // Obsługa zatwierdzenia formularza
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();

            // Uzupełniamy dane formularza
            formData.append('name', name);
            formData.append('description', description);
            formData.append('private', isPrivate ? 1 : 0);
            formData.append('visible', isVisible ? 1 : 0);

            // Avatar grupy
            if (imageFile) {
                formData.append('image', imageFile);
            }

            // Banner grupy
            if (bannerFile) {
                formData.append('banner', bannerFile);
            }

            // Preferencje pojazdów
            formData.append('car', vehiclePreferences.car ? 1 : 0);
            formData.append('truck', vehiclePreferences.truck ? 1 : 0);
            formData.append('motorcycle', vehiclePreferences.motorcycle ? 1 : 0);
            formData.append('bike', vehiclePreferences.bike ? 1 : 0);

            // Wysyłamy żądanie POST do createGroup
            const response = await fetch('http://localhost:3000/createGroup', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    // Nie ustawiamy "Content-Type", bo używamy FormData
                },
                body: formData
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Błąd podczas tworzenia grupy');
            }

            // Jeśli wszystko OK, przenosimy użytkownika np. na listę grup:
            navigate(`/groups`);

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <AnimatedBackground />
            <Navbar />
            <BackButton />

            <div className="create-group-container">
                <h2 className="create-group-title">Utwórz nową grupę</h2>

                {error && (
                    <div
                        style={{
                            color: '#ff4d4d',
                            textAlign: 'center',
                            marginBottom: '1rem'
                        }}
                    >
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="create-group-form">
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

                    {/* Preferencje pojazdów */}
                    <div className="group-vehicle-preferences">
            <span className="group-vehicle-preferences-label">
              Preferencje pojazdów:
            </span>
                        <div className="group-vehicle-icons-row">
                            {/* Samochód */}
                            <div
                                className={`group-vehicle-icon ${
                                    vehiclePreferences.car ? 'selected' : ''
                                }`}
                                onClick={() => togglePreference('car')}
                            >
                                <FaCar className="group-pref-icon" />
                            </div>

                            {/* Ciężarówka */}
                            <div
                                className={`group-vehicle-icon ${
                                    vehiclePreferences.truck ? 'selected' : ''
                                }`}
                                onClick={() => togglePreference('truck')}
                            >
                                <FaTruck className="group-pref-icon" />
                            </div>

                            {/* Motocykl */}
                            <div
                                className={`group-vehicle-icon ${
                                    vehiclePreferences.motorcycle ? 'selected' : ''
                                }`}
                                onClick={() => togglePreference('motorcycle')}
                            >
                                <FaMotorcycle className="group-pref-icon" />
                            </div>

                            {/* Rower */}
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

                    <button type="submit" className="submit-button">
                        Utwórz grupę
                    </button>
                </form>
            </div>

            <Footer />
        </>
    );
}
