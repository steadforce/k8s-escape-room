import cat from "../assets/cat.png";
import redcircle from "../assets/redcircle.png";
import { useGameStateContext } from "./GameStateContext";

function CatRiddle() {
    const gameState = useGameStateContext();

    return (
        <>
            <div id="catContainer" className="catContainer">
                <img id="cat" className="cat" src={redcircle} hidden={gameState.puzzlesState().cat.solved} title="The cat is missing!"/>
                {Array.from({ length: gameState.puzzlesState().cat.replicas }).map((_, idx) => (
                    <img key={idx} id={`cat-${idx}`} className="cat" src={cat}/>
                ))}
            </div>
        </>
    )
}

export default CatRiddle