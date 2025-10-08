import { useEffect, useRef, useMemo } from 'react';
import { useGameStateContext } from '../hooks/useGameStateContext'
import './HighscoreTable.css';

const RANK_LOSS_WARNING_THRESHOLD_SECONDS = 20; // seconds

function HighscoreTable(props: { mode?: "default" | "ingame" }) {
    const gameState = useGameStateContext();
    const currentPlayerRef = useRef<HTMLTableRowElement | null>(null);

    // Single snapshot per render
    const scoresSnapshot = gameState.scores();

    const highscoreList = useMemo(() => {
        const sorted = [...scoresSnapshot].sort((a, b) => a.score.localeCompare(b.score));
        const filtered = props.mode === "ingame"
            ? sorted
            : sorted.filter(s => !s.current);
        return filtered.map((entry, index) => ({ rank: index + 1, ...entry }));
    }, [scoresSnapshot, props.mode]);

    const currentIndex = useMemo(
        () => highscoreList.findIndex(e => e.current),
        [highscoreList]
    );

    const timeStringToSeconds = (time: string): number => {
        const [h, m, s] = time.split(":").map(Number);
        return h * 3600 + m * 60 + s;
    };

    const isCurrentPlayerAboutToLoseRank = useMemo(() => {
        if (currentIndex === -1) return false;
        const current = highscoreList[currentIndex];
        const next = highscoreList[currentIndex + 1];
        if (!current || !next) return false;
        const currSec = timeStringToSeconds(current.score);
        const nextSec = timeStringToSeconds(next.score);
        return (nextSec - currSec) <= RANK_LOSS_WARNING_THRESHOLD_SECONDS;
    }, [highscoreList, currentIndex]);

    // Only run when the index changes (not every score tick)
    useEffect(() => {
        if (currentIndex !== -1 && currentPlayerRef.current) {
            currentPlayerRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [currentIndex]);

    return (
        <div className={["highscoreContainer", props.mode === "ingame" ? "ingame" : ""].join(" ")}>
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
                        {highscoreList.map(score => {
                            const danger = score.current && isCurrentPlayerAboutToLoseRank;
                            return (
                                <tr
                                    key={score.rank}
                                    className={[
                                        score.current ? "current" : "",
                                        danger ? "danger" : "",
                                    ].join(" ")}
                                    ref={score.current ? currentPlayerRef : null}
                                >
                                    <td>
                                        <strong>{score.rank}</strong>
                                        {score.current && danger && <span className="down-arrow">🔻</span>}
                                    </td>
                                    <td>
                                        {score.current && <span className="you-badge">You</span>}
                                        {score.name}
                                    </td>
                                    <td>{score.score}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default HighscoreTable;
