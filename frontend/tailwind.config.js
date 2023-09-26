/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	darkMode: 'class',
	theme: {
		screens: {
			lg: '1200px',
			md: '992px',
			sm: '768px',
			xs: '480px',
			xxs: '340px'
		},
		extend: {
			colors: {
				// flowbite-svelte
				primary: {
					50: '#efe5fd',
					100: '#d4bff9',
					200: '#b794f6',
					300: '#9965f4',
					400: '#7e3ff2',
					500: '#6002ee',
					600: '#5300e8',
					700: '#1d00db',
					800: '#1d00db',
					900: '#0000d6'
				},
				neutral: {
					50: '#ffffff',
					100: '#f7f9ff',
					200: '#f1f3f9',
					300: '#e9eaf0',
					400: '#d9dbe1',
					500: '#b6b7bd',
					600: '#96989d',
					700: '#6e6f74',
					800: '#5a5c61',
					900: '#3c3d42',
				}
			}
		}
	},
	plugins: [require('flowbite/plugin')]
};
