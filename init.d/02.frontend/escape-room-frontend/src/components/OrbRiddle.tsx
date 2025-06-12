import { useEffect, useState } from "react"
import orb from "../assets/orb.png";
import redcircle from "../assets/redcircle.png";

function OrbRiddle() {
    const [solved, setSolved] = useState(false)

    useEffect(() => {
        const checkOrbState = async () => {
            await fetch("/orb").then(r => {
                setSolved(r.ok)
            })
        }

        setInterval(async () => {
            await checkOrbState()
        }, 2000)
    }, [])
    return (
        <>
            <div className="orb" hidden={!solved}>
                <img id="orb" src={orb} />
                <img id="orbWisdom" className="orbWisdom" src="/orb" />
            </div>
            <img
                id="orbHint"
                className="orbHint"
                src={redcircle}
                title="The magic orb does not work!"
                hidden={solved}
            />
        </>
    )
}

export default OrbRiddle