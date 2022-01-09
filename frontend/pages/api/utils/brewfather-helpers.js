const { BASE_API_URL } = require('./constants')

/**
 *
 * @param {*} token - auth token base64 encoded
 * @param {*} path - path with offset and limit
 */
async function fetchFromBrewfather(token, path) {
	const res = await fetch(`${BASE_API_URL}${path}`, {
		headers: {
			'Authorization': `Basic ${token}`,
		},
	})

	const data = await res.json()

	return data
}

module.exports = { fetchFromBrewfather }
