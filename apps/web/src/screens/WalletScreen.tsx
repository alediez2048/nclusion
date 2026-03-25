import { useTranslation } from "react-i18next";

export function WalletScreen() {
	const { t } = useTranslation();

	return (
		<div className="px-4 pb-20">
			<h1 className="text-white font-bold text-2xl mt-4 mb-4">{t("nav.wallet")}</h1>

			<div className="bg-dark-card border border-gray-700 rounded-lg p-6 text-center">
				<p className="text-gray-400 text-sm">{t("balance.available")}</p>
				<p className="text-gold text-4xl font-bold mt-1">5,000.00</p>
				<p className="text-gray-400 text-sm mt-1">HTGN</p>
			</div>

			<div className="grid grid-cols-2 gap-3 mt-4">
				<div className="bg-dark-card border border-gray-700 rounded-lg p-4 text-center">
					<p className="text-gray-400 text-xs">{t("balance.in_active_bets")}</p>
					<p className="text-white font-bold text-lg mt-1">0.00</p>
				</div>
				<div className="bg-dark-card border border-gray-700 rounded-lg p-4 text-center">
					<p className="text-gray-400 text-xs">{t("balance.pending_settlement")}</p>
					<p className="text-white font-bold text-lg mt-1">0.00</p>
				</div>
			</div>
		</div>
	);
}
