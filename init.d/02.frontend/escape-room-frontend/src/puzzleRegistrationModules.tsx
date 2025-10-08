import type { PuzzleRegistrationModule } from "./AddonLoader";

// Determine expected total number of puzzles (core + addon) synchronously so UI can remain stable.
// Core puzzle count is currently fixed at 4 (cat, orb, photo, tome). We infer addon puzzle count
// by counting registration modules that belong to allowed add-ons.

export const puzzleRegistrationModules = import.meta.glob<PuzzleRegistrationModule>(
    '../addons/k8s-escape-room-*/components/*Puzzles.tsx',
    { eager: true }
);
