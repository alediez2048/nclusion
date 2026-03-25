export function Header() {
	return (
		<header className="sticky top-0 z-50 bg-dark-navy/95 backdrop-blur-sm px-4 py-3 flex items-center gap-3 border-b border-gray-700">
			<div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
				<div className="w-5 h-5 rounded-full border-2 border-dark-navy" />
			</div>
			<span className="text-white font-bold text-lg">nclusion</span>
		</header>
	);
}
