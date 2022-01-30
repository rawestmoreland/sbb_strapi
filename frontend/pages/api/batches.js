require('dotenv').config()
const Redis = require('ioredis')
const { fetchFromBrewfather } = require('./utils/brewfather-helpers')
const redis = new Redis(process.env.REDIS_URL)

export default async function handler(req, res) {
	const { page, offset, limit } = req.body
	let more = false
	try {
		const cachedData = await redis.get(`batches${page}`)
		const cachedDataNext = await redis.get(`batches${page + 1}`)

		if (cachedData) {
			console.log('Returning cached data')
			if (cachedDataNext) {
				more = true
			} else if (JSON.parse(cachedData).length === limit) {
				const nextData = await fetchFromBrewfather(
					encodedAuth,
					`/batches?offset=${
						offset + limit
					}&limit=${limit}&include=_share`
				)
				console.log(nextData)
				if (nextData.length) {
					more = true
					redis.set(
						`batches${page + 1}`,
						JSON.stringify(nextData),
						'EX',
						1800
					)
				}
			}
			return res.status(200).json({ data: JSON.parse(cachedData), more })
		}

		const batches = await fetchFromBrewfather(
			encodedAuth,
			`/batches?offset=${offset}&limit=${limit}&include=_share`
		)

		// Check to see if there's another page
		if (batches.length === limit) {
			const nextBatches = await fetchFromBrewfather(
				encodedAuth,
				`/batches?offset=${
					offset + limit
				}&limit=${limit}&include=_share`
			)
			if (nextBatches.length) {
				redis.set(
					`batches${page + 1}`,
					JSON.stringify(nextBatches),
					'EX',
					1800
				)
				more = true
			}
		}

		redis.set(`batches${page}`, JSON.stringify(batches), 'EX', 1800)

		console.log('Returning fresh data')

		// Return the batches and a boolean of whether there
		// are more pages.
		return res.status(200).json({ data: batches, more })
	} catch (error) {
		return res.status(500).json({ msg: 'There was an error' })
	}
}
