import { useEffect, useState } from "react"
import redcircle from "../assets/redcircle.png";

function PhotoFrameRiddle() {
    const [solved, setSolved] = useState(false)
    const [photo, setPhoto] = useState("")

    useEffect(() => {
        const checkPhotoFrameState = async () => {
            const photoNumber = Math.floor(Math.random() * 10);
            const photoUrl = `/photoframe/photo${photoNumber}.png`;
            await fetch(photoUrl).then(r => {
                setSolved(r.ok)
                setPhoto(photoUrl)
            })
        }

        setInterval(async () => {
            await checkPhotoFrameState()
        }, 2000)
    }, [])
    return (
        <>
            <img id="photoFrame" className="photoFrame" hidden={!solved} src={photo}/>
            <img
                id="photoHint"
                className="photoHint"
                src={redcircle}
                title="The magic frame can't find any photos!"
                hidden={solved}
            />
        </>
    )
}

export default PhotoFrameRiddle