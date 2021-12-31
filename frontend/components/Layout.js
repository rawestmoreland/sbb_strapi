import NavBar from './NavBar'
import { useContext } from 'react'
import { GlobalContext } from '../pages/_app'

const Layout = ({ children }) => {
	const { navbar } = useContext(GlobalContext)
	return (
		<>
			<NavBar navbar={navbar} />
			<div className='container font-poppins py-8'>{children}</div>
			{/* {footer && <Footer footer={footer} />} */}
		</>
	)
}

export default Layout
