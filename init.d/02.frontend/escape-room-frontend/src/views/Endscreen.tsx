import './Endscreen.css'
import banner from '/banner.png'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'

function Endscreen() {
    const [_highscores, _setHighscores] = useState([
        {
            "score": 10,
            "name": "Test"
        }
    ])
    return (
        <>
            <div className="screen" id="endscreen">
                <img src={banner} className="banner" alt="Banner" />
                <h1>
                    Congratulations <span>&#127881;</span><span>&#127881;</span
                    ><span>&#127881;</span>
                </h1>
                <h2>You finished the Kubernetes Escape Room Game</h2>
                <p className="comment">You took <em id="timeTaken"></em>. Great job!</p>
                <h2>Highscores</h2>
                <table className="highscoreTable" id="highscoreTable">
                    <thead>
                        <tr>
                            <th>Wizard</th>
                            <th>Time needed</th>
                        </tr>
                    </thead>
                    <tbody id="highscoreTableBody">
                    </tbody>
                </table>
                <p className="comment" id="resetInstruction">Reset the game by running the <em>. init.sh</em> script before starting a new game.</p>
                <br />
                <Link className="screenbutton" to="/">
                    New Game <span>&emsp;</span><span>&#10140;</span>
                </Link>
            </div>
        </>
    )
}

export default Endscreen