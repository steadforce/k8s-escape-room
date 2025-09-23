import React, { useEffect } from "react";
import { useGameStateContext } from "@main/hooks/useGameStateContext";

// All requested add ons
const allowedPaths: string[] = import.meta.env.VITE_ADDON_PATHS?.split(",").map((p: string) => p.trim()).filter(Boolean) || [];

// All existing add ons
const allModules = import.meta.glob<{ default: React.FC }>(
  '../addons/k8s-escape-room-*/views/*.tsx'
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

export const AddonRoutes = addonModules.map(([filePath, loader]: [string, () => Promise<{ default: React.FC }>]) => {
  // Generate url of module from view file name
  const fileName = filePath.split("/").pop()?.replace(/\.tsx$/, "") || "addon";
  const routePath = `/${fileName.toLowerCase()}`;

  const Component = React.lazy(loader);

  return {
    name: fileName,
    path: routePath,
    element: <Component />
  };
});

// Find all *Puzzles.tsx registration modules in add-on components
export function useRegisterAddonPuzzles() {
  const { registerAddonPuzzles } = useGameStateContext();

  useEffect(() => {
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