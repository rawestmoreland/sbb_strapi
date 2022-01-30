require('dotenv').config()
const Redis = require('ioredis')
const { fetchFromBrewfather } = require('./utils/brewfather-helpers')
const redis = new Redis(process.env.REDIS_URL)

export default async function handler(req, res) {
	const authString = `${process.env.BREWFATHER_USER_ID}:${process.env.BREWFATHER_API_KEY}`
	const encodedAuth = Buffer.from(authString).toString('base64')

	const brewing = await fetchFromBrewfather(
		encodedAuth,
		`/batches?status=Brewing&complete=true`
	)

	return res.status(200).json({ data: brewing })
}
