import { useContext } from "react";
import type { GameStateContextType } from "../components/GameStateContextTypes";
import { GameStateContext } from "@main/components/GameStateContext";

export const useGameStateContext = (): GameStateContextType => {
    const context = useContext(GameStateContext);
    if (!context) {
        throw new Error("useGameStateContext must be used within a provider");
    }
    return context;
};