import { useTranslation } from "react-i18next";

const MOCK_MATCHES = [
	{ id: "1", home: "Haiti", away: "Brazil", time: "Jun 15, 18:00", oddsH: 5.50, oddsD: 3.80, oddsA: 1.65 },
	{ id: "2", home: "France", away: "Argentina", time: "Jun 16, 20:00", oddsH: 2.10, oddsD: 3.40, oddsA: 3.60 },
	{ id: "3", home: "Germany", away: "Japan", time: "Jun 17, 15:00", oddsH: 1.85, oddsD: 3.50, oddsA: 4.20 },
];

export function HomeScreen() {
	const { t } = useTranslation();

	return (
		<div className="px-4 pb-20">
			{/* Balance card */}
			<div className="bg-dark-card border border-gray-700 rounded-lg p-4 mt-4">
				<p className="text-gray-400 text-sm mb-1">{t("balance.available")}</p>
				<p className="text-gold text-3xl font-bold">5,000.00 <span className="text-lg">HTGN</span></p>
				<div className="flex gap-4 mt-3 text-sm">
					<div>
						<span className="text-gray-400">{t("balance.in_active_bets")}: </span>
						<span className="text-white">0.00</span>
					</div>
					<div>
						<span className="text-gray-400">{t("balance.pending_settlement")}: </span>
						<span className="text-white">0.00</span>
					</div>
				</div>
			</div>

			{/* Matches */}
			<h2 className="text-white font-bold text-lg mt-6 mb-3">Match yo</h2>
			<div className="space-y-3">
				{MOCK_MATCHES.map((match) => (
					<div key={match.id} className="bg-dark-card border border-gray-700 rounded-lg p-4 hover:border-gray-400 transition-all cursor-pointer">
						<div className="flex justify-between items-center mb-3">
							<span className="text-white font-semibold">{match.home} <span className="text-gray-400">kont</span> {match.away}</span>
							<span className="text-gray-400 text-sm">{match.time}</span>
						</div>
						<div className="grid grid-cols-3 gap-2">
							<button className="bg-dark-navy border border-gray-700 rounded-lg py-2 text-center hover:border-gold transition-colors">
								<div className="text-gray-400 text-xs mb-1">{t("bet.home_win")}</div>
								<div className="text-white font-bold">{match.oddsH.toFixed(2)}</div>
							</button>
							<button className="bg-dark-navy border border-gray-700 rounded-lg py-2 text-center hover:border-gold transition-colors">
								<div className="text-gray-400 text-xs mb-1">{t("bet.draw")}</div>
								<div className="text-white font-bold">{match.oddsD.toFixed(2)}</div>
							</button>
							<button className="bg-dark-navy border border-gray-700 rounded-lg py-2 text-center hover:border-gold transition-colors">
								<div className="text-gray-400 text-xs mb-1">{t("bet.away_win")}</div>
								<div className="text-white font-bold">{match.oddsA.toFixed(2)}</div>
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
