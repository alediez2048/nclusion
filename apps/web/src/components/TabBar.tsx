import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function TabBar() {
	const { t } = useTranslation();

	const tabs = [
		{ to: "/", label: t("nav.home"), icon: "⚽" },
		{ to: "/history", label: t("nav.history"), icon: "📋" },
		{ to: "/wallet", label: t("nav.wallet"), icon: "💰" },
	];

	return (
		<nav className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-dark-card border-t border-gray-700 flex">
			{tabs.map((tab) => (
				<NavLink
					key={tab.to}
					to={tab.to}
					className={({ isActive }) =>
						`flex-1 flex flex-col items-center py-3 text-xs transition-colors ${
							isActive ? "text-gold" : "text-gray-400 hover:text-gray-300"
						}`
					}
				>
					<span className="text-lg mb-0.5">{tab.icon}</span>
					{tab.label}
				</NavLink>
			))}
		</nav>
	);
}
