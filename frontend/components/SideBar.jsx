import Image from 'next/legacy/image';
import InProgressBatch from './InProgressBatch';
import SubscribeForm from './SubscribeForm';

const SideBar = ({ batchData }) => {
  return (
    <div className='flex flex-col gap-y-8 md:col-span-1'>
      <section>
        <h3 className='mb-2 text-xl font-medium'>Subscribe</h3>
        <SubscribeForm />
      </section>
      <section>
        <h3 className='mb-4 text-xl font-medium'>Try Keg Track!</h3>
        <p className='mb-4 text-xs'>
          Keg volume monitoring for iOS and Android
        </p>
        <a
          href='https://kegtrackapp.com'
          target='_blank'
          rel='noopener noreferer'
          className='relative w-full'
        >
          <Image
            style={{ borderRadius: '10%' }}
            src='/kegtrack_icon.png'
            alt='kegtrack icon'
            width='150'
            height='150'
          />
        </a>
        {/* <h3 className='mb-4 font-medium text-xl'>Try Brewfather</h3>
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
				</a> */}
      </section>
      {batchData && (
        <section>
          <InProgressBatch batchData={batchData} />
        </section>
      )}
    </div>
  );
};

export default SideBar;
