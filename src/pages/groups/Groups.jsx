import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { useAlerts } from '../../contexts/AlertsContext'; // <--- IMPORT KONTEKSTU ALERTÓW
import Navbar from "../../components/navbar/Navbar";
import './Groups.css';
import AnimatedBackground from '../../assets/AnimatedBackground/AnimatedBackground';
import Footer from '../../containers/footer/Footer';
import SquaresGroup from '../../components/linkSquares/LinkSquaresGroups';

import {
    FaEdit,
    FaInfoCircle,
    FaSignOutAlt,
    FaPlus,
    FaCrown,
    FaTrash
} from 'react-icons/fa';

export default function Groups() {
    const { user } = useUser();
    const navigate = useNavigate();

    // Podpinamy KONTEKST ALERTÓW:
    const { addAlert } = useAlerts();

    // Stany związane z grupami
    const [userGroups, setUserGroups] = useState([]);
    const [proposedGroups, setProposedGroups] = useState([]);

    // Stany związane z wyszukiwarką (grupy)
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [searchError, setSearchError] = useState(null);

    // **Stany do modali usuwania oraz opuszczania grupy**
    const [groupIdToDelete, setGroupIdToDelete] = useState(null);

    // Stan do zwykłego opuszczenia grupy (jeśli nie jesteś właścicielem)
    const [groupIdToLeave, setGroupIdToLeave] = useState(null);

    // Stany do opuszczenia grupy przez właściciela
    const [ownerGroupIdToLeave, setOwnerGroupIdToLeave] = useState(null);
    const [groupMembers, setGroupMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [memberSearchTerm, setMemberSearchTerm] = useState('');
    const [selectedNewAdminId, setSelectedNewAdminId] = useState(null);

    // -------------------------------------------------------------------------
    //                        USE EFFECTS
    // -------------------------------------------------------------------------
    useEffect(() => {
        fetchUserGroups();
        fetchProposedGroups();
    }, []);

    // Reset komunikatu o błędzie wyszukiwania (grup) po 5 sekundach
    useEffect(() => {
        if (searchError) {
            const timer = setTimeout(() => {
                setSearchError(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [searchError]);

    // Gdy zmienia się "memberSearchTerm", od razu filtrujemy "groupMembers"
    useEffect(() => {
        if (!memberSearchTerm.trim()) {
            setFilteredMembers(groupMembers);
        } else {
            const lowerTerm = memberSearchTerm.toLowerCase();
            const filtered = groupMembers.filter((member) =>
                member.username.toLowerCase().includes(lowerTerm)
            );
            setFilteredMembers(filtered);
        }
    }, [memberSearchTerm, groupMembers]);

    // --------------------------------------------------------------------------
    //                            POBIERANIE GRUP
    // --------------------------------------------------------------------------
    const fetchUserGroups = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/groups', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                if (response.status === 404) {
                    setUserGroups([]);
                    return;
                }
                throw new Error('Błąd podczas pobierania Twoich grup');
            }

            const data = await response.json();
            setUserGroups(data);
        } catch (err) {
            console.error(err.message);
            setUserGroups([]);
        }
    };

    const fetchProposedGroups = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/proposedGroups', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                if (response.status === 404) {
                    setProposedGroups([]);
                    return;
                }
                throw new Error('Błąd podczas pobierania proponowanych grup.');
            }

            const data = await response.json();
            setProposedGroups(data);
        } catch (err) {
            console.error(err.message);
            setProposedGroups([]);
        }
    };

    // --------------------------------------------------------------------------
    //                           OBŁUGA GRUP (CRUD)
    // --------------------------------------------------------------------------
    // Edycja grupy
    const handleEditGroup = (groupId) => {
        navigate(`/editGroup/${groupId}`);
    };

    // Detale grupy
    const handleViewDetails = (groupId) => {
        navigate(`/groupDetails/${groupId}`);
    };

    // ----------------------------------------------------------------------------
    //        OPUSZCZANIE GRUPY
    // ----------------------------------------------------------------------------
    const confirmLeaveGroup = async (groupId, createdBy) => {
        // Jeśli zalogowany użytkownik jest właścicielem
        if (user && createdBy === user.id) {
            // Otwieramy modal do wyboru nowego admina
            setOwnerGroupIdToLeave(groupId);
            // Pobierz listę członków tej grupy
            fetchGroupMembers(groupId);
        } else {
            // W przeciwnym wypadku – otwieramy modal potwierdzający wyjście
            setGroupIdToLeave(groupId);
        }
    };

    // Zwykłe wyjście z grupy (dla nie-właściciela)
    const handleConfirmLeave = async () => {
        if (!groupIdToLeave) return;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/leaveGroup/${groupIdToLeave}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Błąd podczas opuszczania grupy');
            }

            // Usuwamy grupę z listy userGroups
            setUserGroups((prev) => prev.filter((group) => group.id !== groupIdToLeave));

            // ALERT: Opuszczenie grupy
            addAlert('Opuszczono grupę', 'success');
        } catch (err) {
            console.error(err.message);
        } finally {
            // Zamykamy modal
            setGroupIdToLeave(null);
        }
    };

    const handleCancelLeave = () => {
        setGroupIdToLeave(null);
    };

    // Opuszczanie grupy jako właściciel – pobieranie listy członków
    const fetchGroupMembers = async (groupId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/group/${groupId}/members/ownership`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Błąd podczas pobierania członków grupy');
            }

            const data = await response.json();

            // Odfiltruj z listy zalogowanego usera (właściciela)
            const filteredOwner = data.filter(
                (member) => member.username !== user?.username
            );

            setGroupMembers(filteredOwner);
            setFilteredMembers(filteredOwner);
        } catch (err) {
            console.error(err);
        }
    };

    // Zmiana właściciela i opuszczenie grupy w jednym kroku
    const handleTransferOwnership = async () => {
        if (!ownerGroupIdToLeave || !selectedNewAdminId) return;

        try {
            const token = localStorage.getItem('token');

            console.log('Próba przeniesienia własności grupy:', {
                groupId: ownerGroupIdToLeave,
                newAdminId: selectedNewAdminId
            });

            const response = await fetch(
                `http://localhost:3000/group/${ownerGroupIdToLeave}/transferOwnership`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        newAdminId: selectedNewAdminId,
                    }),
                }
            );

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Błąd przy przenoszeniu własności grupy');
            }

            // Usuwamy tę grupę z local state
            setUserGroups((prev) => prev.filter((group) => group.id !== ownerGroupIdToLeave));

            // ALERT: Właściciel też „opuszcza” grupę
            addAlert('Opuszczono grupę', 'success');
        } catch (err) {
            console.error('Błąd przenoszenia własności:', err);
        } finally {
            // Zamykamy modal i resetujemy stany
            setOwnerGroupIdToLeave(null);
            setGroupMembers([]);
            setFilteredMembers([]);
            setMemberSearchTerm('');
            setSelectedNewAdminId(null);
        }
    };

    const handleCancelLeaveAsOwner = () => {
        setOwnerGroupIdToLeave(null);
        setGroupMembers([]);
        setFilteredMembers([]);
        setMemberSearchTerm('');
        setSelectedNewAdminId(null);
    };

    // ----------------------------------------------------------------------------
    //        DOŁĄCZANIE GRUPY
    // ----------------------------------------------------------------------------
    const handleJoinGroup = async (groupId, isPrivate) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/joinGroup/${groupId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Błąd podczas dołączania do grupy');
            }

            // Po dołączeniu odświeżamy listy
            fetchUserGroups();
            fetchProposedGroups();

            // Wyświetlamy ALERT w zależności od rodzaju grupy
            if (isPrivate === 1) {
                addAlert('Wysłano prośbę o dołączenie', 'success');
            } else {
                addAlert('Dołączono do grupy', 'success');
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    // ----------------------------------------------------------------------------
    //        USUWANIE GRUPY (z modalem potwierdzenia)
    // ----------------------------------------------------------------------------
    const confirmDeleteGroup = (groupId) => {
        setGroupIdToDelete(groupId);
    };

    const handleConfirmDelete = async () => {
        if (!groupIdToDelete) return;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/deleteGroup/${groupIdToDelete}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Błąd podczas usuwania grupy');
            }

            // Usuwamy grupę z listy userGroups
            setUserGroups((prev) => prev.filter((group) => group.id !== groupIdToDelete));

            // ALERT: Usunięcie grupy
            addAlert('Usunięto grupę', 'success');

        } catch (err) {
            console.error(err.message);
        } finally {
            setGroupIdToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setGroupIdToDelete(null);
    };

    // ----------------------------------------------------------------------------
    //        NAWIGACJA
    // ----------------------------------------------------------------------------
    const handleNavigateToRoutes = () => {
        navigate('/routes');
    };

    const handleNavigateToEvents = () => {
        navigate('/events');
    };

    // ----------------------------------------------------------------------------
    //        WYSZUKIWANIE GRUP (górne pole w komponencie)
    // ----------------------------------------------------------------------------
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            return;
        }
        try {
            const token = localStorage.getItem('token');
            setSearchError(null);

            const response = await fetch(
                `http://localhost:3000/searchGroups?query=${encodeURIComponent(searchQuery)}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Błąd podczas wyszukiwania grup');
            }

            const data = await response.json();
            setSearchResults(data);
        } catch (err) {
            setSearchError(err.message);
            setSearchResults([]);
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults(null);
        setSearchError(null);
    };

    // ----------------------------------------------------------------------------
    //        RENDER
    // ----------------------------------------------------------------------------
    return (
        <div>
            <AnimatedBackground />
            <Navbar />

            {/* Title Section with TRASY - GRUPY - EVENTY */}
            <div className="title-container">
                <h2 className="title-item no-glow" onClick={handleNavigateToRoutes}>
                    TRASY
                </h2>
                <h1 className="groups-title">GRUPY</h1>
                <h2 className="title-item no-glow" onClick={handleNavigateToEvents}>
                    EVENTS
                </h2>
            </div>

            {/* Pasek wyszukiwania (grupy) */}
            <div className="search-container">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Wyszukaj grupę..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-button">
                        Szukaj
                    </button>
                </form>
            </div>

            {/* Sekcja wyników wyszukiwania */}
            {searchResults !== null && (
                <div className="groups-wrapper">
                    <div className="groups-box search-results-box">
                        <div className="search-results-header">
                            <h2 className="groups-box-title">WYNIKI WYSZUKIWANIA</h2>
                            <button
                                className="clear-search-button"
                                onClick={clearSearch}
                            >
                                Wyczyść wyszukiwanie
                            </button>
                        </div>
                        <div className="groups-list">
                            {searchError ? (
                                <p className="error-message">{searchError}</p>
                            ) : searchResults.length > 0 ? (
                                searchResults.map((group) => (
                                    <div key={group.id} className="group-item">
                                        <img
                                            src={`http://localhost:5000/uploads/${group.image}`}
                                            alt={group.name}
                                            className="group-avatar"
                                        />
                                        <span className="group-name">{group.name}</span>
                                        <div className="group-actions">
                                            <FaInfoCircle
                                                className="group-icon"
                                                title="Detale grupy"
                                                onClick={() => handleViewDetails(group.id)}
                                            />
                                            <FaPlus
                                                className="group-icon"
                                                title="Dołącz do grupy"
                                                onClick={() => handleJoinGroup(group.id, group.private)}
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="error-message">Brak wyników wyszukiwania.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="groups-wrapper">
                {/* TWOJE GRUPY */}
                <div className="groups-box">
                    <h2 className="groups-box-title">TWOJE GRUPY</h2>
                    <div className="groups-list">
                        {userGroups.length === 0 ? (
                            <p className="no-groups-message">Brak Twoich grup.</p>
                        ) : (
                            userGroups.map((group) => (
                                <div key={group.id} className="group-item">
                                    {user && group.created_by === user.id && (
                                        <FaCrown className="group-crown" />
                                    )}
                                    <img
                                        src={`http://localhost:5000/uploads/${group.image}`}
                                        alt={group.name}
                                        className="group-avatar"
                                    />
                                    <span className="group-name">{group.name}</span>
                                    <div className="group-actions">
                                        {user && group.created_by === user.id && (
                                            <>
                                                <FaEdit
                                                    className="group-icon"
                                                    title="Edytuj grupę"
                                                    onClick={() => handleEditGroup(group.id)}
                                                />
                                                <FaTrash
                                                    className="group-icon"
                                                    title="Usuń grupę"
                                                    onClick={() => confirmDeleteGroup(group.id)}
                                                />
                                            </>
                                        )}
                                        <FaInfoCircle
                                            className="group-icon"
                                            title="Detale grupy"
                                            onClick={() => handleViewDetails(group.id)}
                                        />
                                        <FaSignOutAlt
                                            className="group-icon"
                                            title="Opuść grupę"
                                            onClick={() => confirmLeaveGroup(group.id, group.created_by)}
                                        />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* PROPONOWANE GRUPY */}
                <div className="groups-box">
                    <h2 className="groups-box-title">PROPONOWANE GRUPY</h2>
                    <div className="groups-list">
                        {proposedGroups.length === 0 ? (
                            <p className="no-groups-message">Brak proponowanych grup.</p>
                        ) : (
                            proposedGroups.map((group) => (
                                <div key={group.id} className="group-item">
                                    <img
                                        src={`http://localhost:5000/uploads/${group.image}`}
                                        alt={group.name}
                                        className="group-avatar"
                                    />
                                    <span className="group-name">{group.name}</span>
                                    <div className="group-actions">
                                        <FaInfoCircle
                                            className="group-icon"
                                            title="Detale grupy"
                                            onClick={() => handleViewDetails(group.id)}
                                        />
                                        <FaPlus
                                            className="group-icon"
                                            title="Dołącz do grupy"
                                            onClick={() => handleJoinGroup(group.id, group.private)}
                                        />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Modal potwierdzenia usunięcia */}
            {groupIdToDelete && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Czy na pewno chcesz usunąć tę grupę?</h2>
                        <div className="modal-buttons">
                            <button
                                className="confirm-button"
                                onClick={handleConfirmDelete}
                            >
                                Tak, usuń
                            </button>
                            <button
                                className="cancel-button"
                                onClick={handleCancelDelete}
                            >
                                Anuluj
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal potwierdzenia opuszczenia grupy (dla zwykłych członków) */}
            {groupIdToLeave && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Czy na pewno chcesz opuścić tę grupę?</h2>
                        <div className="modal-buttons">
                            <button
                                className="confirm-button"
                                onClick={handleConfirmLeave}
                            >
                                Tak, opuść
                            </button>
                            <button
                                className="cancel-button"
                                onClick={handleCancelLeave}
                            >
                                Anuluj
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal przekazania właściciela (opuszczenie grupy przez właściciela) */}
            {ownerGroupIdToLeave && (
                <div className="modal-overlay">
                    <div className="modal-content owner-leave-modal">
                        <h2>Wybierz nowego administratora</h2>
                        <p className="group-ownership-p">
                            Aby opuścić własną grupę, musisz najpierw wybrać nowego
                            administratora. Zaznacz jedną osobę poniżej:
                        </p>

                        {/* Wyszukiwanie użytkowników w tej grupie */}
                        <input
                            type="text"
                            placeholder="Wyszukaj użytkownika..."
                            value={memberSearchTerm}
                            onChange={(e) => setMemberSearchTerm(e.target.value)}
                            className="member-search-input"
                        />

                        <div className="owner-members-list">
                            {filteredMembers.length === 0 ? (
                                <p className="no-members-found">
                                    Brak pasujących użytkowników.
                                </p>
                            ) : (
                                filteredMembers.map((member, index) => (
                                    <label
                                        key={index}
                                        className="owner-member-item"
                                    >
                                        <input
                                            type="radio"
                                            name="newAdmin"
                                            checked={selectedNewAdminId === member.user_id}
                                            onChange={() => setSelectedNewAdminId(member.user_id)}
                                        />
                                        <img
                                            src={`http://localhost:5000/uploads/${member.avatar}`}
                                            alt={member.username}
                                            className="owner-member-avatar"
                                        />
                                        <span>{member.username}</span>
                                    </label>
                                ))
                            )}
                        </div>

                        <div className="modal-buttons">
                            <button
                                className="confirm-button"
                                onClick={handleTransferOwnership}
                                disabled={!selectedNewAdminId}
                            >
                                Potwierdź
                            </button>
                            <button
                                className="cancel-button"
                                onClick={handleCancelLeaveAsOwner}
                            >
                                Anuluj
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <SquaresGroup />
            <Footer />
        </div>
    );
}
