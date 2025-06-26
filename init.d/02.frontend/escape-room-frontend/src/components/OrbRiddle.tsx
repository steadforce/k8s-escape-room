import orb from "../assets/orb.png";
import redcircle from "../assets/redcircle.png";
import noanswers from "../assets/noanswers.png";
import { useGameStateContext } from "./GameStateContext";

function OrbRiddle() {
    const gameState = useGameStateContext();

    return (
        <>
            <div className="orb">
                <img id="orb" src={orb} />
                <img id="orbWisdom" className="orbWisdom" src={gameState.puzzlesState().orb.solved ? "/orb" : noanswers} />
            </div>
            <img
                id="orbHint"
                className="orbHint"
                src={redcircle}
                title="The magic orb does not work!"
                hidden={gameState.puzzlesState().orb.solved}
            />
        </>
    )
}

export default OrbRiddle