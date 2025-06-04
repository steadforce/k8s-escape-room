import { useContext } from "react"
import { GameContext } from "../main"

function GameStatus() {
    const startTime = useContext(GameContext)
    return (
        <>
            { new Date(new Date().getTime() - startTime.getTime()).toISOString().substring(11, 19) }
        </>
    )
}

export default GameStatus