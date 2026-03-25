import { useTranslation } from "react-i18next";
import { useNetworkState } from "../hooks/useNetworkState";

export function ConnectivityBanner() {
	const { status } = useNetworkState();
	const { t } = useTranslation();

	if (status === "synced") return null;

	return (
		<div className="bg-red-600 text-white text-center py-1.5 text-sm font-semibold">
			{t("connectivity.offline")}
		</div>
	);
}
