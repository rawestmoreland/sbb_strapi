require('dotenv').config()
const Redis = require('ioredis')
const { fetchFromBrewfather } = require('./utils/brewfather-helpers')
const redis = new Redis(process.env.REDIS_URL)

export default async function handler(req, res) {
	const brewing = await fetchFromBrewfather(
		`/batches?status=Brewing&complete=true`
	)

	return res.status(200).json({ data: brewing })
}
