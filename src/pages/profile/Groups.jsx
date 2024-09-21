import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { XStack } from 'tamagui'
//import './groups.css';

export default function GroupsContainer() {
    const [groups, setGroups] = useState([]);
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        // Pobranie grup użytkownika
        axios.get('http://localhost:5000/groups', { withCredentials: true })
            .then(response => {
                console.log('Response data:', response.data);  // Sprawdź pełną odpowiedź serwera

                // Sprawdź, czy `response.data` to tablica
                if (Array.isArray(response.data)) {
                    setGroups(response.data);  // Ustaw całą tablicę grup
                    setFilteredGroups(response.data);  // Ustaw całą tablicę przefiltrowanych grup
                } else {
                    console.error("Oczekiwano tablicy grup, ale otrzymano:", typeof response.data);
                }
            })
            .catch(error => {
                console.error("Błąd podczas pobierania grup:", error);
            });
    }, []);







    const handleLeaveGroup = async (groupId) => {
        console.log("Leaving group with ID:", groupId);

        const confirmLeave = window.confirm('Czy na pewno chcesz opuścić tę grupę?');
        if (!confirmLeave) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/groups/${groupId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Błąd podczas opuszczania grupy');
            }

            alert('Opuszczono grupę pomyślnie!');
            const updatedGroups = groups.filter(group => group.id !== groupId);
            setGroups(updatedGroups);
            setFilteredGroups(updatedGroups);
        } catch (error) {
            console.error('Error:', error);
            alert('Wystąpił problem podczas opuszczania grupy.');
        }
    };

    const handleSearch = () => {
        const filtered = groups.filter(group =>
            group.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredGroups(filtered);
    };

    useEffect(() => {
        handleSearch();
    }, [searchQuery]);

    useEffect(() => {
        console.log('Aktualne grupy:', groups);
        console.log('Aktualne przefiltrowane grupy:', filteredGroups);
    }, [groups, filteredGroups]);

    return (
        <div className="rC-container">
            <div className="g-add-search">
                <div className="g-filter">
                    <input
                        className="rC-input"
                        type="text"
                        placeholder="Szukaj grup..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="g-button-container">
                    <Link to="/" className="g-edit-bt">
                        <button className="edit" role="button"><span>Stwórz grupę</span></button>
                    </Link>
                    <Link to="/" className="g-edit-bt">
                        <button className="edit" role="button"><span>Dołącz do grupy</span></button>
                    </Link>
                </div>
            </div>

            {/* Sprawdź, czy filteredGroups zawiera dane */}
            {console.log('filteredGroups:', filteredGroups)}

            {/* Renderowanie grup */}
            {filteredGroups.length > 0 ? (
                filteredGroups.map((group) => (
                    <div key={group.id} className="route-card">
                        <h2>{group.name}</h2>
                        <p>{group.description}</p>
                        <div className="r-button-container">
                            <button onClick={() => handleLeaveGroup(group.id)} className="edit" role="button">
                                <span>Opuść grupę</span>
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="gradient__text rC-p">Nie znaleziono grupy.</p>
            )}
        </div>
    );
}
