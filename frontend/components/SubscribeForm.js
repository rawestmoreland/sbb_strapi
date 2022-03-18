import React, { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

const SubscribeForm = () => {
	const recaptchaRef = React.createRef()

	const [email, setEmail] = useState('')

	const handlePost = (event) => {
		event.preventDefault()
		// Execute the reCAPTCHA when the form is submitted
		recaptchaRef.current.execute()
	}

	const onChange = (e) => {
		setEmail(e.target.value)
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
				// If the response is ok than show the success alert
				alert('Email registered successfully')
			} else {
				// Else throw an error with the message returned
				// from the API
				const error = await response.json()
				throw new Error(error.message)
			}
		} catch (error) {
			alert(error?.message || 'Something went wrong')
		} finally {
			// Reset the reCAPTCHA when the request has failed or succeeeded
			// so that it can be executed again if user submits another email.
			recaptchaRef.current.reset()
			setEmail('')
		}
	}

	return (
		<form onSubmit={handlePost}>
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
				className='h-8 my-2 p-2 border border-black rounded'
				type='text'
				name='email'
				value={email}
				onChange={onChange}
				required
			/>
			<button className='bg-black text-white p-2 rounded' type='submit'>
				Subscribe
			</button>
		</form>
	)
}

export default SubscribeForm
