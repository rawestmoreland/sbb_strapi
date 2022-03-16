import { useForm } from 'react-hook-form'
import {
	useNetlifyForm,
	NetlifyFormProvider,
	NetlifyFormComponent,
	Honeypot,
} from 'react-netlify-forms'

const SubscribeForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm()

	const netlify = useNetlifyForm({
		name: 'contact-form',
		action: '/success',
		honeypotName: 'bot-field',
		onSuccess: (response, context) => {
			console.log('Successfully sent form data to Netlify Server')
		},
	})

	const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i

	const onSubmit = (data) => netlify.handleSubmit(null, data)

	return (
		<NetlifyFormProvider {...netlify}>
			<NetlifyFormComponent onSubmit={handleSubmit(onSubmit)}>
				<Honeypot />
				{netlify.success && <p>Thanks for contacting us!</p>}
				{netlify.error && (
					<p>
						Sorry, we could not reach servers. Because it only works
						on Netlify, our GitHub demo does not provide a response.
					</p>
				)}
				<div>
					<label htmlFor='email'>Email:</label>
					<input
						type='email'
						name='email'
						id='email'
						{...register('email', {
							required: true,
							pattern: {
								value: EMAIL_REGEX,
								message: 'Invalid email address',
							},
						})}
					/>
					{errors.email && <div>{errors.email.message}</div>}
				</div>
				<div>
					<button type='submit'>Submit</button>
					<button type='reset' onClick={() => reset()}>
						Reset
					</button>
				</div>
			</NetlifyFormComponent>
		</NetlifyFormProvider>
	)
}

export default SubscribeForm
