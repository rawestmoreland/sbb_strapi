import Layout from '../../components/Layout'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getSBBURL } from './utils/api-helpers'

const ConfirmPage = () => {
	const router = useRouter()
	const { query } = useRouter()
	const [activated, setActivated] = useState(true)
	const [validating, setValidating] = useState(true)
	const cancelSub = async (token) => {
		const res = await fetch(`${getSBBURL}/api/cancelsub`, {
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

		if (data && !data.activated) {
			setActivated(false)
		}
	}

	useEffect(() => {
		cancelSub(query.token)
	}, [])

	return (
		<Layout>
			<div className='w-full h-full flex items-center justify-center'>
				{activated && !validating && (
					<div className='w-full h-full flex items-center justify-center'>
						😞 sorry, we were unable to verify your email 😞
					</div>
				)}
				{!activated && !validating && (
					<div>
						You have been unsubscribed. We're sad to see you go.
					</div>
				)}
			</div>
		</Layout>
	)
}

export default ConfirmPage
