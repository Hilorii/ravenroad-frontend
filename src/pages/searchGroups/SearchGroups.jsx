import { YStack, XStack } from 'tamagui';
import Navbar from "../../components/navbar/Navbar";
import { Link } from 'react-router-dom';
import SearchGroupsContainer from './searchGroupsContainer';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import BackButton from '../../components/backBt/BackButton';

export default function SearchGroupsPage() {
    // Pobieranie danych o użytkowniku z kontekstu
    const { user } = useContext(UserContext); // user - obiekt zawierający informacje o użytkowniku np. { is_admin: 1 }

    return (
        <div className="App">
            <div className="gradient__bg">
                <Navbar />
                <BackButton/>
                <YStack padding="$0" space>

                    {/* Renderuj przycisk tylko dla użytkowników, którzy są administratorami */}
                    {user?.is_admin === 1 && (
                        <Link to="/addRoute" className="r-edit-bt">
                            <button className="edit" role="button">
                                <span>Dodaj grupę</span>
                            </button>
                        </Link>
                    )}

                    <YStack space className="r-container">
                        <SearchGroupsContainer />
                    </YStack>
                </YStack>
            </div>
        </div>
    );
}
