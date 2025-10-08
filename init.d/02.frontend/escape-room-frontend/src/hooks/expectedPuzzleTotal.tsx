import { allowedPaths } from "../allowedPaths";
import { puzzleRegistrationModules } from "../puzzleRegistrationModules";

export const expectedPuzzleTotal = (() => {
    const CORE_PUZZLES = 4;
    const addonPuzzleCount = Object.keys(puzzleRegistrationModules).filter(filePath => {
        const match = filePath.match(/k8s-escape-room-[^/\\]+/);
        const addonName = match ? match[0] : '';
        return allowedPaths.some(p => p.replace(/^\.\.\//, '') === addonName);
    }).length; // one per *Puzzles.tsx file currently
    return CORE_PUZZLES + addonPuzzleCount;
})();
