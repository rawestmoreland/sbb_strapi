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

		try {
			const response = await fetch('/api/subscribe', {
				method: 'POST',
				body: JSON.stringify({ email, captcha: captchaCode }),
				headers: {
					'Content-Type': 'application/json',
				},
			})
			if (response.ok) {
				// If the response is ok, show an alert.
				alert('Email registered successfully')
			} else {
				// Else throw an error with the message returned
				// from the API
				const error = await response.json()
				throw new Error(error.message)
			}
		} catch (error) {
			alert(
				error?.message ||
					'Something went wrong. Unable to register right now.'
			)
		} finally {
			// Reset the reCAPTCHA when the request has failed or succeeeded
			// so that it can be executed again if user submits another email.
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
			<label htmlFor='email'>Email</label>
			<input
				className='border px-4 py-2 w-full text-xs'
				id='email'
				name='email'
				type='text'
				autoComplete='email'
				placeholder='Email'
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
