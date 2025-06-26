import { createContext, useContext, useEffect, useMemo, useState } from "react";
import useStorage from "../hooks/useStorage";
import Startscreen from "../views/Startscreen";
import Endscreen from "../views/Endscreen";

type GameStateContextType = {
    timeElapsed: () => string;
    progress: () => boolean[];
    start: (name: string) => void;
    restart: () => void;
    scores: () => {name: string, score: string}[];
    puzzlesState: () => PuzzlesType;
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
    const [puzzles, setPuzzles] = useState<PuzzlesType>(initialPuzzles());
    const [date, setDate, removeDate] = useStorage('date', new Date());
    const [started, setStarted, removeStarted] = useStorage('started', false);
    const [finished, setFinished, removeFinished] = useStorage('finished', false);
    const [name, setName, removeName] = useStorage('name', "");
    const [highscores, setHighscores, _removeHighscores] = useStorage('highscores', []);

    const timeElapsed = (): string => {
        return new Date(new Date().getTime() - new Date(date).getTime()).toISOString().substring(11, 19);
    };

    const progress = (): boolean[] => {
        return Object.values(puzzles)
            .map(check => check.solved);
    };

    const start = (name: string): void => {
        setName(name);
        setDate(new Date());
        setStarted(true);
    };

    const unsolved = (): boolean => {
        return progress().every(b => b === false);
    }

    const restart = () => {
        if (unsolved()) {
            removeName();
            removeFinished();
            removeStarted();
            removeDate();
        } else {
            alert("Reset cluster state by running the ./remove-resources.sh and the . init.sh script first.");
        }
    }

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

    const puzzlesState = (): PuzzlesType => {
        return puzzles;
    }

    const checkState = () => {
        const catPromise = fetch("/cat").then(r => r.ok);
        const catCounterPromise = fetch("/cat-counter").then(r => r.text()).then(t => t.replace(/"/g, '')).then(n => Number(n));
        const orbPromise = fetch("/orb").then(r => r.ok);
        const tomePromise = fetch("/tome").then(r => r.ok);
        const photoFramePromise = fetch("/photoframe/photo0.png").then(r => r.ok);

        Promise.all([catPromise, catCounterPromise, orbPromise, tomePromise, photoFramePromise])
            .then(([catResult, catCounter, orbResult, tomeResult, photoFrameResult]) => {
                setPuzzles({
                    cat: {
                        solved: catResult,
                        replicas: catCounter,
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
            restart,
            scores,
            puzzlesState
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