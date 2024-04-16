export function renderButtonStyle(type: string) {
	switch (type) {
		case "primary":
			return "px-8 py-3 text-lg font-semibold rounded bg-sky-400 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-orange-00 duration-300 dark:text-gray-900";
		case "secondary":
			return "px-8 py-3 text-lg font-semibold border rounded dark:border-gray-100";
		default:
			return "px-8 py-3 text-lg font-semibold rounded dark:bg-sky-400 dark:text-gray-900";
	}
}