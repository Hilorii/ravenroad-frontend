import { YStack, XStack} from 'tamagui';
import Navbar from "../../components/navbar/Navbar"
import './routes.css'
import { Link } from 'react-router-dom';
import RoutesContainer from './routesContainer'

export default function RoutesPage() {
    return (
        <div className="App">
            <div className="gradient__bg">
                <Navbar/>
                <YStack padding="$0" space>
                    <h1 className="gradient__text r-title ">Zarządzaj Trasami</h1>
                    <Link to="/addRoute" className="r-edit-bt">
                        <button className="edit" role="button"><span className="text r-edit-bt">Dodaj trasę</span></button>
                    </Link>

                    <YStack space className="r-container">
                        <RoutesContainer/>
                    </YStack>

                </YStack>
            </div>
        </div>

    );
}




