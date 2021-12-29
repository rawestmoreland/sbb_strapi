import App from 'next/app'
import Head from 'next/head'
import { createContext } from 'react'
import { fetchAPI, getStrapiMedia } from '../utils/api-helpers'

import 'tailwindcss/tailwind.css'

// Store Strapi Global object in context
export const GlobalContext = createContext({})

function MyApp({ Component, pageProps }) {
	const { global } = pageProps
	const faviconUrl = global.favicon ? getStrapiMedia(global.favicon) : ''
	console.log(pageProps)
	return (
		<>
			<Head>
				<link rel='shortcut icon' href={faviconUrl} />
			</Head>
			<GlobalContext.Provider value={global}>
				<Component {...pageProps} />
			</GlobalContext.Provider>
		</>
	)
}

MyApp.getInitialProps = async (ctx) => {
	const appProps = await App.getInitialProps(ctx)
	const global = await fetchAPI('/global')
	return { ...appProps, pageProps: { global } }
}

export default MyApp
