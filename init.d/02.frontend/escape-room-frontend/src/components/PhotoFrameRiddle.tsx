import { useEffect, useState } from "react"
import redcircle from "../assets/redcircle.png";
import { useGameStateContext } from "./GameStateContext";

function PhotoFrameRiddle() {
    const gameState = useGameStateContext();
    const [photo, setPhoto] = useState("")

    useEffect(() => {
        const updatePhoto = () => {
            if (gameState.puzzlesState().photo.solved) {
                const photoNumber = Math.floor(Math.random() * 10);
                const photoUrl = `/photoframe/photo${photoNumber}.png`;
                setPhoto(photoUrl);
            } else {
                setPhoto("");
            }
        }

        const intervalId = setInterval(async () => {
            updatePhoto()
        }, 2000);

        return () => clearInterval(intervalId);
    }, [])
    return (
        <>
            <img id="photoFrame" className="photoFrame" hidden={!gameState.puzzlesState().photo.solved} src={photo}/>
            <img
                id="photoHint"
                className="photoHint"
                src={redcircle}
                title="The magic frame can't find any photos!"
                hidden={gameState.puzzlesState().photo.solved}
            />
        </>
    )
}

export default PhotoFrameRiddle