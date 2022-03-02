import { format } from 'date-fns-tz'

const InProgressBatch = ({ batchData }) => {
	const { batchName, batchStatus } = batchData
	const { tilt } = batchData
	const formattedTime = tilt ? format(new Date(tilt.time), 'Pp') : null
	return (
		<div>
			<h3 className='mb-4 font-medium text-xl'>In Progress</h3>
			<h4 className='text-lg'>Beer:</h4>
			<div className='mb-2 text-sm'>{batchName}</div>
			<h4 className='text-lg'>Status:</h4>
			<div className='mb-2 text-sm'>{batchStatus}</div>
			{tilt && (
				<>
					<h4 className='text-lg'>Last Reading:</h4>
					<div className='text-sm'>{`${tilt?.sg.toFixed(3)} at ${
						formattedTime || ''
					}`}</div>
				</>
			)}
		</div>
	)
}

export default InProgressBatch
