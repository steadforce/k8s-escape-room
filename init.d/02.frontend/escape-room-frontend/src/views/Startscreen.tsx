import { Link } from 'react-router-dom'
import banner from '../assets/banner.png'
import './Startscreen.css'
import HighscoreTable from '../components/HighscoreTable'
import { useGameStateContext } from '../components/GameStateContext'
import { useState } from 'react';

function Startscreen() {
    const [name, setName] = useState("");
    const gameState = useGameStateContext();

    return (
        <>
            <div className="screen" id="startscreen">
                <img src={banner} className="banner" alt="Banner" />
                <h1>Welcome to the Kubernetes Escape Room Game</h1>
                <div className="columns">
                    <div>
                        <p className="intro">
                            You are a wizard apprentice. While your teacher is out of house you
                            decided to sneak into his study to practice some spells. Maybe try out
                            some magic artifacts you find there. But while reciting an incantation
                            you found in a hidden tome something went horribly wrong. Important
                            things are missing or not working anymore. It is now on you to fix what
                            has been broken.
                            <br />
                            <br />
                            <i>
                                Broken parts in the study are marked with a red circle. Hovering there
                                with your cursor gives you a hint for what you might be looking for.
                            </i>
                        </p>
                        <h2>Good luck, have fun</h2>
                        <input
                            type="text"
                            className="nameInput"
                            id="nameInput"
                            name="nameInput"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                            autoFocus
                            placeholder="Your wizard name"
                        />
                        <Link className="screenbutton" to="/" onClick={() => gameState.start(name)}>
                            Start <span>&emsp;</span><span>&#10140;</span>
                        </Link>
                    </div>
                    <div>
                        <div className="highscoresTableContainer">
                            <HighscoreTable />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Startscreen