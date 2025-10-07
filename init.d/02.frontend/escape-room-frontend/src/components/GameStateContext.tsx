import { createContext } from "react";
import type { GameStateContextType } from "./GameStateContextTypes";

export const GameStateContext = createContext<GameStateContextType | undefined>(undefined);
