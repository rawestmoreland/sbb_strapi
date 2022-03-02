import Layout from '../../components/Layout'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getSBBURL } from '../../utils/api-helpers'

const ConfirmPage = () => {
	const router = useRouter()
	const { query } = useRouter()
	const [activated, setActivated] = useState(false)
	const [validating, setValidating] = useState(true)
	const verifyEmail = async (token) => {
		const res = await fetch(`${getSBBURL}/api/verifyemail`, {
			method: 'POST',
			body: JSON.stringify({
				token,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
		const { data } = await res.json()

		setValidating(false)

		if (data && data.activated) {
			setActivated(true)
			router.replace('/', `${getSBBURL}`, { shallow: true })
		}
	}

	useEffect(() => {
		verifyEmail(query.token)
	}, [])

	return (
		<Layout>
			{!activated && !validating && (
				<div className='w-full h-full flex items-center justify-center'>
					😞 sorry, we were unable to verify your email 😞
				</div>
			)}
		</Layout>
	)
}

export default ConfirmPage
