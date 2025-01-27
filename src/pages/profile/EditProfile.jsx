import React, { useState } from 'react';
import { FaChevronDown, FaCar, FaTruck, FaMotorcycle, FaBicycle } from 'react-icons/fa';
import "./EditProfile.css";

const EditProfile = ({ userId, initialUsername, onProfileUpdated, initialEmail }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Pola formularza
    const [username, setUsername] = useState(initialUsername || '');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState(initialEmail || '');

    // Preferencje pojazdów
    const [car, setCar] = useState(false);
    const [truck, setTruck] = useState(false);
    const [motorcycle, setMotorcycle] = useState(false);
    const [bike, setBike] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    // Zmiana stanu (np. car = !car)
    const handleCarToggle = () => setCar(!car);
    const handleTruckToggle = () => setTruck(!truck);
    const handleMotorcycleToggle = () => setMotorcycle(!motorcycle);
    const handleBikeToggle = () => setBike(!bike);

    // Obsługa wysłania formularza
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Walidacja prostych przypadków na froncie
        if (newPassword && newPassword !== confirmPassword) {
            alert('Nowe hasło i potwierdzenie hasła nie są takie same!');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/user/${userId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    oldPassword,
                    newPassword,
                    email,
                    car: car ? 1 : 0,
                    truck: truck ? 1 : 0,
                    motorcycle: motorcycle ? 1 : 0,
                    bike: bike ? 1 : 0,
                }),
            });

            if (!response.ok) {
                throw new Error('Błąd przy zapisie zmian profilu.');
            }

            const data = await response.json();

            // Możesz odświeżyć dane profilowe w nadrzędnym komponencie (np. ProfilePage)
            if (onProfileUpdated) {
                onProfileUpdated(data.user);
            }

            // Opcjonalnie zamknij formularz
            setIsOpen(false);

            // Wyczyść pola haseł
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            window.location.reload();
        } catch (err) {
            console.error('Error:', err);
            alert('Wystąpił błąd podczas zapisywania zmian.');
        }
    };

    return (
        <div className="edit-profile-container">
            {/* Pasek nagłówka do rozwijania */}
            <div className="edit-profile-header" onClick={toggleOpen}>
                <div className="edit-profile-title">Edytuj profil</div>
                <FaChevronDown
                    className={`edit-profile-arrow ${isOpen ? 'open' : ''}`}
                />
            </div>

            {/* Sekcja formularza (rozwijana) */}
            <div
                className="edit-profile-form-wrapper"
                style={{ maxHeight: isOpen ? '500px' : '0px' }}
            >
                <form className="edit-profile-form" onSubmit={handleSubmit}>
                    <div className="field">
                        <label>Nazwa użytkownika</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Nowa nazwa użytkownika"
                        />
                    </div>

                    <div className="field">
                        <label>Aktualne hasło</label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder="Wpisz stare hasło"
                        />
                    </div>

                    <div className="field">
                        <label>Nowe hasło</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Nowe hasło"
                        />
                    </div>

                    <div className="field">
                        <label>Potwierdź nowe hasło</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Powtórz nowe hasło"
                        />
                    </div>

                    <div className="preferences">
                        <label>Preferencje pojazdów:</label>
                        <div className="preferences-row">
                            <div
                                className={`pref-icon ${car ? 'active' : ''}`}
                                onClick={handleCarToggle}
                            >
                                <FaCar />
                            </div>
                            <div
                                className={`pref-icon ${truck ? 'active' : ''}`}
                                onClick={handleTruckToggle}
                            >
                                <FaTruck />
                            </div>
                            <div
                                className={`pref-icon ${motorcycle ? 'active' : ''}`}
                                onClick={handleMotorcycleToggle}
                            >
                                <FaMotorcycle />
                            </div>
                            <div
                                className={`pref-icon ${bike ? 'active' : ''}`}
                                onClick={handleBikeToggle}
                            >
                                <FaBicycle />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="save-button">
                        Zapisz zmiany
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
