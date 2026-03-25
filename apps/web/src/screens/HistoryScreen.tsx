import { useTranslation } from "react-i18next";

export function HistoryScreen() {
	const { t } = useTranslation();

	return (
		<div className="px-4 pb-20">
			<h1 className="text-white font-bold text-2xl mt-4 mb-4">{t("nav.history")}</h1>
			<div className="bg-dark-card border border-gray-700 rounded-lg p-8 text-center">
				<p className="text-gray-400">Pa gen pari ankò</p>
				<p className="text-gray-400 text-sm mt-1">Plase premye pari ou!</p>
			</div>
		</div>
	);
}
