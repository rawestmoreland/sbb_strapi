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

	const handlePost = (formData, e) => {
		fetch('/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: encode({
				'form-name': 'subscribe',
				...formData,
			}),
		})
			.then(() => {
				console.log('data sent to netlify')
				reset()
			})
			.catch((e) =>
				alert('There was a problem with your submission. ' + e)
			)
		e.preventDefault()
	}

	return (
		<div>
			<form
				onSubmit={handleSubmit(handlePost)}
				className='flex flex-col items-start gap-y-2'
				data-netlify='true'
				netlify-honeypot='got-ya'
				name='subscribe'
				method='POST'
			>
				<p className='text-sm'>
					Sign up to be notified when we publish new content!
				</p>
				<p className='hidden'>
					<label>
						Don't fill this in if you're human.
						<input name='got-ya' {...register} />
					</label>
				</p>
				<input type='hidden' name='form-name' value='subscribe' />
				<input
					className='border p-2 w-full text-xs'
					aria-label='email'
					placeholder='Email address'
					name='email'
					{...register('email')}
				/>
				<button
					className='bg-black text-white p-2 rounded'
					type='submit'
				>
					Subscribe
				</button>
			</form>
		</div>
	)
}

export default SubscribeForm
