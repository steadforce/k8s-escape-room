import CatRiddle from '../components/CatRiddle'
import GameStatus from '../components/GameStatus'
import OrbRiddle from '../components/OrbRiddle'
import PhotoFrameRiddle from '../components/PhotoFrameRiddle'
import TomeRiddle from '../components/TomeRiddle'
import GiveUp from '../components/GiveUp'
import Banner from '../components/Banner'
import AddOns from '../components/AddOns'


function Room() {
    return (
        <>
            <div className="room">
                <h1>Kubernetes Escape Room Game</h1>
                <Banner />
                <CatRiddle />
                <OrbRiddle />
                <PhotoFrameRiddle />
                <TomeRiddle />
            </div>
            <GiveUp />
            <GameStatus />
            <AddOns />
        </>
    )
}

export default Room