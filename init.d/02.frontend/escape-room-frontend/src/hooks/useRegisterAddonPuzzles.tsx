import { useLayoutEffect } from "react";
import { allowedPaths } from "@main/allowedPaths";
import type { PuzzleRegistrationModule } from "../AddonLoader";
import { useGameStateContext } from "./useGameStateContext";

// Find all *Puzzles.tsx registration modules in add-on components

export function useRegisterAddonPuzzles() {
  const { registerAddonPuzzles } = useGameStateContext();

  useLayoutEffect(() => {
    const puzzleRegistrations = import.meta.glob<PuzzleRegistrationModule>(
      '../../addons/k8s-escape-room-*/components/*Puzzles.tsx',
      { eager: true }
    );

    Object.entries(puzzleRegistrations).forEach(([filePath, module]) => {
      // Extract addon name
      const match = filePath.match(/k8s-escape-room-[^/\\]+/);
      const addonName = match ? match[0] : "";
      if (allowedPaths.some(p => p.replace(/^\.\.\//, "") === addonName)) {
        if (typeof module.default === "function") {
          module.default(registerAddonPuzzles);
        }
      }
    });
  }, [registerAddonPuzzles]);
}
