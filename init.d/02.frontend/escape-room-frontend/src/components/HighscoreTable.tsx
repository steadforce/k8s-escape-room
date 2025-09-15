import { useEffect, useRef } from 'react';
import { useGameStateContext } from '../hooks/useGameStateContext'
import './HighscoreTable.css';

const RANK_LOSS_WARNING_THRESHOLD_SECONDS = 20; // seconds

function HighscoreTable(props: { mode?: "default" | "ingame" }) {
    const gameState = useGameStateContext();
    const currentPlayerRef = useRef<HTMLTableRowElement | null>(null);

    useEffect(() => {
        if (currentPlayerRef.current) {
        currentPlayerRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
        }
    }, [gameState.scores()]);

    const getHighscoreList = () => {
        let scores = gameState.scores()
            .sort((a, b) => a.score.localeCompare(b.score));
        if (props.mode !== "ingame") {
            // Do not show current player in default mode
            scores = scores.filter(score => !score.current);
        }
        return scores
            .map((entry, index) => ({ rank: index + 1, ...entry}));
    }

    const isCurrentPlayerAboutToLoseRank = (): boolean => {
        const highscoreList = getHighscoreList();
        const currentIndex = highscoreList.findIndex(entry => entry.current);
        const current = highscoreList.find(entry => entry.current);
        const nextPlayer = highscoreList[currentIndex + 1];
        
        if (!nextPlayer) return false;
        
        const currentSeconds = timeStringToSeconds(current?.score || "00:00:00");
        const nextSeconds = timeStringToSeconds(nextPlayer.score);
        
        return nextSeconds - currentSeconds <= RANK_LOSS_WARNING_THRESHOLD_SECONDS;
    }

    const timeStringToSeconds = (time: string): number => {
        const [hours, minutes, seconds] = time.split(":").map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    }

    return (
        <>
            <div className={[
                    "highscoreContainer",
                    props.mode === "ingame" ? "ingame" : ""
                ].join(" ")}
            >
                <h2>Highscores</h2>
                <div className="highscoreTableContainer">
                    <table className="highscoreTable" id="highscoreTable">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Wizard</th>
                                <th>Time needed</th>
                            </tr>
                        </thead>
                        <tbody id="highscoreTableBody">
                        {getHighscoreList().map((score, index) => (
                            <tr key={index}
                                className={[
                                    score.current ? "current" : "",
                                    (score.current && isCurrentPlayerAboutToLoseRank()) ? "danger" : "",
                                ].join(" ")}
                                ref={score.current ? currentPlayerRef : null}
                            >
                                <td>
                                    <strong>{score.rank}</strong>
                                    {score.current && isCurrentPlayerAboutToLoseRank() && <span className="down-arrow">🔻</span>}
                                </td>
                                <td>
                                    {score.current && <span className="you-badge">You</span>}
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
            </div>
        </>
    );
}

export default HighscoreTable;
