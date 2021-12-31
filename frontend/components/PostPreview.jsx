import Image from './Image'
import { format } from 'date-fns'

const PostPreview = ({ post }) => {
	const { image } = post
	return (
		<div className='flex flex-col md:flex-row w-full gap-x-8'>
			<div className='w-full'>
				<Image media={image} />
			</div>
			<div className='flex flex-col justify-between'>
				<h2 className='text-2xl font-bold'>{post.title}</h2>
				<p>{post.description}</p>
				<p>{format(new Date(post.published), 'LLLL do, yyyy')}</p>
			</div>
		</div>
	)
}

export default PostPreview
