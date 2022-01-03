import PostPreview from './PostPreview'
import { isPast } from 'date-fns'

const PostList = ({ posts }) => {
	return (
		<div>
			<ul className='flex flex-col gap-y-8'>
				{posts.map((post) => {
					return (
						// Only display if published date is in the past.
						isPast(new Date(post.published)) && (
							<li key={post.id}>
								<PostPreview post={post} />
							</li>
						)
					)
				})}
			</ul>
		</div>
	)
}

export default PostList
