import { YStack, XStack} from 'tamagui';
import Navbar from "../../components/navbar/Navbar"
import './routes.css'
import { Link } from 'react-router-dom';
import RoutesContainer from './routesContainer'

export default function RoutesPage() {
    return (
        <YStack padding="$0" space>
            <Link to="/addRoute" className="r-edit-bt">
                <button className="edit" role="button"><span>Dodaj trasę</span></button>
            </Link>
            <YStack space className="r-container">
                <RoutesContainer/>
            </YStack>
        </YStack>
    );
}




