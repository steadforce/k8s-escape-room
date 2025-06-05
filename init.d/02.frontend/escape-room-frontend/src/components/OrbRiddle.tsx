import { useEffect, useState } from "react"

function OrbRiddle() {
    const [solved, setSolved] = useState(false)

    useEffect(() => {
        const checkCatState = async () => {
            await fetch("/orb").then(r => {
                setSolved(r.ok)
            })
        }

        setInterval(async () => {
            await checkCatState()
        }, 2000)
    }, [])
    return (
        <>
            <div className="orb" hidden={!solved}>
                <img id="orb" src="/orb.png" />
                <img id="orbWisdom" className="orbWisdom" src="/orb" />
            </div>
            <img
                id="orbHint"
                className="orbHint"
                src="/redcircle.png"
                title="The magic orb does not work!"
                hidden={solved}
            />
        </>
    )
}

export default OrbRiddle