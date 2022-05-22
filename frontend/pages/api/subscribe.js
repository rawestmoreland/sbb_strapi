import fetch from 'node-fetch'

export default async function handler(req, res) {
	const { body, method } = req

	// Extract the email and captcha code from the request body
	const { email, captcha } = body

	if (method === 'POST') {
		// If email or captcha are missing return an error
		if (!email || !captcha) {
			return res.status(422).json({
				message:
					'Unprocessable request, please provide the required fields',
			})
		}

		try {
			// Ping the google recaptcha verify API to verify the captcha code you received
			const response = await fetch(
				`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
				{
					headers: {
						'Content-Type':
							'application/x-www-form-urlencoded; charset=utf-8',
					},
					method: 'POST',
				}
			)
			const captchaValidation = await response.json()
			/**
       * The structure of response from the verify API is
       * {
       *  "success": true|false,
       *  "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
       *  "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
       *  "error-codes": [...]        // optional
        }
       */
			if (captchaValidation.success) {
				const strapiURL =
					process.env.NEXT_PUBLIC_STRAPI_URL ||
					'http://localhost:1338'

				const strapiResponse = await fetch(
					`${strapiURL}/api/subscribers`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
						},
						body: JSON.stringify({ data: { email } }),
					}
				)

				const { data, error } = await strapiResponse.json()

				if (strapiResponse.ok) {
					return res.status(200).json({ data: data.attributes })
				}

				if (error?.status && error?.message) {
					return res
						.status(error.status)
						.json({ message: error.message })
				}
				return res
					.status(500)
					.json({ message: 'Internal server error' })
			}

			return res.status(422).json({
				message: 'Unproccesable request, Invalid captcha code',
			})
		} catch (error) {
			return res.status(422).json({ message: 'Something went wrong' })
		}
	}
	// Return 404 if someone pings the API with a method other than
	// POST
	return res.status(404).send('Not found')
}
