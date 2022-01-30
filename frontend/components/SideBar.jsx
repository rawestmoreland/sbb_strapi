import Image from 'next/image'
import InProgressBatch from './InProgressBatch'

const SideBar = ({ batchData }) => {
	return (
		<div className='flex flex-col gap-y-4 md:col-span-1'>
			<section>
				<h3 className='mb-4 font-medium text-xl'>Try Brewfather</h3>
				<a
					href='https://brewfather.app/?via=smallbatchbru'
					target='_blank'
					rel='noopener noreferer'
					className='relative w-full'
				>
					<Image
						src='/brewfather_icon.png'
						alt='brewfather icon'
						width='150'
						height='150'
					/>
				</a>
			</section>
			{batchData && (
				<section>
					<InProgressBatch batchData={batchData} />
				</section>
			)}
		</div>
	)
}

export default SideBar
