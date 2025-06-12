import { useEffect, useState } from "react";
import cat from "../assets/cat.png";
import redcircle from "../assets/redcircle.png";

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
                <img id="cat" className="cat" src={solved ? cat : redcircle}/>
            </div>
        </>
    )
}

export default CatRiddle