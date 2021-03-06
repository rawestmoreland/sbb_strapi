require('dotenv').config()
import { fetchAPIAuth } from '../../utils/api-helpers'

export default async function handler(req, res) {
	const { token } = req.body
	// TODO: make the get request to strapi
	const updatedUser = await fetchAPIAuth(`/cancel-subscription/${token}`)
	return res.status(200).json({ data: updatedUser })
}
