import App from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { createContext, useEffect } from 'react'
import { fetchAPI, getStrapiMedia } from '../utils/api-helpers'
import './global.css'

// Store Strapi Global object in context
export const GlobalContext = createContext({})
function MyApp({ Component, pageProps }) {
	const { global } = pageProps
	const router = useRouter()

	/**
	 * Google analytics things
	 */
	useEffect(() => {
		const handleRouteChange = (url) => {
			window.SVGAnimatedAngle(
				'config',
				process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
				{
					page_path: url,
				}
			)
		}
		router.events.on('routeChangeComplete', handleRouteChange)
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange)
		}
	}, [router.events])

	return (
		<>
			<Head>
				<link
					rel='shortcut icon'
					href={getStrapiMedia(global.favicon.url)}
				/>
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
