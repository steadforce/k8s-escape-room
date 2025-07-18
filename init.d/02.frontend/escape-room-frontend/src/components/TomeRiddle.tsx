import redcircle from "../assets/redcircle.png";
import opentome from "../assets/openedtome.png";
import closedtome from "../assets/closedtome.png";
import { useGameStateContext } from "./GameStateContext";
import Tooltip from "./Tooltip";

function TomeRiddle() {
    const gameState = useGameStateContext();

    return (
        <div className="tomeContainer">
            <img id="tome" className="tome" src={gameState.puzzlesState().tome.solved ? opentome : closedtome}/>
            <div className="tomeHint">
                <Tooltip text="The key to open the tome seems to be missing.">
                    <img
                        id="tomeHint"
                        src={redcircle}
                        title=""
                        hidden={gameState.puzzlesState().tome.solved}
                    />
                </Tooltip>
            </div>
        </div>
    )
}

export default TomeRiddle