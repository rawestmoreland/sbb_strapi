require('dotenv').config()
const Redis = require('ioredis')
const { fetchFromBrewfather } = require('./utils/brewfather-helpers')
const redis = new Redis(process.env.REDIS_URL)

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns the last reading from the most recent fermenting batch.
 *          Also returns the batch name and number
 */
export default async function handler(req, res) {
	const batch = await fetchFromBrewfather(`/batches?status=Fermenting`)

	if (batch && batch.length > 0) {
		const id = batch[0]._id
		const allReadings = await fetchFromBrewfather(`/batches/${id}/readings`)
		// filter out anything not TILT (PLAATO is mixed in there sometime)
		const tiltOnly = allReadings.filter((r) => r.type == 'tilt')
		if (tiltOnly.length) {
			return res.status(200).json({
				data: {
					tilt: tiltOnly.sort((a, b) => b.timepoint - a.timepoint)[0],
					batchName: batch[0].recipe.name,
					batchNo: batch[0].batchNo,
					batchStatus: batch[0].status,
				},
			})
		} else return res.status(200).json({ msg: 'no tilt', data: [] })
	} else return res.status(404).json({ msg: 'No batches found' })
}
