import { useContext, useEffect, useState } from "react"
import './GameStatus.css'
import { useNavigate } from "react-router-dom"
import { useGameStateContext } from "./GameStateContext"

function GameStatus() {
    const navigate = useNavigate()
    const gameState = useGameStateContext();
    const [progress, setProgress] = useState("❌ ❌ ❌ ❌")

    const checkState = async () => {
        const catState = await fetch("/cat").then(r => {return r.ok})
        const orbState = await fetch("/orb").then(r => {return r.ok})
        const tomeState = await fetch("/tome").then(r => {return r.ok})
        const photoFrameState = await fetch("/photoframe/photo0.png").then(r => {return r.ok})
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
        }, 1000)
        return () => clearInterval(intervalId)
    }, [])

    useEffect(() => {
        const solvedMark = "✅";
        const unsolvedMark = "❌";

        const newProgress = gameState.progress().map(s => s ? solvedMark : unsolvedMark)
            .join(" ");
        setProgress(newProgress)

        /*if (solved.every(s => s)) {
            navigate("/end")
        }*/

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