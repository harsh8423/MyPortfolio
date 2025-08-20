/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,jsx}"
	],
	theme: {
		extend: {
			colors: {
				brand: {
					DEFAULT: '#06b6d4',
					dark: '#0891b2'
				}
			}
		}
	},
	plugins: [],
}

