const { strapiPostSubscribe } = require('../../utils/api-helpers')

export default async function handler(req, res) {
	const { body, method } = req

	// Extract the email and captcha code from the request body
	const { email, captcha } = body

	if (method === 'POST') {
		// If email or captcha are missing return an error
		if (!email) {
			return res.status(422).json({
				message:
					'Unprocessable request, please provide the required fields',
			})
		}

		const response = await strapiPostSubscribe(
			'/subscribers',
			{
				method: 'POST',
				body: JSON.stringify({ email }),
			},
			email
		)

		if (!response.error) {
			return res.status(200).send(JSON.stringify(response))
		}
	}
	// Return 404 if someone pings the API with a method other than
	// POST
	return res.status(404).send('Not found')
}
