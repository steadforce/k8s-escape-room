import cat from "../assets/cat.png";
import redcircle from "../assets/redcircle.png";
import { useGameStateContext } from "./GameStateContext";
import Tooltip from "./Tooltip";

function CatRiddle() {
    const gameState = useGameStateContext();

    return (
        <>
            <div id="catContainer" className="catContainer">
                <Tooltip text="The cat is missing!">
                    <img id="cat" className="cat" src={redcircle} hidden={gameState.puzzlesState().cat.solved} title=""/>
                </Tooltip>
                {Array.from({ length: gameState.puzzlesState().cat.replicas }).map((_, idx) => (
                    <img key={idx} id={`cat-${idx}`} className="cat" src={cat}/>
                ))}
            </div>
        </>
    )
}

export default CatRiddle