export function getStrapiURL(path = '') {
	return `${
		process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
	}${path}`;
}

export async function fetchAPI(path) {
	const requestUrl = getStrapiURL(path);
	const response = await fetch(requestUrl);
	const data = await response.json();
	return data;
}
