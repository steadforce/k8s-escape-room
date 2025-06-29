import CatRiddle from '../components/CatRiddle'
import GameStatus from '../components/GameStatus'
import OrbRiddle from '../components/OrbRiddle'
import PhotoFrameRiddle from '../components/PhotoFrameRiddle'
import TomeRiddle from '../components/TomeRiddle'
import banner from '../assets/banner.png'
import GiveUp from '../components/GiveUp'

function Room() {

    return (
        <>
            <div className="room">
                <h1>Kubernetes Escape Room Game</h1>
                <img src={banner} className="banner" alt="Banner" />
                <CatRiddle />
                <OrbRiddle />
                <PhotoFrameRiddle />
                <TomeRiddle />
                <div id="addons" className="addons"></div>
            </div>
            <GiveUp />
            <GameStatus />
        </>
    )
}

export default Room