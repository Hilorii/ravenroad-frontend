import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import AnimatedBackground from '../../assets/AnimatedBackground/AnimatedBackground';
import Footer from '../../containers/footer/Footer';
import { useUser } from '../../contexts/UserContext';
import { FaCrown } from 'react-icons/fa';
import './GroupDetails.css';
import BackButton from '../../components/backBt/BackButton';

export default function GroupDetails() {
    const { id } = useParams();
    const { user } = useUser(); // informacje o zalogowanym użytkowniku

    const [group, setGroup] = useState(null);
    const [error, setError] = useState(null);

    // Lista członków pobierana z innego endpointu
    const [membersList, setMembersList] = useState([]);

    useEffect(() => {
        fetchGroupDetails();
        fetchGroupMembers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Pobieranie szczegółów grupy (z informacją o właścicielu, np. owner_username)
    const fetchGroupDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/groups/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Błąd podczas pobierania szczegółów grupy');
            }

            const data = await response.json();
            setGroup(data);
        } catch (err) {
            setError(err.message);
        }
    };

    // Pobieranie listy członków z endpointu /group/:groupId/members
    const fetchGroupMembers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/group/${id}/members`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Błąd podczas pobierania listy członków');
            }

            const membersData = await response.json();
            setMembersList(membersData);
        } catch (err) {
            setError(err.message);
        }
    };

    if (error) {
        return (
            <>
                <AnimatedBackground />
                <Navbar />
                <h1 style={{ color: '#fff', textAlign: 'center', marginTop: '2rem' }}>
                    {error}
                </h1>
                <Footer />
            </>
        );
    }

    if (!group) {
        return (
            <>
                <AnimatedBackground />
                <Navbar />
                <h1 style={{ color: '#fff', textAlign: 'center', marginTop: '2rem' }}>
                    Ładowanie szczegółów grupy...
                </h1>
                <Footer />
            </>
        );
    }

    // Fallbacki dla banera i avatara, jeśli nie ma w bazie
    const bannerUrl = group.banner
        ? `http://localhost:5000/uploads/${group.banner}`
        : '/images/default-banner.jpg';

    const avatarUrl = group.image
        ? `http://localhost:5000/uploads/${group.image}`
        : '/images/default-avatar.jpg';

    // Liczba członków -> bierzemy z membersList, bo to faktyczne wpisy z bazy
    const membersCount = membersList.length;

    return (
        <>
            <AnimatedBackground />
            <Navbar />
            <BackButton/>

            <div className="group-details-container">
                {/* BANNER GRUPY */}
                <div className="group-banner">
                    <img
                        src={bannerUrl}
                        alt="Group Banner"
                        className="group-banner-img"
                    />
                </div>

                <div className="group-content">
                    {/* AVATAR GRUPY */}
                    <div className="group-avatar-wrapper">
                        <img
                            src={avatarUrl}
                            alt="Group Avatar"
                            className="d-group-avatar"
                        />
                    </div>

                    {/* NAZWA GRUPY + (opcjonalna) korona */}
                    <h1 className="group-title">
                        {group.name}
                        {/* Jeśli zalogowany user jest właścicielem => pokazujemy koronę */}
                        {user && group.created_by === user.id && (
                            <FaCrown
                                className="owner-crown"
                                title="Jesteś właścicielem grupy"
                            />
                        )}
                    </h1>

                    {/* OPIS GRUPY */}
                    <p className="group-description">
                        {group.description || 'Brak opisu...'}
                    </p>

                    {/* DODATKOWE INFORMACJE */}
                    <div className="group-info">
                        {/* Zamiast "created_by" => "owner_username" */}
                        <p>
                            <strong>Właściciel:</strong>{' '}
                            {group.owner_username || '(nieznany)'}
                        </p>
                        <p><strong>Prywatna:</strong> {group.private ? 'Tak' : 'Nie'}</p>
                        <p><strong>Widoczna:</strong> {group.visible ? 'Tak' : 'Nie'}</p>
                        <p><strong>Liczba członków:</strong> {membersCount}</p>
                    </div>

                    {/* LISTA CZŁONKÓW */}
                    <div className="members-list">
                        <h2 className="members-list-title">Członkowie grupy</h2>
                        <div className="members-grid">
                            {membersList.length === 0 && (
                                <p style={{ color: '#fff' }}>Brak członków lub brak wyników.</p>
                            )}
                            {membersList.map((member, index) => {
                                const memberAvatarUrl = member.avatar
                                    ? `http://localhost:5000/uploads/${member.avatar}`
                                    : '/images/default-avatar.jpg';

                                return (
                                    <div key={index} className="member-item">
                                        <img
                                            src={memberAvatarUrl}
                                            alt={member.username}
                                            className="member-avatar"
                                        />
                                        <span className="member-username">{member.username}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
