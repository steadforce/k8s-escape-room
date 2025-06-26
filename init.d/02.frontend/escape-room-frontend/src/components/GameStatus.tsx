import { useEffect, useState } from "react"
import './GameStatus.css'
//import { useNavigate } from "react-router-dom"
import { useGameStateContext } from "./GameStateContext"

function GameStatus() {
    //const navigate = useNavigate()
    const gameState = useGameStateContext();
    const [progress, setProgress] = useState("❌ ❌ ❌ ❌")

    useEffect(() => {
        const solvedMark = "✅";
        const unsolvedMark = "❌";

        const newProgress = gameState.progress().map(s => s ? solvedMark : unsolvedMark)
            .join(" ");
        setProgress(newProgress)
    }, [gameState])

    return (
        <>
            <div className="timer">
                { gameState.timeElapsed() }
            </div>
            <div className="progress">
                { progress }
            </div>
        </>
    )
}

export default GameStatus