import React from "react";
import type { GameStateContextType } from "./components/GameStateContextTypes"; // adjust path if needed
import { allowedPaths } from "./allowedPaths";

// Type representing the registration callback supplied by context
type RegisterAddonPuzzlesFn = GameStateContextType["registerAddonPuzzles"]; 
// Type for a module that exports a default registration function
export type PuzzleRegistrationModule = { default: (register: RegisterAddonPuzzlesFn) => void };
// Type for an eagerly imported view component module
type AddonViewModule = { default: React.FC };

// All existing add ons (views) - eagerly imported so they are available synchronously
const allModules = import.meta.glob<AddonViewModule>(
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

export const AddonRoutes = addonModules.map(([filePath, mod]: [string, AddonViewModule]) => {
  // Generate url of module from view file nameya
  const fileName = filePath.split("/").pop()?.replace(/\.tsx$/, "") || "addon";
  const routePath = `/${fileName.toLowerCase()}`;

  const Component: React.FC | undefined = mod?.default;

  return {
    name: fileName,
    path: routePath,
    element: Component ? <Component /> : <div>Missing add-on view: {fileName}</div>
  };
});
