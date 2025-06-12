import { useEffect, useState } from "react"
import redcircle from "../assets/redcircle.png";
import opentome from "../assets/openedtome.png";
import closedtome from "../assets/closedtome.png";

function TomeRiddle() {
    const [solved, setSolved] = useState(false)

    useEffect(() => {
        const checkTomeState = async () => {
            await fetch("/tome").then(r => {
                setSolved(r.ok)
            })
        }

        setInterval(async () => {
            await checkTomeState()
        }, 2000)
    }, [])
    return (
        <>
            <img id="tome" className="tome" src={solved ? opentome : closedtome}/>
            <img
                id="tomeHint"
                className="tomeHint"
                src={redcircle}
                title="The key to open the tome seems to be missing."
                hidden={solved}
            />
        </>
    )
}

export default TomeRiddle