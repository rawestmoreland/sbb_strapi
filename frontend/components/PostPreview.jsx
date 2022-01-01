import Image from './Image'
import Link from 'next/link'
import { format } from 'date-fns'

const PostPreview = ({ post }) => {
	const { image } = post
	return (
		<Link as={`post/${post.slug}`} href='/post/[id]'>
			<div className='grid grid-cols-3 w-full gap-x-8 cursor-pointer'>
				<div className='col-span-1 w-full h-full'>
					<Image media={image} />
				</div>
				<div className='flex flex-col col-span-2'>
					<h2 className='text-2xl font-bold mb-2'>{post.title}</h2>
					<p className='mb-2'>{post.description}</p>
					<p>{format(new Date(post.published), 'LLLL do, yyyy')}</p>
				</div>
			</div>
		</Link>
	)
}

export default PostPreview
