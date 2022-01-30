const { BASE_API_URL } = require('./constants')

export async function fetchFromBrewfather(path, options = {}) {
	const authString = `${process.env.BREWFATHER_USER_ID}:${process.env.BREWFATHER_API_KEY}`
	const encodedAuth = Buffer.from(authString).toString('base64')
	const defaultOptions = {
		headers: {
			'Authorization': `Basic ${encodedAuth}`,
		},
	}

	const mergedOptions = {
		...defaultOptions,
		...options,
	}
	const requestUrl = `${process.env.BREWFATHER_URL}${path}`

	const response = await fetch(requestUrl, mergedOptions)

	if (!response.ok) {
		console.error(response.statusText)
		throw new Error(`An error occurred please try again`)
	}

	const data = await response.json()

	return data
}

module.exports = { fetchFromBrewfather }
