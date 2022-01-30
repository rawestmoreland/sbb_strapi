require('dotenv').config()
const Redis = require('ioredis')
const { fetchFromBrewfather } = require('./utils/brewfather-helpers')
const redis = new Redis(process.env.REDIS_URL)

export default async function handler(req, res) {
	const fermenting = await fetchFromBrewfather(`/batches?status=Fermenting`)

	return res.status(200).json({ data: fermenting })
}
