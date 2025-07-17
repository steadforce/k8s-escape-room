import { useGameStateContext } from "./GameStateContext";

function HighscoreTable() {
    const gameState = useGameStateContext();

    return (
        <div className="highscore">
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
        </div>
    )
}

export default HighscoreTable