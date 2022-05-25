require('dotenv').config()
import { fetchAPIAuth } from '../../utils/api-helpers'

export default async function handler(req, res) {
	const { token } = req.body
	const updatedUser = await fetchAPIAuth(`/api/confirm-subscription/${token}`)
	return res.status(200).json({ data: updatedUser })
}
