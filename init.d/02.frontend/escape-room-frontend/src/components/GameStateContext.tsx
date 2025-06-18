import { createContext, useContext, useEffect, useMemo, useState } from "react";
import useStorage from "../hooks/useStorage";
import Startscreen from "../views/Startscreen";
import Endscreen from "../views/Endscreen";

type GameStateContextType = {
    timeElapsed: () => string;
    progress: () => boolean[];
    start: (name: string) => void;
    scores: () => {name: string, score: string}[];
};

type PuzzlesType = {
    cat: {
        solved: boolean,
        replicas: number,
    },
    orb: {
        solved: boolean,
    },
    photo: {
        solved: boolean,
        url: string,
    },
    tome: {
        solved: boolean
    }
};

const initialPuzzles = () => {
    return {
        cat: {
            solved: false,
            replicas: 0,
        },
        orb: {
            solved: false,
        },
        photo: {
            solved: false,
            url: "",
        },
        tome: {
            solved: false,
        }
    }
}


const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

export const GameStateContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tick, setTick] = useState<number>(0);
    const [date, _setDate] = useState<Date>(new Date());
    const [puzzles, setPuzzles] = useState<PuzzlesType>(initialPuzzles());
    const [started, setStarted, removeStarted] = useStorage('started', false);
    const [finished, setFinished, removeFinished] = useStorage('finished', false);
    const [name, setName, removeName] = useStorage('name', "");
    const [highscores, setHighscores, removeHighscores] = useStorage('highscores', []);

    const timeElapsed = () => {
        return new Date(new Date().getTime() - date.getTime()).toISOString().substring(11, 19);
    };

    const progress = (): boolean[] => {
        return Object.values(puzzles)
            .map(check => check.solved);
    };

    const start = (name: string): void => {
        setName(name);
        setStarted(true);
    };

    const checkFinished = (): void => {
        if (!finished && progress().every(Boolean)) {
            const highscore = {
                name: name,
                score: timeElapsed(),
            };
            setHighscores([...highscores, highscore]);
            setFinished(true);
        }
    }

    const scores = () => {
        return highscores;
    }

    const checkState = () => {
        const catPromise = fetch("/cat").then(r => r.ok);
        const orbPromise = fetch("/orb").then(r => r.ok);
        const tomePromise = fetch("/tome").then(r => r.ok);
        const photoFramePromise = fetch("/photoframe/photo0.png").then(r => r.ok);

        Promise.all([catPromise, orbPromise, tomePromise, photoFramePromise])
            .then(([catResult, orbResult, tomeResult, photoFrameResult]) => {
                setPuzzles({
                    cat: {
                        solved: catResult,
                        replicas: 0,
                    },
                    orb: {
                        solved: orbResult,
                    },
                    photo: {
                        solved: photoFrameResult,
                        url: "",
                    },
                    tome: {
                        solved: tomeResult,
                    }
                });
            });
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTick(tick => tick + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
    }, []);

    const contextValue = useMemo(
        () => ({
            timeElapsed,
            progress,
            checkState,
            start,
            scores,
        }), [date, tick]
    );

    useEffect(() => {
        checkState();
        checkFinished();
    }, [tick]);

    return <GameStateContext.Provider value={contextValue}>{started ? finished ? <Endscreen /> : children : <Startscreen />}</GameStateContext.Provider>;
}

export const useGameStateContext = (): GameStateContextType => {
    const context = useContext(GameStateContext);
    if (!context) {
        throw new Error("useGameStateContext must be used within a provider");
    }
    return context;
}