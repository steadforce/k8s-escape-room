import { useContext, useEffect, useState } from "react"
import { GameContext } from "../main"
import './GameStatus.css'
import { useNavigate } from "react-router-dom"

function GameStatus() {
    const navigate = useNavigate()
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

    const checkState = async () => {
        const catState = await fetch("/cat").then(r => {return r.ok})
        const orbState = await fetch("/orb").then(r => {return r.ok})
        const tomeState = await fetch("/tome").then(r => {return r.ok})
        const photoFrameState = await fetch("/photoframe/photo0.png").then(r => {return r.ok})
        setGameState({
            running: true,
            solved: false,
            name: "",
            puzzles: {
                cat: {
                    solved: catState,
                    replicas: 0,
                },
                orb: {
                    solved: orbState,
                },
                photo: {
                    solved: photoFrameState,
                    url: "",
                },
                tome: {
                    solved: tomeState,
                }
            },
        })
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            checkState()
            const elapsed = new Date(new Date().getTime() - startTime.getTime()).toISOString().substring(11, 19)
            setTimer(elapsed)
        }, 1000)
        return () => clearInterval(intervalId)
    }, [])

    useEffect(() => {
        const solvedMark = "✅";
        const unsolvedMark = "❌";

        let solved = Object.values(gameState.puzzles)
            .map(check => check.solved);

        const newProgress = solved.map(s => s ? solvedMark : unsolvedMark)
            .join(" ");
        setProgress(newProgress)

        solved = [true, true, true, true]
        if (solved.every(s => s)) {
            navigate("/end")
        }

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