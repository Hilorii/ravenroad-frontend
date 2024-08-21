import { YStack, XStack } from 'tamagui';
import Navbar from "../../components/navbar/Navbar";
import './team.css';
import logo from '../../assets/RRlogo.png'

export default function TeamPage() {
    return (
        <div className="App">
            <div className="gradient__bg">
                <Navbar />
                <YStack padding="$0" space alignItems="center">
                    <h1 className="gradient__text title">Nasz Zespół</h1>
                    <XStack space justifyContent="center" flexWrap="wrap">
                        <div className="team-member">
                            <img src={logo} alt="Członek Zespołu 1" className="team-photo" />
                            <p className="team-name">Jan Kowalski</p>
                            <p className="team-role">CEO</p>
                        </div>
                        <div className="team-member">
                            <img src={logo} alt="Członek Zespołu 2" className="team-photo" />
                            <p className="team-name">Anna Nowak</p>
                            <p className="team-role">CTO</p>
                        </div>
                        <div className="team-member">
                            <img src={logo} alt="Członek Zespołu 3" className="team-photo" />
                            <p className="team-name">Michał Wiśniewski</p>
                            <p className="team-role">Project Manager</p>
                        </div>
                    </XStack>
                </YStack>
            </div>
        </div>
    );
}
