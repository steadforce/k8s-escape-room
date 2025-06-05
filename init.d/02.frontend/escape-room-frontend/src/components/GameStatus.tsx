import { useContext, useEffect, useState } from "react"
import { GameContext } from "../main"
import './GameStatus.css'

function GameStatus() {
    const startTime = useContext(GameContext)
    const [timer, setTimer] = useState("")
    const [gameState, setGameState] = useState({
        running: false,
        solved: false,
        name: "",
        puzzles: {
            cat: {
                solved: false,
                replicas: 0,
            },
            orb: {
                solved: false,
            },
            photo: {
                solved: false,
                url: "",
            },
            tome: {
                solved: false,
            }
        },
    })
    const [progress, setProgress] = useState("✅ ✅ ✅ ❌")

    useEffect(() => {
        setInterval(() => {
            const elapsed = new Date(new Date().getTime() - startTime.getTime()).toISOString().substring(11, 19)
            setTimer(elapsed)
        }, 1000)
    }, [])

    useEffect(() => {
        const solvedMark = "✅";
        const unsolvedMark = "❌";

        const newProgress = Object.values(gameState.puzzles)
            .map((check) => (check.solved ? solvedMark : unsolvedMark))
            .join(" ");
        setProgress(newProgress)
    }, [gameState])

    return (
        <>
            <div className="timer">
                { timer }
            </div>
            <div className="progress">
                { progress }
            </div>
        </>
    )
}

export default GameStatus