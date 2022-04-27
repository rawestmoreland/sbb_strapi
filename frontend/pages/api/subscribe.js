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
       * The structure of response from the veirfy API is
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
					'http://localhost:1337'

				const strapiResponse = await fetch(
					`${strapiURL}/api/subscribers`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
						},
						body: JSON.stringify({ email }),
					}
				)
					.then((response) => response.json())
					.then((data) => console.log({ data }))
				return res.status(200).json({ strapiResponse })
			}

			return res.status(422).json({
				message: 'Unproccesable request, Invalid captcha code',
			})
		} catch (error) {
			console.log(error)
			return res.status(422).json({ message: 'Something went wrong' })
		}
	}
	// Return 404 if someone pings the API with a method other than
	// POST
	return res.status(404).send('Not found')
}
