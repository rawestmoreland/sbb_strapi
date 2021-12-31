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
