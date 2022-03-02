require('dotenv').config()
import { fetchAPI } from '../../utils/api-helpers'

export default async function handler(req, res) {
	const { token } = req.body
	// TODO: make the get request to strapi
	const updatedUser = await fetchAPI(`/cancel-subscription/${token}`)
	return res.status(200).json({ data: updatedUser })
}
