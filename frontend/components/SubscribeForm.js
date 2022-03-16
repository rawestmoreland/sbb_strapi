import { useForm } from 'react-hook-form'

const SubscribeForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm()

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
			<label
				htmlFor='got-ya'
				style={{
					position: 'absolute',
					overflow: 'hidden',
					clip: 'rect(0 0 0 0)',
					height: '1px',
					width: '1px',
					margin: '-1px',
					padding: '0',
					border: '0',
				}}
			>
				Don’t fill this out if you're human:
				<input tabIndex='-1' name='got-ya' {...register} />
			</label>
			<input
				className='border p-2 w-full text-xs'
				name='email'
				{...register('email')}
			/>
			<button className='bg-black text-white p-2 rounded' type='submit'>
				Subscribe
			</button>
		</form>
	)
}

export default SubscribeForm
