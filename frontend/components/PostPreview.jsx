import Image from './Image'
import Link from 'next/link'
import { format } from 'date-fns'

const PostPreview = ({ post }) => {
	const { image } = post
	return (
		<Link as={`post/${post.slug}`} href='/post/[id]'>
			<div className='md:grid md:grid-cols-3 w-full md:gap-x-8 cursor-pointer'>
				<div className='md:col-span-1 w-full h-full mb-2'>
					<Image media={image} />
				</div>
				<div className='flex flex-col col-span-2 h-full'>
					<h2 className='text-2xl font-bold mb-4'>{post.title}</h2>
					<p className='mb-4'>{post.description}</p>
					<p className='text-gray-600'>
						{format(new Date(post.published), 'LLLL do, yyyy')}
					</p>
				</div>
			</div>
		</Link>
	)
}

export default PostPreview
