import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { useAlerts } from '../../contexts/AlertsContext';
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
    const location = useLocation();

    const { addAlert } = useAlerts();

    // Ref zapobiegający powtórnemu alertowi
    const groupCreatedRef = useRef(false);

    const [userGroups, setUserGroups] = useState([]);
    const [proposedGroups, setProposedGroups] = useState([]);

    // Wyszukiwarka
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [searchError, setSearchError] = useState(null);

    // Modale
    const [groupIdToDelete, setGroupIdToDelete] = useState(null);
    const [groupIdToLeave, setGroupIdToLeave] = useState(null);

    const [ownerGroupIdToLeave, setOwnerGroupIdToLeave] = useState(null);
    const [groupMembers, setGroupMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [memberSearchTerm, setMemberSearchTerm] = useState('');
    const [selectedNewAdminId, setSelectedNewAdminId] = useState(null);

    // ---------------------------
    // Pobierz grupy przy starcie
    // ---------------------------
    useEffect(() => {
        fetchUserGroups();
        fetchProposedGroups();
    }, []);

    // ---------------------------
    // Błąd wyszukiwania -> timer
    // ---------------------------
    useEffect(() => {
        if (searchError) {
            const timer = setTimeout(() => {
                setSearchError(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [searchError]);

    // ---------------------------
    // Filtrowanie członków
    // ---------------------------
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

    // ---------------------------
    // Sprawdzamy, czy utworzono grupę
    // ---------------------------
    useEffect(() => {
        // if location.state.groupCreated i jednocześnie !groupCreatedRef.current
        if (location.state?.groupCreated && !groupCreatedRef.current) {
            // Ustawiamy groupCreatedRef na true -> alert pojawi się tylko raz
            groupCreatedRef.current = true;

            // Wywołujemy normalny alert (np. 5 sekund)
            addAlert('Nowa grupa została pomyślnie utworzona!', 'success', 5000);

            // Czyścimy state, by nie powtórzyć
            navigate('/groups', { replace: true, state: {} });
        }
    }, [location.state, addAlert, navigate]);

    // ---------------------------
    // Pobranie list grup
    // ---------------------------
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
                headers: { Authorization: `Bearer ${token}` },
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

    // ---------------------------
    // Edycja / Detale
    // ---------------------------
    const handleEditGroup = (groupId) => {
        navigate(`/editGroup/${groupId}`);
    };

    const handleViewDetails = (groupId) => {
        navigate(`/groupDetails/${groupId}`);
    };

    // ----------------------------------------------------------------------------
    // OPUSZCZANIE GRUPY
    // ----------------------------------------------------------------------------
    const confirmLeaveGroup = async (groupId, createdBy) => {
        if (user && createdBy === user.id) {
            setOwnerGroupIdToLeave(groupId);
            fetchGroupMembers(groupId);
        } else {
            setGroupIdToLeave(groupId);
        }
    };

    const handleConfirmLeave = async () => {
        if (!groupIdToLeave) return;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `http://localhost:3000/leaveGroup/${groupIdToLeave}`,
                {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Błąd podczas opuszczania grupy');
            }
            setUserGroups((prev) =>
                prev.filter((g) => g.id !== groupIdToLeave)
            );
            addAlert('Opuszczono grupę', 'success');
        } catch (err) {
            console.error(err.message);
        } finally {
            setGroupIdToLeave(null);
        }
    };

    const handleCancelLeave = () => {
        setGroupIdToLeave(null);
    };

    // ----------------------------------------------------------------------------
    // Właściciel -> przeniesienie admina
    // ----------------------------------------------------------------------------
    const fetchGroupMembers = async (groupId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `http://localhost:3000/group/${groupId}/members/ownership`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (!response.ok) {
                throw new Error('Błąd podczas pobierania członków grupy');
            }
            const data = await response.json();
            const filteredOwner = data.filter(
                (member) => member.username !== user?.username
            );
            setGroupMembers(filteredOwner);
            setFilteredMembers(filteredOwner);
        } catch (err) {
            console.error(err);
        }
    };

    const handleTransferOwnership = async () => {
        if (!ownerGroupIdToLeave || !selectedNewAdminId) return;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `http://localhost:3000/group/${ownerGroupIdToLeave}/transferOwnership`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ newAdminId: selectedNewAdminId }),
                }
            );
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Błąd przy przenoszeniu własności grupy');
            }
            setUserGroups((prev) =>
                prev.filter((g) => g.id !== ownerGroupIdToLeave)
            );
            addAlert('Opuszczono grupę', 'success');
        } catch (err) {
            console.error('Błąd przenoszenia własności:', err);
        } finally {
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
    // DOŁĄCZANIE
    // ----------------------------------------------------------------------------
    const handleJoinGroup = async (groupId, isPrivate) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `http://localhost:3000/joinGroup/${groupId}`,
                {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Błąd podczas dołączania do grupy');
            }
            fetchUserGroups();
            fetchProposedGroups();

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
    // USUWANIE GRUPY
    // ----------------------------------------------------------------------------
    const confirmDeleteGroup = (groupId) => {
        setGroupIdToDelete(groupId);
    };

    const handleConfirmDelete = async () => {
        if (!groupIdToDelete) return;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `http://localhost:3000/deleteGroup/${groupIdToDelete}`,
                {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Błąd podczas usuwania grupy');
            }
            setUserGroups((prev) =>
                prev.filter((g) => g.id !== groupIdToDelete)
            );
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
    // NAWIGACJA
    // ----------------------------------------------------------------------------
    const handleNavigateToRoutes = () => {
        navigate('/routes');
    };

    const handleNavigateToEvents = () => {
        navigate('/events');
    };

    // ----------------------------------------------------------------------------
    // WYSZUKIWANIE
    // ----------------------------------------------------------------------------
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        try {
            const token = localStorage.getItem('token');
            setSearchError(null);

            const response = await fetch(
                `http://localhost:3000/searchGroups?query=${encodeURIComponent(searchQuery)}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
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
    // RENDER
    // ----------------------------------------------------------------------------
    return (
        <div>
            <AnimatedBackground />
            <Navbar />

            <div className="title-container">
                <h2 className="title-item no-glow" onClick={handleNavigateToRoutes}>
                    TRASY
                </h2>
                <h1 className="groups-title">GRUPY</h1>
                <h2 className="title-item no-glow" onClick={handleNavigateToEvents}>
                    EVENTS
                </h2>
            </div>

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
                                                onClick={() =>
                                                    handleJoinGroup(group.id, group.private)
                                                }
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="error-message">
                                    Brak wyników wyszukiwania.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="groups-wrapper">
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
                                            onClick={() =>
                                                confirmLeaveGroup(group.id, group.created_by)
                                            }
                                        />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

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
                                            onClick={() =>
                                                handleJoinGroup(group.id, group.private)
                                            }
                                        />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

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

            {ownerGroupIdToLeave && (
                <div className="modal-overlay">
                    <div className="modal-content owner-leave-modal">
                        <h2>Wybierz nowego administratora</h2>
                        <p className="group-ownership-p">
                            Aby opuścić własną grupę, musisz najpierw wybrać nowego
                            administratora. Zaznacz jedną osobę poniżej:
                        </p>

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
                                    <label key={index} className="owner-member-item">
                                        <input
                                            type="radio"
                                            name="newAdmin"
                                            checked={selectedNewAdminId === member.user_id}
                                            onChange={() =>
                                                setSelectedNewAdminId(member.user_id)
                                            }
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
