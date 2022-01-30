import NavBar from './NavBar'
import Loading from './Loading'
import Sidebar from './SideBar'
import { useRouter } from 'next/router'
import { useContext, useState, useEffect } from 'react'
import { GlobalContext } from '../pages/_app'

const Layout = ({ children, ...props }) => {
	const { navbar } = useContext(GlobalContext)
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const { batchData } = props

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
					loading
						? 'hidden'
						: 'container flex flex-col gap-y-4 md:grid md:grid-cols-4 md:gap-x-8 font-poppins py-12'
				}`}
			>
				<div className='md:col-span-3'>{children}</div>
				<Sidebar batchData={batchData} />
			</div>
			{/* {footer && <Footer footer={footer} />} */}
		</>
	)
}

export default Layout
