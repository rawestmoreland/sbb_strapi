import Layout from '../../components/Layout'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getSBBURL } from '../../utils/api-helpers'

const ConfirmPage = () => {
	const { query } = useRouter()
	const [activated, setActivated] = useState(false)
	const [validating, setValidating] = useState(true)
	const verifyEmail = async (token) => {
		const requestUrl = getSBBURL()
		const res = await fetch(`${requestUrl}/api/verifyemail`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				token,
			}),
		})
		const { data } = await res.json()

		setValidating(false)

		if (data && data.activated) {
			setActivated(true)
		}
	}

	useEffect(() => {
		verifyEmail(query.token)
		return () => {}
	}, [])

	return (
        <Layout>
			{!activated && !validating && (
				<div className='w-full h-full flex items-center justify-center'>
					😞 sorry, we were unable to verify your email 😞
				</div>
			)}
			{activated && !validating && (
				<div className='w-full h-full flex flex-col items-center justify-center gap-y-4'>
					<span>🍻 thank you! you email has been verified 🍻</span>
					<Link href='/' legacyBehavior>
						<span className='text-blue-400 cursor-pointer underline'>
							check out the home page to browse posts
						</span>
					</Link>
				</div>
			)}
		</Layout>
    );
}

export default ConfirmPage
