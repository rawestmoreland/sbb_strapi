import { useState, createRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

const SubscribeForm = () => {
	const [email, setEmail] = useState('')
	const handleChange = (e) => {
		setEmail(e.target.value)
	}
	const handleSubmit = (form) => {
		const data = new FormData(form)
		data.append('subscribe', 'newsletter')
		fetch('/', {
			method: 'POST',
			body: data,
		})
			.then(() => {
				alert('Thanks! Check your email to confirm your email address.')
				setEmail('')
			})
			.catch((error) => alert(error))
	}

	return (
		<form
			className='flex flex-col items-start gap-y-2'
			name='subscribe'
			method='POST'
			data-netlify='true'
			netlify-honeypot='got-ya'
			onSubmit={handleSubmit}
		>
			<p className='text-sm'>
				Sign up to be notified when we publish new content!
			</p>
			<p className='hidden'>
				<label>
					Don't fill this in if you're human. <input type='got-ya' />
				</label>
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
