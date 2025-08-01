import { useGameStateContext } from "./GameStateContext";
import "./HighscorePreview.css";

function HighscorePreview() {
    const gameState = useGameStateContext();

    return (
        <div className="highscorePreview">
            <h4>Highscores</h4>
            <table className="highscore" id="highscore">
                <thead>
                    <tr>
                        <th>Wizard</th>
                        <th>Time needed</th>
                    </tr>
                </thead>
                <tbody id="highscorePreviewBody">
                    {[...gameState.scores()].slice(0, 3).sort((a, b) => a.score.localeCompare(b.score)).map((score, index) => (
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
        </div>
    )
}

export default HighscorePreview