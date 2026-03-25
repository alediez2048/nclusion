import { create } from "zustand";

interface AppState {
	userId: string | null;
	language: "ht" | "fr";
	isOnline: boolean;
	setUserId: (userId: string | null) => void;
	setLanguage: (language: "ht" | "fr") => void;
	setOnline: (online: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
	userId: null,
	language: "ht",
	isOnline: navigator.onLine,
	setUserId: (userId) => set({ userId }),
	setLanguage: (language) => set({ language }),
	setOnline: (isOnline) => set({ isOnline }),
}));
