import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

export default function GroupsContainer() {
    const [groups, setGroups] = useState([]);
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [menuOpen, setMenuOpen] = useState({});
    const { user } = useUser();
    const navigate = useNavigate();
    const userId = user.id;

    useEffect(() => {
        axios.get('http://localhost:5000/groups', { withCredentials: true })
            .then(response => {
                if (Array.isArray(response.data)) {
                    setGroups(response.data);
                    setFilteredGroups(response.data);
                } else {
                    console.error("Oczekiwano tablicy grup, ale otrzymano:", typeof response.data);
                }
            })
            .catch(error => {
                console.error("Błąd podczas pobierania grup:", error);
            });
    }, []);

    const handleLeaveGroup = async (groupId) => {
        const confirmLeave = window.confirm('Czy na pewno chcesz opuścić tę grupę?');
        if (!confirmLeave) return;

        try {
            const response = await fetch(`http://localhost:5000/leaveGroup/${groupId}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Błąd podczas opuszczania grupy');
            }

            alert('Opuszczono grupę pomyślnie!');
            const updatedGroups = groups.filter(group => group.id !== groupId);
            setGroups(updatedGroups);
            setFilteredGroups(updatedGroups);
        } catch (error) {
            console.error('Błąd podczas opuszczania grupy:', error);
            alert('Wystąpił problem podczas opuszczania grupy.');
        }
    };

    const handleToggleFavourite = async (groupId, isFavourite) => {
        try {
            const response = await fetch(`http://localhost:5000/groups/${groupId}/favourite`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ favourite: !isFavourite })
            });

            if (!response.ok) throw new Error('Błąd podczas zmiany statusu ulubionej grupy');

            // Po udanej zmianie ulubionej grupy, ponownie pobieramy listę grup
            const updatedGroupsResponse = await axios.get('http://localhost:5000/groups', { withCredentials: true });
            setGroups(updatedGroupsResponse.data);
            setFilteredGroups(updatedGroupsResponse.data);
        } catch (error) {
            console.error('Error:', error);
            alert('Wystąpił problem podczas zmiany statusu ulubionej grupy.');
        }
    };

    const handleSearch = () => {
        const filtered = groups.filter(group =>
            group.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredGroups(filtered);
    };

    const handleEditGroup = (groupId) => {
        navigate(`/editGroup/${groupId}`);
    };

    const handleDeleteGroup = async (groupId) => {
        const confirmDelete = window.confirm('Czy na pewno chcesz usunąć tę grupę?');
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:5000/deleteGroup/${groupId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!response.ok) throw new Error('Błąd podczas usuwania grupy');

            alert('Grupa została usunięta!');
            const updatedGroups = groups.filter(group => group.id !== groupId);
            setGroups(updatedGroups);
            setFilteredGroups(updatedGroups);
        } catch (error) {
            console.error('Error:', error);
            alert('Wystąpił problem podczas usuwania grupy.');
        }
    };

    const toggleMenu = (groupId) => {
        setMenuOpen(prevState => ({
            ...prevState,
            [groupId]: !prevState[groupId] // Tylko menu dla konkretnej grupy
        }));
    };

    useEffect(() => {
        handleSearch();
    }, [searchQuery]);

    return (
        <div className="gC-container">
            <div className="g-add-search">
                <div className="g-filter">
                    <input
                        className="gC-input"
                        type="text"
                        placeholder="Szukaj grup..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="g-button-container">
                    <Link to="/addGroup" className="g-edit-bt">
                        <button className="edit" role="button"><span>Stwórz grupę</span></button>
                    </Link>
                    <Link to="/searchGroups" className="g-edit-bt">
                        <button className="edit g-join-bt" role="button"><span>Dołącz do grupy</span></button>
                    </Link>
                </div>
            </div>
            {filteredGroups.length > 0 ? (
                filteredGroups.map((group) => (
                    <div key={group.id} className="route-card">
                        <div className="rC-inside">
                            <img
                                src={`http://localhost:5000/uploads/default-avatar.jpg`}
                                alt={group.title}
                                className="route-image"
                            />
                            <h2>{group.name}</h2>
                            {/* Gwiazdka do ulubionych */}
                            <button
                                className={`r-favourite-btn ${group.favourite ? 'gold-star' : 'empty-star'}`}
                                onClick={() => handleToggleFavourite(group.id, group.favourite)}
                            >
                                ★
                            </button>

                            <div className="r-button-container">
                                <button onClick={() => navigate(`/groupDetails/${group.id}`)} className="edit full-button"
                                        role="button">
                                    <span>Szczegóły</span>
                                </button>
                                {String(group.created_by) !== String(userId) && (
                                    <button onClick={() => handleLeaveGroup(group.id)} className="edit full-button"
                                            role="button">
                                        <span>Opuść grupę</span>
                                    </button>
                                )}
                                {String(group.created_by) === String(userId) && (
                                    <div className="group-owner-options">
                                        <button onClick={() => handleEditGroup(group.id)} className="edit full-button"
                                                role="button">
                                            <span>Edytuj</span>
                                        </button>
                                        <button onClick={() => handleDeleteGroup(group.id)} className="edit full-button"
                                                role="button">
                                            <span>Usuń</span>
                                        </button>
                                    </div>
                                )}


                                {/* Widoczne dla mniejszych ekranów */}
                                <button onClick={() => navigate(`/groupDetails/${group.id}`)}
                                        className="icon-button-details" role="button">
                                    <span>❓</span>
                                </button>
                                {String(group.created_by) === String(userId) && (
                                    <>
                                <button  className="icon-button-delete" onClick={() => handleDeleteGroup(group.id)}
                                        role="button">
                                    <span>🗑️</span>
                                </button>
                                <button className="icon-button-edit" onClick={() => handleEditGroup(group.id)}
                                        role="button">
                                    <span>✏️</span>
                                </button>
                                </>
                                )}
                                {String(group.created_by) !== String(userId) && (
                                    <button className="icon-button-leave" onClick={() => handleLeaveGroup(group.id)} role="button">
                                        <span>❌</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="gradient__text rC-p">Nie znaleziono grupy.</p>
            )}
        </div>
    );
}
