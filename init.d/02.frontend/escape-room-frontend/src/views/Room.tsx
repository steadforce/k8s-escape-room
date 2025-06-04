import GameStatus from '../components/GameStatus'
import banner from '/banner.png'

function Room() {

    return (
        <>
            <div className="room">
                <h1>Kubernetes Escape Room Game</h1>
                <img src={banner} className="banner" alt="Banner" />
                <div id="catContainer" className="catContainer">
                    <img id="cat" className="cat" />
                </div>
                <div className="orb">
                    <img id="orb" src="/orb.png" />
                    <img id="orbWisdom" className="orbWisdom" />
                </div>
                <img
                    id="orbHint"
                    className="orbHint"
                    src="/redcircle.png"
                    title="The magic orb does not work!"
                />
                <img id="photoFrame" className="photoFrame" />
                <img
                    id="photoHint"
                    className="photoHint"
                    src="/redcircle.png"
                    title="The magic frame can't find any photos!"
                />
                <img id="tome" className="tome" />
                <img
                    id="tomeHint"
                    className="tomeHint"
                    src="/redcircle.png"
                    title="The key to open the tome seems to be missing."
                />
                <div id="addons" className="addons"></div>
            </div>
            <GameStatus />
        </>
    )
}

export default Room