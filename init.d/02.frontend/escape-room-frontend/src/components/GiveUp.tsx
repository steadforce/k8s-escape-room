import { useGameStateContext } from "../hooks/useGameStateContext";
import './GiveUp.css';

function GiveUp () {
    const gameState = useGameStateContext();

    return (
        <button className="giveup" onClick={gameState.restart}>Give up <span style={{fontFamily: "'Segoe UI Emoji', 'Noto Color Emoji', sans-serif" }}>&#x1F3F3;</span></button>
    )
}

export default GiveUp