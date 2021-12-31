const { urlObjectKeys } = require('next/dist/shared/lib/utils')

module.exports = {
	mode: 'jit',
	purge: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	media: false,
	theme: {
		extend: {
			container: {
				screens: {
					sm: '960px',
					md: '960px',
					lg: '960px',
					xl: '1024px',
				},
				center: true,
				padding: {
					DEFAULT: '1rem',
					md: '2rem',
				},
			},
			fontFamily: {
				'poppins': ['Poppins', 'sans-serif'],
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require('@tailwindcss/typography')],
}
