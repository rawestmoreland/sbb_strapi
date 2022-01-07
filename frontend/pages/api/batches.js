const axios = require('axios')
require('dotenv').config()
const Redis = require('ioredis')
const { BASE_API_URL } = require('./utils/constants')

export default async function handler(req, res) {
	const redis = new Redis(process.env.REDIS_URL)
	const authString = `${process.env.BREWFATHER_USER_ID}:${process.env.BREWFATHER_API_KEY}`
	const encodedAuth = Buffer.from(authString).toString('base64')
	const { page, offset, limit } = req.body
	try {
		const cachedData = await redis.get(`batches${page}`)

		if (cachedData) {
			console.log('Returning cached data')
			return res.status(200).json(cachedData)
		}

		const response = await fetch(
			`${BASE_API_URL}/batches?offset=${offset}&limit=${limit}`,
			{
				headers: {
					'Authorization': `Basic ${encodedAuth}`,
				},
			}
		)

		const batches = await response.json()

		redis.set(`batches${page}`, JSON.stringify(batches), 'EX', 45)

		console.log('Returning fresh data')

		return res.status(200).json(JSON.stringify(batches))
	} catch (error) {
		return res.status(500).json({ msg: 'There was an error' })
	}
}
