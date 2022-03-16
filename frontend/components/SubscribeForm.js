import { useReducer } from 'react'

const initialValues = {
	email: '',
}

const initialErrors = {
	name: false,
}

const SubscribeForm = () => {
	const reducer = (currentState, nextState) => ({
		...currentState,
		...nextState,
	})

	const [values, setValues] = useReducer(reducer, initialValues)
	const [errors, setErrors] = useReducer(reducer, initialErrors)

	const handleChange = (e) => {
		setValues({ [e.target.id]: e.target.value })
	}

	const onFocus = (e) => {
		setErrors({ [e.target.id]: false })
	}

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

	const handleSubmit = (e) => {
		e.preventDefault()
		for (const key in values) {
			if (!values[key]) {
				setErrors({ [key]: true })
				return
			}
			setErrors({ [key]: false })
		}
		fetch('/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: encode({
				'form-name': e.target.getAttribute('name'),
				...values,
			}),
		})
			.then(() => alert('Check your inbox for your verification email'))
			.catch((e) =>
				alert('There was a problem with your submission. ' + e)
			)
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col items-start gap-y-2'
			method='POST'
			data-netlify='true'
			netlify-honeypot='got-ya'
			name='subscribe'
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
				value={values.email}
				autoComplete='email'
				placeholder='Email address'
				onFocus={onFocus}
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
