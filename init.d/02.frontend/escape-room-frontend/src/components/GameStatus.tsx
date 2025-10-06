import { useMemo } from "react"
import { expectedPuzzleTotal } from "../AddonLoader";
import './GameStatus.css'
import { useGameStateContext } from "../hooks/useGameStateContext"
import HighscoreTable from '../components/HighscoreTable'

function GameStatus() {
    const gameState = useGameStateContext();
    // Derive progress string directly; with eager add-on loading this is stable from first paint
    const progress = useMemo(() => {
        const solvedMark = "✅";
        const unsolvedMark = "❌";
        let arr = gameState.progress();
        if (arr.length < expectedPuzzleTotal) {
            arr = [...arr, ...Array(expectedPuzzleTotal - arr.length).fill(false)];
        }
        return arr.map(s => s ? solvedMark : unsolvedMark).join(" ");
    }, [gameState.progress]);

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