import qs from 'qs'

// Get the url of the Strapi API based om the env variable or the default local one.
export function getStrapiURL(path) {
	return `${
		process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1338'
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

export async function strapiPostSubscribe(path, options = {}, email = '') {
	const defaultOptions = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
		},
	}
	const mergedOptions = {
		...defaultOptions,
		...options,
	}
	const requestUrl = getStrapiURL(path)
	const userCheck = await fetchAPIAuth(`/subscribers?email=${email}`)

	const response = await fetch(requestUrl, mergedOptions)

	if (response.status !== 200) {
		const error = await response.json()
		if (userCheck.length > 0) {
			return {
				data: error.data,
				message:
					"You already have that email registered. We'll send you a verification email just to be sure.",
			}
		}
		return {
			error: true,
			data: error.data,
			message: error.data.errors.email[0] || 'There was an error',
		}
	}
	const data = await response.json()
	return {
		data,
		message:
			"Email successfully registered. Please check your email to verify that it's you",
	}
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path, options = {}, urlParamsObject = {}) {
	const defaultOptions = {
		headers: {
			'Content-Type': 'application/json',
		},
	}
	const mergedOptions = {
		...defaultOptions,
		...options,
	}

	// Build request URL
	const queryString = qs.stringify(urlParamsObject)
	const requestUrl = `${getStrapiURL(
		`/api${path}${queryString ? `?${queryString}` : ''}`
	)}`

	const response = await fetch(requestUrl, mergedOptions)

	if (!response.ok) {
		throw new Error(`An error occured please try again`)
	}
	const data = await response.json()
	return data
}

// Helper to make GET requests to Strapi with Bearer token
export async function fetchAPIAuth(path, options = {}) {
	console.log(process.env.NEXT_STRAPI_ADMIN_TOKEN)
	const defaultOptions = {
		headers: {
			'content-type': 'application/json',
			Authorization: `bearer 7dc0cc858829725de017c8cc8827ce865549d46ca116db0cae6d25d72fd597fe4debdfccc01b06f9b57dd6e2f78c0854f9ddd6777f658dcb62609ac2dc582c838861e9d0d3077e63259bd57282c6d0524f6ec399e0b622e37d8b53d32245be82281068f9897130a7f1d99a256a6f1788a5ef941d20c7a405d2080daf50b28c2b.eyJpZCI6MiwiaWF0IjoxNjQ3MTA0NTY1LCJleHAiOjE2NDk2OTY1NjV9.rw1cbjcwhxtQgU9auZVDVAhuJb_hkGCUU2Mg5XGrNiI`,
		},
	}
	const mergedOptions = {
		...defaultOptions,
		...options,
	}
	const requestUrl = getStrapiURL(path)
	const response = await fetch(requestUrl, mergedOptions)

	console.log(response)

	if (!response.ok) {
		throw new Error(`An error occured please try again`)
	}
	const data = await response.json()
	return data
}

// This function will get the url of your medias depending on where they are hosted
export function getStrapiMedia(mediaUrl) {
	const { url } = mediaUrl
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
