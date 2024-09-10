import { YStack, XStack } from 'tamagui';
import Navbar from "../../components/navbar/Navbar";
import { Link } from 'react-router-dom';
import ReadyRoutesContainer from './readyRoutesContainer';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';


export default function ReadyRoutesPage() {
    // Pobieranie danych o użytkowniku z kontekstu
    const { user } = useContext(UserContext); // user - obiekt zawierający informacje o użytkowniku np. { is_admin: 1 }

    return (
        <div className="App">
            <div className="gradient__bg">
                <Navbar />
                <YStack padding="$0" space>

                    {/* Renderuj przycisk tylko dla użytkowników, którzy są administratorami */}
                    {user?.is_admin === 1 && (
                        <Link to="/addRoute" className="r-edit-bt">
                            <button className="edit" role="button">
                                <span>Dodaj trasę</span>
                            </button>
                        </Link>
                    )}

                    <YStack space className="r-container">
                        <ReadyRoutesContainer />
                    </YStack>
                </YStack>
            </div>
        </div>
    );
}
