import { useEffect, useState } from "react"

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
            <img id="tome" className="tome" src={solved ? "/openedtome.png" : "/closedtome.png"}/>
            <img
                id="tomeHint"
                className="tomeHint"
                src="/redcircle.png"
                title="The key to open the tome seems to be missing."
                hidden={solved}
            />
        </>
    )
}

export default TomeRiddle