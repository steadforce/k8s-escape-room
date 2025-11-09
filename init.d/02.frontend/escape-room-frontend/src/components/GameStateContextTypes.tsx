import { useEffect, useMemo, useState, useCallback } from "react";
import useStorage from "../hooks/useStorage";
import Endscreen from "../views/Endscreen";
import StartScreen from "../views/StartScreen";
import { GameStateContext } from "./GameStateContext";
import { unstable_batchedUpdates } from "react-dom";

export type GameStateContextType = {
    timeElapsed: () => string;
    progress: () => boolean[];
    checkState: () => void;
    start: (name: string) => void;
    restart: () => void;
    scores: () => Highscore[];
    puzzlesState: () => PuzzlesType;
    registerAddonPuzzles: (addonName: string, puzzleName: string, check: () => Promise<{ solved: boolean }>) => void;
    getFinishThreshold: () => number;
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
    },
    tome: {
        solved: boolean
    },
    // Add-ons can extend this with their own keys
    addons?: {
        [addonName: string]: {
            [puzzleName: string]: {
                solved: boolean,
            }
        }
    }
};

export type Highscore = {
    name: string,
    score: string,
    current?: boolean // true if this is the current player
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
        },
        tome: {
            solved: false,
        }
    }
}

export const GameStateContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tick, setTick] = useState<number>(0);
    const [puzzles, setPuzzles] = useState<PuzzlesType>(initialPuzzles());
    const [date, setDate, removeDate] = useStorage('date', new Date());
    const [started, setStarted, removeStarted] = useStorage('started', false);
    const [finished, setFinished, removeFinished] = useStorage('finished', false);
    const [name, setName, removeName] = useStorage('name', "");
    const [highscores, setHighscores] = useStorage('highscores', []);
    // Number of puzzles required to finish the game (0 = require all)
    const [finishThreshold] = useStorage('finishThreshold', 0);
    const [addonChecks, setAddonChecks] = useState<{
        [addonName: string]: { [puzzleName: string]: () => Promise<{ solved: boolean }> }
    }>({});

    const timeElapsed = useCallback((): string => {
        return new Date(new Date().getTime() - new Date(date).getTime()).toISOString().substring(11, 19);
    }, [date]);

    const progress = useCallback((): boolean[] => {
        // Core puzzles
        const coreSolved: boolean[] = [];
        Object.entries(puzzles)
            .filter(([key]) => key !== "addons")
            .forEach(([, value]) => {
                if (typeof value === "object" && value !== null && "solved" in value && typeof value.solved === "boolean") {
                    coreSolved.push(value.solved);
                }
            });

        // Add-on puzzles
        const addonSolved: boolean[] = [];
        if (puzzles.addons) {
            Object.values(puzzles.addons).forEach(addon =>
                Object.values(addon).forEach(puzzle =>
                    addonSolved.push(puzzle.solved)
                )
            );
        }

        return [...coreSolved, ...addonSolved];
    }, [puzzles]);

    const checkFinished = useCallback((): void => {
        const requireAll = finishThreshold === 0;
        const allSolved = progress().every(Boolean);
        const solvedCount = progress().filter(Boolean).length;
        const thresholdReached = solvedCount >= (finishThreshold || 0);
        if (!finished && (requireAll ? allSolved : thresholdReached)) {
            const highscore: Highscore = {
                name: name,
                score: timeElapsed(),
            };
            unstable_batchedUpdates(() => {
                setHighscores((prev: Highscore[]) => [highscore, ...prev.filter((score: Highscore) => score.name !== name)]);
                setFinished(true);
            });
        }
    }, [finished, progress, name, timeElapsed, setHighscores, setFinished, finishThreshold]);

    const scores = useCallback(() => {
        return [
            ...(!finished ? [{ name: name, score: timeElapsed(), current: true }] : []),
            ...highscores
        ];
    }, [finished, name, timeElapsed, highscores]);

    const start = useCallback((name: string): void => {
        if (!name) {
            alert("Please enter your wizard name.");
        } else if (scores().some(score => score.name === name)) {
            alert("There is already a wizard with that name. Please choose a different one.");
        } else {
            setName(name);
            setDate(new Date());
            setStarted(true);
        }
    }, [scores, setName, setDate, setStarted]);

    const unsolved = useCallback((): boolean => {
        return progress().every(b => b === false);
    }, [progress]);

    const restart = useCallback(() => {
        if (unsolved()) {
            removeName();
            removeFinished();
            removeStarted();
            removeDate();
        } else {
            alert("Reset cluster state by running the . init.sh script first.");
        }
    }, [unsolved, removeName, removeFinished, removeStarted, removeDate]);

    const puzzlesState = useCallback((): PuzzlesType => {
        return puzzles;
    }, [puzzles]);

    const checkState = useCallback(() => {
        const options: { cache: RequestCache | undefined } = { cache: "no-store" };

        const catPromise = fetch("/riddles/cat", options).then(r => r.ok);
        const catCounterPromise = fetch("/riddles/cat-counter", options).then(r => r.text()).then(t => t.replace(/"/g, '')).then(n => Number(n)).catch(e => {console.error(e); return 0;});
        const orbPromise = fetch("/riddles/orb", options).then(r => r.ok);
        const tomePromise = fetch("/riddles/tome", options).then(r => r.ok);
        const photoFramePromise = fetch("/riddles/photoframe/photo0.png", options).then(r => r.ok);

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
                    },
                    tome: {
                        solved: tomeResult,
                    }
                });
            });

        // Add-on puzzle checks
        const addonPromises: Promise<[string, string, { solved: boolean }]>[] = [];
        Object.entries(addonChecks).forEach(([addonName, puzzles]) => {
            Object.entries(puzzles).forEach(([puzzleName, fn]) => {
                addonPromises.push(
                    fn().then(result => [addonName, puzzleName, result] as [string, string, { solved: boolean }])
                );
            });
        });

        Promise.all([
            // core puzzle promises...
            Promise.all(addonPromises)
        ]).then(([
            // core puzzle results...
            addonResults
        ]) => {
            setPuzzles(prev => {
                const newAddons = { ...(prev.addons || {}) };
                (addonResults as [string, string, { solved: boolean }][]).forEach(([addonName, puzzleName, result]) => {
                    if (!newAddons[addonName]) newAddons[addonName] = {};
                    newAddons[addonName][puzzleName] = result;
                });
                return {
                    ...prev,
                    addons: newAddons
                };
            });
        });        
    }, [addonChecks, setPuzzles]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTick(tick => tick + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const registerAddonPuzzles = useCallback((
        addonName: string,
        puzzleName: string,
        check: () => Promise<{ solved: boolean }>
    ) => {
        setAddonChecks(prev => ({
            ...prev,
            [addonName]: {
                ...(prev[addonName] || {}),
                [puzzleName]: check
            }
        }));
    }, [setAddonChecks]);

    const getFinishThreshold = useCallback((): number => {
        return finishThreshold || 0;
    }, [finishThreshold]);

    const contextValue = useMemo(
        () => ({
            timeElapsed,
            progress,
            checkState,
            start,
            restart,
            scores,
            puzzlesState,
            registerAddonPuzzles,
            getFinishThreshold
        }), [timeElapsed, progress, checkState, start, restart, scores, puzzlesState, registerAddonPuzzles, getFinishThreshold]
    );

    useEffect(() => {
        const handler = setTimeout(() => {
            checkState();
            checkFinished();
        }, 300); // Debounce by 300ms

        return () => clearTimeout(handler);
    }, [tick, checkState, checkFinished]);

    return <GameStateContext.Provider value={contextValue}>{started ? finished ? <Endscreen /> : children : <StartScreen />}</GameStateContext.Provider>;
}