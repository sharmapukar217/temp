/** @type {import('tailwindcss').Config}*/
const config = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', 'node_modules/preline/dist/*.js'],
	theme: {},
	plugins: [require("@tailwindcss/typography"), require('preline/plugin')]
}

module.exports = config