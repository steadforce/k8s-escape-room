import redcircle from "../assets/redcircle.png";
import opentome from "../assets/openedtome.png";
import closedtome from "../assets/closedtome.png";
import { useGameStateContext } from "./GameStateContext";

function TomeRiddle() {
    const gameState = useGameStateContext();

    return (
        <>
            <img id="tome" className="tome" src={gameState.puzzlesState().tome.solved ? opentome : closedtome}/>
            <img
                id="tomeHint"
                className="tomeHint"
                src={redcircle}
                title="The key to open the tome seems to be missing."
                hidden={gameState.puzzlesState().tome.solved}
            />
        </>
    )
}

export default TomeRiddle