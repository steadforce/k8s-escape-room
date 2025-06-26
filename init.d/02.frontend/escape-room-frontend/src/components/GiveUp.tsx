import { useGameStateContext } from "./GameStateContext"
import './GiveUp.css';

function GiveUp () {
    const gameState = useGameStateContext();

    return (
        <button className="giveup" onClick={gameState.restart}>Give up &#10140;</button>
    )
}

export default GiveUp