import './Endscreen.css'
import { Link } from 'react-router-dom'
import { useGameStateContext } from '../hooks/useGameStateContext'
import HighscoreTable from '../components/HighscoreTable';
import Banner from '../components/Banner';

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
                <Banner />
                <h1>
                    Congratulations <span>&#127881;</span><span>&#127881;</span
                    ><span>&#127881;</span>
                </h1>
                <h2>You finished the Kubernetes Escape Room Game</h2>
                <p className="comment">You took <em id="timeTaken">{timeTaken()}</em>. Great job!</p>
                <div className='highscoresTableContainer'>
                    <HighscoreTable />
                </div>
                <p className="comment" id="resetInstruction">Reset the game by running the <em>. init.sh</em> script before starting a new game.</p>
                <div>
                    <Link className="screenButton" to="/" onClick={gameState.restart}>
                        New Game <span>&emsp;</span><span>&#10140;</span>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Endscreen