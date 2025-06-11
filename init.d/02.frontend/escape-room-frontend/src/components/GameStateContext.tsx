import { createContext, useContext, useMemo } from "react";

type GameStateContextType = {
    f: () => void;
};

const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

export const GameStateContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const f = () => {
        console.log("f");
    };

    const contextValue = useMemo(
        () => ({
            f,
        }), []
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