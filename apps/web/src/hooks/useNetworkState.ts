import { useEffect } from "react";
import { useAppStore } from "../store/useAppStore";

export type ConnectionStatus = "offline" | "synced";

export function useNetworkState() {
	const isOnline = useAppStore((s) => s.isOnline);
	const setOnline = useAppStore((s) => s.setOnline);

	useEffect(() => {
		const onOnline = () => setOnline(true);
		const onOffline = () => setOnline(false);
		window.addEventListener("online", onOnline);
		window.addEventListener("offline", onOffline);
		return () => {
			window.removeEventListener("online", onOnline);
			window.removeEventListener("offline", onOffline);
		};
	}, [setOnline]);

	return {
		status: (isOnline ? "synced" : "offline") as ConnectionStatus,
		isOffline: !isOnline,
	};
}
