import Seo from '../Components/Seo'
import Layout from '../components/Layout'
import PostList from '../components/PostList'
import { fetchAPI } from '../utils/api-helpers'

export default function Home({ posts, categories, homepage }) {
	return (
		<Layout>
			<Seo seo={homepage.seo}></Seo>
			<div className='flex flex-col'>
				<PostList posts={posts} />
			</div>
		</Layout>
	)
}

export async function getStaticProps() {
	// Run API calls in parallel
	const [posts, categories, homepage] = await Promise.all([
		fetchAPI('/posts'),
		fetchAPI('/categories'),
		fetchAPI('/homepage'),
	])

	return {
		props: { posts, categories, homepage },
		revalidate: 1,
	}
}
