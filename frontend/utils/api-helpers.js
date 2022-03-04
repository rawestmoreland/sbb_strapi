// Get the url of the Strapi API based om the env variable or the default local one.
export function getStrapiURL(path) {
	return `${
		process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
	}${path}`
}

export function getSBBURL() {
	return `${process.env.NEXT_PUBLIC_SBB_URL || 'http://localhost:3000'}`
}

export async function fetchBrewfather(path, options = {}) {
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
		console.error(response)
		throw new Error(`An error occurred please try again`)
	}

	const data = await response.json()

	return data
}

/**
 *
 * @returns The last reading data from the most recent fermenting batch
 */
export async function fetchLastReading() {
	const fetchUrl = `${
		process.env.NEXT_PUBLIC_SBB_URL || 'http://localhost:3000'
	}/api/lasttiltreading`

	const res = await fetch(fetchUrl, {
		method: 'POST',
	})

	const { data } = await res.json()

	return data ?? null
}

export async function strapiPost(path, options = {}) {
	const defaultOptions = {
		headers: {
			'Content-type': 'application/json',
		},
	}
	const mergedOptions = {
		...defaultOptions,
		...options,
	}
	const requestUrl = getStrapiURL(path)
	const response = await fetch(requestUrl, mergedOptions)

	if (response.status !== 200) {
		const error = await response.json()
		throw new Error(error.data.errors.email[0] || 'There was an error')
	}
	const data = await response.json()
	return data
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path, options = {}) {
	const defaultOptions = {
		headers: {
			'Content-Type': 'application/json',
		},
	}
	const mergedOptions = {
		...defaultOptions,
		...options,
	}
	const requestUrl = getStrapiURL(path)
	const response = await fetch(requestUrl, mergedOptions)

	if (!response.ok) {
		throw new Error(`An error occured please try again`)
	}
	const data = await response.json()
	return data
}

// This function will get the url of your medias depending on where they are hosted
export function getStrapiMedia(url) {
	if (url == null) {
		return null
	}
	if (url.startsWith('http') || url.startsWith('//')) {
		return url
	}
	return `${
		process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1338'
	}${url}`
}

export const getAllPageData = async (locale, slug) => {
	const path = `/pages?slug=${slug}`

	const data = await fetchAPI(path)

	return data[0]
}
