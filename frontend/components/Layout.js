import NavBar from './NavBar'
import Loading from './Loading'
import { useRouter } from 'next/router'
import { useContext, useState, useEffect } from 'react'
import { GlobalContext } from '../pages/_app'

const Layout = ({ children }) => {
	const { navbar } = useContext(GlobalContext)
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const handleStart = (url) => {
			url !== router.pathname ? setLoading(true) : setLoading(false)
		}

		const handleComplete = (url) => setLoading(false)

		router.events.on('routeChangeStart', handleStart)
		router.events.on('routeChangeComplete', handleComplete)
		router.events.on('routeChangeError', handleComplete)
	}, [router])
	return (
		<>
			<NavBar navbar={navbar} />
			<Loading loading={loading} />
			<div
				className={`${
					loading ? 'hidden' : 'container font-poppins py-12'
				}`}
			>
				{children}
			</div>
			{/* {footer && <Footer footer={footer} />} */}
		</>
	)
}

export default Layout
