// All requested add ons

export const allowedPaths: string[] = import.meta.env.VITE_ADDON_PATHS?.split(",").map((p: string) => p.trim()).filter(Boolean) || [];
