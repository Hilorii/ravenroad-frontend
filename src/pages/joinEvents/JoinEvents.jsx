import { YStack, XStack } from 'tamagui';
import Navbar from "../../components/navbar/Navbar";
import { Link } from 'react-router-dom';
import JoinEventsContainer from './joinEventsContainer';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

export default function JoinEventsPage() {
    const { user } = useContext(UserContext);

    return (
        <div className="App">
            <div className="gradient__bg">
                <Navbar />
                <YStack padding="$0" space>

                    {/* Renderuj przycisk tylko dla użytkowników, którzy są administratorami */}
                    {user?.is_admin === 1 && (
                        <Link to="/addRoute" className="r-edit-bt">
                            <button className="edit" role="button">
                                <span>Dodaj wydarzenie</span>
                            </button>
                        </Link>
                    )}

                    <YStack space className="r-container">
                        <JoinEventsContainer/>
                    </YStack>
                </YStack>
            </div>
        </div>
    );
}
