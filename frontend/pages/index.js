import Seo from '../components/Seo'
import Layout from '../components/Layout'
import PostList from '../components/PostList'
import client from '../lib/apollo-client'
import { GET_ALL_THINGS } from '../utils/graphql-queries'

export default function Home({ posts, categories, homepage }) {
	return (
		<Layout>
			<Seo seo={homepage.seo} />
			<div className='flex flex-col'>
				<PostList posts={posts} />
			</div>
		</Layout>
	)
}

export async function getServerSideProps() {
	// Run API calls in parallel
	const { data } = await client.query({
		query: GET_ALL_THINGS,
	})

	return {
		props: {
			posts: data.posts,
			categories: data.categories,
			homepage: data.homepage,
		},
	}
}
