import NavBar from './NavBar'
import Loading from './Loading'
import { useRouter } from 'next/router'
import { useContext, useState, useEffect } from 'react'
import { GlobalContext } from '../pages/_app'
import Image from 'next/image'
import Link from 'next/link'

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
					loading
						? 'hidden'
						: 'container flex flex-col gap-y-4 md:grid md:grid-cols-4 md:gap-x-8 font-poppins py-12'
				}`}
			>
				<div className='md:col-span-3'>{children}</div>
				<div className='flex flex-col gap-y-4 md:col-span-1'>
					<section>
						<h3 className='mb-4 font-medium text-xl'>
							Try Brewfather
						</h3>
						<a
							href='https://brewfather.app/?via=smallbatchbru'
							target='_blank'
							rel='noopener noreferer'
							className='relative w-full'
						>
							<Image
								src='/brewfather_icon.png'
								alt='brewfather icon'
								width='150'
								height='150'
							/>
						</a>
					</section>
				</div>
			</div>
			{/* {footer && <Footer footer={footer} />} */}
		</>
	)
}

export default Layout
