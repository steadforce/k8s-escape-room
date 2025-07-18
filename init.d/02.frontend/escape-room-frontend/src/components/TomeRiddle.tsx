import redcircle from "../assets/redcircle.png";
import opentome from "../assets/openedtome.png";
import closedtome from "../assets/closedtome.png";
import { useGameStateContext } from "./GameStateContext";
import Tooltip from "./Tooltip";

function TomeRiddle() {
    const gameState = useGameStateContext();

    return (
        <div className="tomeContainer">
            <Tooltip text="The key to open the tome seems to be missing.">
                <img id="tome" className="tome" src={gameState.puzzlesState().tome.solved ? opentome : closedtome}/>
                <img
                    id="tomeHint"
                    className="tomeHint"
                    src={redcircle}
                    title=""
                    hidden={gameState.puzzlesState().tome.solved}
                />
            </Tooltip>
        </div>
    )
}

export default TomeRiddle