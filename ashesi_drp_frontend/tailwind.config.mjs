/** @type {import('tailwindcss').Config} */
const config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				montserrat: ["var(--font-montserrat)", "sans-serif"],
			},
			colors: {
				"ashesi-red": "#AA3C3F",
				"ashesi-gray": "#404041",
			},
		},
	},
	plugins: [],
};

export default config;
