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
			keyframes: {
				'slide-in': {
				  '0%': {
					opacity: '0',
					transform: 'translateX(-20px)',
				  },
				  '100%': {
					opacity: '1',
					transform: 'translateX(0)',
				  },
				},
			},
			animation: {
				'slide-in': 'slide-in 0.5s ease-out forwards',
			},
		},
	},
	plugins: [],
};

export default config;
