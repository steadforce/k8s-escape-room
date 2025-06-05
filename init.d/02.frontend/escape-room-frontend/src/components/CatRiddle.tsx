import { useEffect, useState } from "react"

function CatRiddle() {
    const [solved, setSolved] = useState(false)

    useEffect(() => {
        const checkCatState = async () => {
            await fetch("/cat").then(r => {
                setSolved(r.ok)
            })
        }

        const intervalId = setInterval(() => {
            checkCatState()
        }, 2000)

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    return (
        <>
            <div id="catContainer" className="catContainer">
                <img id="cat" className="cat" src={solved ? "/cat.png" : "/redcircle.png"}/>
            </div>
        </>
    )
}

export default CatRiddle