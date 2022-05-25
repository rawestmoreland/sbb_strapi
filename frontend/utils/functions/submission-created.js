require('dotenv').config()
const fetch = require('node-fetch')
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1338'

exports.handler = (event) => {
	// Pulling out the payload from the body
	const { payload } = JSON.parse(event.body)
	const { email } = payload.data
	let data

	// Submit the email to strapi
	try {
		data = fetch(`${strapiUrl}/subscribers`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
				'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
			},
			body: JSON.stringify({ email }),
		}).then((response) => response.json())
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({
				error: e.message,
			}),
		}
	}
	return {
		statusCode: 200,
		body: JSON.stringify(data),
	}
}
