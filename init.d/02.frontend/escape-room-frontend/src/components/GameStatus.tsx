import { useMemo } from "react"
import { expectedPuzzleTotal } from "@main/hooks/expectedPuzzleTotal";
import './GameStatus.css'
import { useGameStateContext } from "../hooks/useGameStateContext"
import HighscoreTable from '../components/HighscoreTable'
import Tooltip from "./Tooltip";

function GameStatus() {
    const gameState = useGameStateContext();
    const finishThreshold = useMemo(() => {
        return gameState.getFinishThreshold();
    }, [gameState]);
    // Derive progress string directly; with eager add-on loading this is stable from first paint
    const progressIcons = useMemo(() => {
        const solvedMark = "✅";
        const unsolvedMark = "❌";
        let arr = gameState.progress();
        if (arr.length < expectedPuzzleTotal) {
            arr = [...arr, ...Array(expectedPuzzleTotal - arr.length).fill(false)];
        }
        // Always show solved first
        arr.sort((a, b) => (a === b) ? 0 : a ? -1 : 1);

        return arr.map((s, i) => {
            const dim = (finishThreshold > 0) ? (i >= finishThreshold) : false;
            return (
                <span key={i} style={{ opacity: dim ? 0.4 : 1, marginRight: '0.5em' }}>
                    {s ? solvedMark : unsolvedMark}
                </span>
            );
        });
    }, [gameState, finishThreshold]);

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
                    Solved: 
                    {finishThreshold === 0 ? 
                        <span className="icons">{ progressIcons }</span>
                        :
                        <Tooltip position="right" text={`Solve ${finishThreshold} puzzles to finish the game`}>
                            <span className="icons">{ progressIcons }</span>
                        </Tooltip>
                        }
                </div>
            </div>
        </>
    )
}

export default GameStatus