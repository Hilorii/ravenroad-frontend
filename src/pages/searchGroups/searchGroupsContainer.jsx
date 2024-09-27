import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

export default function SearchGroupsContainer() {
    const [groups, setGroups] = useState([]);
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [menuOpen, setMenuOpen] = useState({});
    const { user } = useUser();
    const navigate = useNavigate();
    const userId = user ? user.id : null;
    const token = user ? user.token : null;

    // Wydzielenie funkcji do pobierania grup
    const fetchGroups = () => {
        axios.get('http://localhost:5000/searchGroups', { withCredentials: true })
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
    };

    // Wywołanie fetchGroups w useEffect, aby grupy były pobrane na początku
    useEffect(() => {
        fetchGroups();
    }, []);

    const handleSearch = () => {
        const filtered = groups.filter(group =>
            group.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredGroups(filtered);
    };

    const handleGroupJoin = async (groupId) => {
        try {
            const response = await axios.post(`/joinGroup/${groupId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`  // Użycie tokena
                }
            });
            alert(response.data.message);  // Pomyślne dołączenie
            fetchGroups();  // Odświeżenie listy grup po dołączeniu
        } catch (error) {
            console.error('Error joining group:', error);
            alert(error.response?.data?.error || 'Błąd podczas dołączania do grupy');
        }
    };

    const toggleMenu = (groupId) => {
        setMenuOpen(prevState => ({
            ...prevState,
            [groupId]: !prevState[groupId]
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
            </div>

            {filteredGroups.length > 0 ? (
                filteredGroups.map((group) => (
                    <div key={group.id} className="group-card">
                        <h2>{group.name}</h2>

                        <div className="g-ham-button-container">
                            <button onClick={() => toggleMenu(group.id)} className="hamburger-btn">
                                {menuOpen[group.id] ? "▲" : "☰"}
                            </button>

                            {menuOpen[group.id] && (
                                <div className="g-dropdown-menu">
                                    <button onClick={() => navigate(`/searchedGroupDetails/${group.id}`)}
                                            className="edit" role="button">
                                        <span>Szczegóły grupy</span>
                                    </button>
                                    <button className="edit" role="button" onClick={() => handleGroupJoin(group.id)}>
                                        <span>Dołącz do grupy</span>
                                    </button>

                                    {String(group.created_by) === String(userId) && (
                                        <div className="group-owner-options">
                                            <button className="edit" role="button">
                                                <span>Edytuj grupę</span>
                                            </button>
                                            <button className="edit" role="button">
                                                <span>Usuń grupę</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p className="gradient__text rC-p">Nie znaleziono grupy.</p>
            )}
        </div>
    );
}
