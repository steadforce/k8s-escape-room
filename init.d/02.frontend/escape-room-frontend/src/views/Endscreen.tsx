import './Endscreen.css'
import banner from '../assets/banner.png'
import { Link } from 'react-router-dom'
import { useGameStateContext } from '../components/GameStateContext'

function Endscreen() {
    const gameState = useGameStateContext();

    const timeTaken = () => {
        if (gameState && gameState.scores().length > 0) {
            return gameState.scores()[0].score;
        }
        return "";
    }

    return (
        <>
            <div className="screen" id="endscreen">
                <img src={banner} className="banner" alt="Banner" />
                <h1>
                    Congratulations <span>&#127881;</span><span>&#127881;</span
                    ><span>&#127881;</span>
                </h1>
                <h2>You finished the Kubernetes Escape Room Game</h2>
                <p className="comment">You took <em id="timeTaken">{timeTaken()}</em>. Great job!</p>
                <h2>Highscores</h2>
                <table className="highscoreTable" id="highscoreTable">
                    <thead>
                        <tr>
                            <th>Wizard</th>
                            <th>Time needed</th>
                        </tr>
                    </thead>
                    <tbody id="highscoreTableBody">
                        {[...gameState.scores()].sort((a, b) => a.score.localeCompare(b.score)).map((score, index) => (
                            <tr key={index}>
                                <td>
                                    {score.name}
                                </td>
                                <td>
                                    {score.score}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p className="comment" id="resetInstruction">Reset the game by running the <em>. init.sh</em> script before starting a new game.</p>
                <br />
                <Link className="screenbutton" to="/" onClick={gameState.restart}>
                    New Game <span>&emsp;</span><span>&#10140;</span>
                </Link>
            </div>
        </>
    )
}

export default Endscreen