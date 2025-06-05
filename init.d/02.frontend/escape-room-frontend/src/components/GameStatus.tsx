import { useContext, useEffect, useState } from "react"
import { GameContext } from "../main"
import './GameStatus.css'

function GameStatus() {
    const startTime = useContext(GameContext)
    const [timer, setTimer] = useState("")
    const [progress, _setProgress] = useState("✅ ✅ ✅ ❌")

    useEffect(() => {
        setInterval(() => {
            const elapsed = new Date(new Date().getTime() - startTime.getTime()).toISOString().substring(11, 19)
            setTimer(elapsed)
        }, 1000)
    }, [])

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