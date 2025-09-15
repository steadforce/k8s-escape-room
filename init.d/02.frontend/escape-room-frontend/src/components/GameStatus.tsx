import { useEffect, useState } from "react"
import './GameStatus.css'
import { useGameStateContext } from "./GameStateContext"
import HighscoreTable from '../components/HighscoreTable'

function GameStatus() {
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
            <div className="gameScreenContainer">
                <div className="header">Highscores</div>
                <div className="highscoresTable">
                    <HighscoreTable mode="ingame" />
                </div>
                <div className="timer">
                    Time: <span>{ gameState.timeElapsed() }</span>
                </div>
                <div className="progress">
                    Solved: <span>{ progress }</span>
                </div>
            </div>
        </>
    )
}

export default GameStatus