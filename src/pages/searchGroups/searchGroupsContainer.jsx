import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

export default function SearchGroupsContainer() {
    const [groups, setGroups] = useState([]);
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [menuOpen, setMenuOpen] = useState({});
    const [loading, setLoading] = useState(true);  // Dodano stan ładowania
    const { user } = useUser();
    const navigate = useNavigate();
    const userId = user ? user.id : null;
    const token = user ? user.token : null;

    // Wydzielenie funkcji do pobierania grup
    const fetchGroups = () => {
        axios.get('http://localhost:5000/searchGroups', { withCredentials: true })
            .then(response => {
                if (Array.isArray(response.data)) {
                    console.log('Groups fetched:', response.data);  // Logowanie pobranych danych
                    setGroups(response.data);
                    setFilteredGroups(response.data);
                } else {
                    console.error("Oczekiwano tablicy grup, ale otrzymano:", typeof response.data);
                }
                setLoading(false);  // Wyłącz ładowanie po pobraniu danych
            })
            .catch(error => {
                console.error("Błąd podczas pobierania grup:", error);
                setLoading(false);  // Wyłącz ładowanie w przypadku błędu
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

            // Filtruj grupę z listy, do której użytkownik właśnie dołączył
            const updatedGroups = groups.filter(group => group.id !== groupId);
            setGroups(updatedGroups);
            setFilteredGroups(updatedGroups);

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
        if (groups.length > 0) {
            handleSearch();
        }
    }, [searchQuery, groups]);

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

            {loading ? (
                <p className="gradient__text rC-p">Ładowanie grup...</p>  // Komunikat podczas ładowania
            ) : filteredGroups.length > 0 ? (
                filteredGroups.map((group) => (
                    <div key={group.id} className="route-card">
                        <div className="rC-inside">
                            <img
                                src={`http://localhost:5000/uploads/default-avatar.jpg`}
                                alt={group.title}
                                className="route-image"
                            />
                            <h2>{group.name}</h2>
                            <div className="r-button-container">
                                <button onClick={() => navigate(`/searchedGroupDetails/${group.id}`)}
                                        className="edit full-button" role="button">
                                    <span>Szczegóły grupy</span>
                                </button>
                                <button className="edit full-button" role="button"
                                        onClick={() => handleGroupJoin(group.id)}>
                                    <span>Dołącz do grupy</span>
                                </button>

                                {/* Widoczne dla mniejszych ekranów */}
                                <button onClick={() => navigate(`/searchedGroupDetails/${group.id}`)}
                                        className="icon-button-details" role="button">
                                    <span>❓</span>
                                </button>
                                <button className="icon-button-delete" onClick={() => handleGroupJoin(group.id)}
                                        role="button">
                                    <span>➕</span>
                                </button>
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
