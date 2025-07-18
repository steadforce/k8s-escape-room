import { useEffect, useState } from "react"
import redcircle from "../assets/redcircle.png";
import { useGameStateContext } from "./GameStateContext";
import Tooltip from "./Tooltip";

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
            <div className="photoContainer">
                <img id="photoFrame" className="photoFrame" hidden={!gameState.puzzlesState().photo.solved} src={photo}/>
                <Tooltip text="The magic frame can't find any photos!" position="left">
                    <img
                        id="photoHint"
                        className="photoHint"
                        src={redcircle}
                        title=""
                        hidden={gameState.puzzlesState().photo.solved}
                    />
                </Tooltip>
            </div>
        </>
    )
}

export default PhotoFrameRiddle