import { createContext, useContext, useEffect, useMemo, useState } from "react";

type GameStateContextType = {
    timeElapsed: () => string;
    progress: () => boolean[];
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

const checkState = () => {
    const catState = fetch("/cat").then(r => {return r.ok});
    const orbState = fetch("/orb").then(r => {return r.ok});
    const tomeState = fetch("/tome").then(r => {return r.ok});
    const photoFrameState = fetch("/photoframe/photo0.png").then(r => {return r.ok});

    return Promise.all([catState, orbState, tomeState, photoFrameState]);
}

const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

export const GameStateContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tick, setTick] = useState<number>(0);
    const [date, setDate] = useState<Date>(new Date());
    const [puzzles, setPuzzles] = useState<PuzzlesType>(initialPuzzles());

    const timeElapsed = () => {
        return new Date(new Date().getTime() - date.getTime()).toISOString().substring(11, 19);
    };

    const progress = (): boolean[] => {
        return Object.values(puzzles)
            .map(check => check.solved);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTick(tick => tick + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const contextValue = useMemo(
        () => ({
            timeElapsed,
            progress,
        }), [date, tick]
    );

    return <GameStateContext.Provider value={contextValue}>{children}</GameStateContext.Provider>;
}

export const useGameStateContext = () => {
    const context = useContext(GameStateContext);
    if (!context) {
        throw new Error("useGameStateContext must be used within a provider");
    }
    return context;
}