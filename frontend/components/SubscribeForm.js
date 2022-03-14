import { useState, createRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

const SubscribeForm = () => {
	const [email, setEmail] = useState('')
	const recaptchaRef = createRef()

	const handleChange = (event) => {
		setEmail(event.target.value)
	}

	const registerUser = (event) => {
		event.preventDefault()
		recaptchaRef.current.execute()
	}

	const onReCAPTCHAChange = async (captchaCode) => {
		// If the reCAPTCHA code is null or undefined indicating that
		// the reCAPTCHA was expired then return early
		if (!captchaCode) {
			return
		}

		const fetchUrl =
			process.env.NEXT_PUBLIC_SBB_URL || 'http://localhost:3000'

		try {
			const response = await fetch(`${fetchUrl}/api/subscribe`, {
				method: 'POST',
				body: JSON.stringify({ email, captcha: captchaCode }),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
					'Access-Control-Allow-Origin': '*',
				},
			})
			if (response.ok) {
				const { message } = await response.json()
				// If the response is ok, show an alert.
				alert(message)
			} else {
				const error = await response.json()
				// Else throw an error with the message returned
				// from the API
				alert(error.message)
				setEmail('')
			}
		} catch (error) {
			alert(
				error?.message ||
					'Something went wrong. Unable to register right now.'
			)
		} finally {
			recaptchaRef.current.reset()
			setEmail('')
		}
	}

	return (
		<form
			className='flex flex-col items-start gap-y-2'
			onSubmit={registerUser}
		>
			<ReCAPTCHA
				ref={recaptchaRef}
				size='invisible'
				sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
				onChange={onReCAPTCHAChange}
			/>
			<p className='text-sm'>
				Sign up to be notified when we publish new content!
			</p>
			<input
				className='border p-2 w-full text-xs'
				aria-label='email'
				id='email'
				name='email'
				type='text'
				value={email}
				autoComplete='email'
				placeholder='Email address'
				onChange={handleChange}
				required
			/>
			<button className='bg-black text-white p-2 rounded' type='submit'>
				Subscribe
			</button>
		</form>
	)
}

export default SubscribeForm
