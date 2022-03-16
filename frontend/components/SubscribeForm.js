import { useForm } from 'react-hook-form'

const SubscribeForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm()

<<<<<<< Updated upstream
	const encode = (data) => {
		return Object.keys(data)
			.map(
				(key) =>
					encodeURIComponent(key) +
					'=' +
					encodeURIComponent(data[key])
			)
			.join('&')
	}
=======
	const netlify = useNetlifyForm({
		name: 'email-contact',
		action: '/success',
		honeypotName: 'bot-field',
		onSuccess: (response, context) => {
			console.log('Successfully sent form data to Netlify Server')
		},
	})
>>>>>>> Stashed changes

	const onSubmit = (formData, e) => {
		fetch('/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: encode({
				'form-name': 'subscribe',
				...formData,
			}),
		})
			.then(() => {
				alert('Check your inbox for your verification email')
				reset()
			})
			.catch((e) =>
				alert('There was a problem with your submission. ' + e)
			)
		e.preventDefault()
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col items-start gap-y-2'
			method='POST'
			data-netlify='true'
			netlify-honeypot='got-ya'
			action='/success/'
			name='subscribe'
		>
			<input type='hidden' name='form-name' value='subscribe' />
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
				autoComplete='email'
				placeholder='Email address'
				{...register('email')}
				required
			/>
			<button className='bg-black text-white p-2 rounded' type='submit'>
				Subscribe
			</button>
		</form>
	)
}

export default SubscribeForm
