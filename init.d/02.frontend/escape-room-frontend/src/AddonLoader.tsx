import React, { useLayoutEffect } from "react";
import { useGameStateContext } from "@main/hooks/useGameStateContext";

// All requested add ons
const allowedPaths: string[] = import.meta.env.VITE_ADDON_PATHS?.split(",").map((p: string) => p.trim()).filter(Boolean) || [];

// All existing add ons (views) - eagerly imported so they are available synchronously
const allModules = import.meta.glob<{ default: React.FC }>(
  '../addons/k8s-escape-room-*/views/*.tsx',
  { eager: true }
);

console.log("allowedPaths:", allowedPaths);
console.log("allModules:", allModules);

// All views from the addons listed in the environment variable
const addonModules = Object.entries(allModules).filter(([filePath]) =>
{ 
  // Extract addon name
  const match = filePath.match(/k8s-escape-room-[^/\\]+/);
  console.log("Check add on name", match);
  const addonName = match ? match[0] : "";
  // allowedPaths contains '../', as prefix
  return allowedPaths.some(p => p.replace(/^\.\.\//, "") === addonName);
});

export const AddonRoutes = addonModules.map(([filePath, mod]: [string, any]) => {
  // Generate url of module from view file name
  const fileName = filePath.split("/").pop()?.replace(/\.tsx$/, "") || "addon";
  const routePath = `/${fileName.toLowerCase()}`;

  const Component: React.FC | undefined = mod?.default;

  return {
    name: fileName,
    path: routePath,
    element: Component ? <Component /> : <div>Missing add-on view: {fileName}</div>
  };
});

// Find all *Puzzles.tsx registration modules in add-on components
export function useRegisterAddonPuzzles() {
  const { registerAddonPuzzles } = useGameStateContext();

  useLayoutEffect(() => {
    const puzzleRegistrations = import.meta.glob<{ default: (register: typeof registerAddonPuzzles) => void }>(
      '../addons/k8s-escape-room-*/components/*Puzzles.tsx',
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

// Determine expected total number of puzzles (core + addon) synchronously so UI can remain stable.
// Core puzzle count is currently fixed at 4 (cat, orb, photo, tome). We infer addon puzzle count
// by counting registration modules that belong to allowed add-ons.
const puzzleRegistrationModules = import.meta.glob<{ default: (register: any) => void }>(
  '../addons/k8s-escape-room-*/components/*Puzzles.tsx',
  { eager: true }
);

export const expectedPuzzleTotal = (() => {
  const CORE_PUZZLES = 4;
  const addonPuzzleCount = Object.keys(puzzleRegistrationModules).filter(filePath => {
    const match = filePath.match(/k8s-escape-room-[^/\\]+/);
    const addonName = match ? match[0] : '';
    return allowedPaths.some(p => p.replace(/^\.\.\//, '') === addonName);
  }).length; // one per *Puzzles.tsx file currently
  return CORE_PUZZLES + addonPuzzleCount;
})();