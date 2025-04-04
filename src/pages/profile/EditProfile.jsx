import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaCar, FaTruck, FaMotorcycle, FaBicycle } from 'react-icons/fa';
import { useAlerts } from '../../contexts/AlertsContext';
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

    // Preferencje pojazdów
    const [car, setCar] = useState(false);
    const [truck, setTruck] = useState(false);
    const [motorcycle, setMotorcycle] = useState(false);
    const [bike, setBike] = useState(false);

    // Obsługa komunikatów błędów
    const [formError, setFormError] = useState('');

    // --------------------------
    // Kontekst alertów
    // --------------------------
    const { addAlert } = useAlerts();

    // --------------------------
    // 1) Pobierz preferencje z bazy
    // --------------------------
    useEffect(() => {
        const fetchPreferences = async () => {
            if (!userId) return;

            try {
                const res = await fetch(`http://localhost:5000/user/${userId}/preferences`, {
                    method: 'GET',
                    credentials: 'include'
                });

                if (!res.ok) {
                    console.error('Failed to fetch user preferences');
                    return;
                }

                const data = await res.json();
                // data ma postać { car: 0, truck: 1, motorcycle: 0, bike: 0 } itp.
                setCar(data.car === 1);
                setTruck(data.truck === 1);
                setMotorcycle(data.motorcycle === 1);
                setBike(data.bike === 1);
            } catch (err) {
                console.error('Error fetching preferences:', err);
            }
        };

        fetchPreferences();
    }, [userId]);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setFormError('');
        }
    };

    const handleCarToggle = () => setCar(!car);
    const handleTruckToggle = () => setTruck(!truck);
    const handleMotorcycleToggle = () => setMotorcycle(!motorcycle);
    const handleBikeToggle = () => setBike(!bike);

    // --------------------------
    // 2) Zapisywanie całego profilu
    // --------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');

        // Walidacja prosta
        if (!userId) {
            setFormError('Brak userId - nie można zapisać zmian.');
            return;
        }

        try {
            // a) Najpierw aktualizujemy dane profilu
            const profileUpdateBody = { username, email };

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

            // b) Jeśli hasła wypełnione, zmieniamy hasło w endpointcie PUT /user/:id/password
            if (oldPassword || newPassword || confirmPassword) {
                if (!oldPassword || !newPassword || !confirmPassword) {
                    setFormError('Aby zmienić hasło, wypełnij wszystkie pola!');
                    return;
                }
                if (newPassword !== confirmPassword) {
                    setFormError('Hasła nie są takie same!');
                    return;
                }

                const passwordBody = { oldPassword, newPassword, confirmPassword };

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

            // c) Na koniec aktualizujemy preferencje w /user/:id/preferences
            const preferencesBody = {
                car: car ? 1 : 0,
                truck: truck ? 1 : 0,
                motorcycle: motorcycle ? 1 : 0,
                bike: bike ? 1 : 0
            };

            const prefRes = await fetch(`http://localhost:5000/user/${userId}/preferences`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(preferencesBody),
            });

            if (!prefRes.ok) {
                const prefError = await prefRes.json();
                setFormError(prefError?.message || 'Błąd przy zapisie preferencji.');
                return;
            }

            // Jeśli wszystkie operacje się udały:
            const updatedProfile = await profileRes.json();

            // *** Tutaj wywołujemy globalny alert: ***
            addAlert("Zmiany zostały zapisane!", "success");

            // Wywołaj callback do odświeżenia w rodzicu, jeśli jest
            if (onProfileUpdated) {
                onProfileUpdated(updatedProfile.user);
            }

            // Wyczyść pola haseł
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');

            // Opcjonalnie odśwież stronę, by zaktualizować np. Navbar:
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
                    {/* Błąd nad formularzem */}
                    {formError && <div className="form-error">{formError}</div>}

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

                    {/* Preferencje pojazdów */}
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
