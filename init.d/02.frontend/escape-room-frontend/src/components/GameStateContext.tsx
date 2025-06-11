import { createContext, useContext, useMemo, useState } from "react";

type GameStateContextType = {
    timeElapsed: () => string;
};

const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

export const GameStateContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [date, setDate] = useState<Date>(new Date());

    const timeElapsed = () => {
        return new Date(new Date().getTime() - date.getTime()).toISOString().substring(11, 19);
    };

    const contextValue = useMemo(
        () => ({
            timeElapsed,
        }), [date]
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