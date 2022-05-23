import ReactMarkdown from 'react-markdown'
import client from '../../lib/apollo-client'
import gql from 'graphql-tag'
import { GET_POST_BY_SLUG } from '../../utils/graphql-queries'
import Layout from '../../components/Layout'
import Image from '../../components/Image'
import Seo from '../../components/Seo'

const Post = ({ post }) => {
	const seo = {
		metaTitle: post.attributes.title,
		metaDescription: post.attributes.description,
		shareImage: post.attributes.image,
		article: true,
	}

	return (
		<Layout>
			<Seo seo={seo} />
			<div className='postContent'>
				<Image media={post.attributes.image} />
				<h1>{post.title}</h1>
				<div className='my-4 text-gray-600'>
					<em>{`Author: ${post.attributes.authors.data[0].attributes.name}`}</em>
				</div>
				<hr className='mb-6' />
				<ReactMarkdown children={post.attributes.content} />
			</div>
		</Layout>
	)
}

export async function getStaticPaths() {
	// const posts = await fetchAPI('/posts')

	const { data } = await client.query({
		query: gql`
			query {
				posts(
					sort: "published:desc"
					pagination: { page: 1, pageSize: 100 }
				) {
					data {
						attributes {
							slug
						}
					}
				}
			}
		`,
	})

	return {
		paths: data.posts.data.map((post) => {
			return {
				params: {
					slug: post.attributes.slug,
				},
			}
		}),
		fallback: false,
	}
}

export async function getStaticProps({ params }) {
	const { data } = await client.query({
		query: GET_POST_BY_SLUG,
		variables: {
			slug: params.slug ? params.slug : '',
		},
	})

	return {
		props: { post: data.posts.data[0] },
		revalidate: 1,
	}
}

export default Post
