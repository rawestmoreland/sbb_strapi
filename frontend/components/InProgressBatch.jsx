import { format } from 'date-fns'

const InProgressBatch = ({ batchData }) => {
	console.log(batchData)
	const { batchName, batchStatus } = batchData
	const { sg, timepoint } = batchData.tilt
	const formattedTime = format(new Date(timepoint), 'Pp')
	return (
		<div>
			<h3 className='mb-4 font-medium text-xl'>In Progress</h3>
			<h4 className='text-lg'>Beer:</h4>
			<div className='mb-2 text-sm'>{batchName}</div>
			<h4 className='text-lg'>Status:</h4>
			<div className='mb-2 text-sm'>{batchStatus}</div>
			<h4 className='text-lg'>Last Reading:</h4>
			<div className='text-sm'>{`${sg} at ${formattedTime}`}</div>
		</div>
	)
}

export default InProgressBatch
