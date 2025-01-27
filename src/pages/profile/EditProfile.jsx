import React, { useState } from 'react';
import { FaChevronDown, FaCar, FaTruck, FaMotorcycle, FaBicycle } from 'react-icons/fa';
import "./EditProfile.css";

const EditProfile = ({ userId, initialUsername, onProfileUpdated, initialEmail }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Pola formularza
    const [username, setUsername] = useState(initialUsername || '');
    const [email, setEmail] = useState(initialEmail || '');
    // Hasła (tylko do nowego endpointu)
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Preferencje pojazdów (do starego endpointu PUT /user/:id)
    const [car, setCar] = useState(false);
    const [truck, setTruck] = useState(false);
    const [motorcycle, setMotorcycle] = useState(false);
    const [bike, setBike] = useState(false);

    // Obsługa komunikatów błędów
    const [formError, setFormError] = useState('');
    // Obsługa komunikatu sukcesu
    const [successMessage, setSuccessMessage] = useState('');

    const toggleOpen = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setFormError('');
            setSuccessMessage('');
        }
    };

    const handleCarToggle = () => setCar(!car);
    const handleTruckToggle = () => setTruck(!truck);
    const handleMotorcycleToggle = () => setMotorcycle(!motorcycle);
    const handleBikeToggle = () => setBike(!bike);

    // Obsługa wysłania formularza
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        setSuccessMessage('');

        try {
            // 1. Najpierw zaktualizujmy dane profilu (username, email, preferencje) starym endpointem
            const profileUpdateBody = {
                username,
                email,
                car: car ? 1 : 0,
                truck: truck ? 1 : 0,
                motorcycle: motorcycle ? 1 : 0,
                bike: bike ? 1 : 0,
            };

            const profileRes = await fetch(`http://localhost:5000/user/${userId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileUpdateBody),
            });

            if (!profileRes.ok) {
                const errorData = await profileRes.json();
                setFormError(errorData?.message || 'Błąd przy zapisie danych profilu.');
                return;
            }

            // 2. Jeśli użytkownik wypełnił pola hasła, zróbmy odrębny fetch do /user/:id/password
            if (oldPassword || newPassword || confirmPassword) {
                // Walidacja front-endowa
                if (!oldPassword || !newPassword || !confirmPassword) {
                    setFormError('Aby zmienić hasło, wypełnij wszystkie pola!');
                    return;
                }
                if (newPassword !== confirmPassword) {
                    setFormError('Hasła nie są takie same!');
                    return;
                }

                const passwordBody = {
                    oldPassword,
                    newPassword,
                    confirmPassword
                };

                const passRes = await fetch(`http://localhost:5000/user/${userId}/password`, {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(passwordBody),
                });

                if (!passRes.ok) {
                    const passError = await passRes.json();
                    setFormError(passError?.message || 'Błąd przy zmianie hasła.');
                    return;
                }
            }

            // Jeśli obie operacje się udały:
            const data = await profileRes.json();
            setSuccessMessage('Zmiany zostały zapisane!');

            // Wywołaj callback do odświeżenia w rodzicu, jeśli jest
            if (onProfileUpdated) {
                onProfileUpdated(data.user);
            }

            // Wyczyść pola haseł
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');

            // W tym miejscu przeładowujemy stronę (aby np. Navbar też się odświeżył)
            window.location.reload();

        } catch (err) {
            console.error('Error:', err);
            setFormError('Wystąpił nieoczekiwany błąd podczas zapisywania zmian.');
        }
    };

    return (
        <div className="edit-profile-container">
            {/* Pasek nagłówka do rozwijania */}
            <div className="edit-profile-header" onClick={toggleOpen}>
                <div className="edit-profile-title">Edytuj profil</div>
                <FaChevronDown className={`edit-profile-arrow ${isOpen ? 'open' : ''}`} />
            </div>

            {/* Sekcja formularza (rozwijana) */}
            <div
                className="edit-profile-form-wrapper"
                style={{ maxHeight: isOpen ? '650px' : '0px' }}
            >
                <form className="edit-profile-form" onSubmit={handleSubmit}>
                    {/* Błąd lub sukces nad formularzem */}
                    {formError && <div className="form-error">{formError}</div>}
                    {successMessage && <div className="form-success">{successMessage}</div>}

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
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nowy adres email"
                        />
                    </div>

                    {/* Zmiana hasła */}
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
                            placeholder="Potwierdź nowe hasło"
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
