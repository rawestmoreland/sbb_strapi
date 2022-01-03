import ReactMarkdown from 'react-markdown'
import { format } from 'date-fns'
import client from '../../lib/apollo-client'
import gql from 'graphql-tag'
import { fetchAPI, getStrapiMedia } from '../../utils/api-helpers'
import Layout from '../../components/Layout'
import Image from '../../components/Image'
import Seo from '../../components/Seo'

const Post = ({ post }) => {
	const imageUrl = getStrapiMedia(post.image.url)

	const seo = {
		metaTitle: post.title,
		metaDescription: post.description,
		shareImage: post.image,
		article: true,
	}

	return (
		<Layout>
			<Seo seo={seo} />
			<div className='postContent'>
				<Image media={post.image} />
				<h1>{post.title}</h1>
				<div className='my-4 text-gray-600'>
					<em>{`Author: ${post.author.name}`}</em>
				</div>
				<hr className='mb-6' />
				<ReactMarkdown children={post.content} />
			</div>
		</Layout>
	)
}

export async function getStaticPaths() {
	// const posts = await fetchAPI('/posts')

	const { data } = await client.query({
		query: gql`
			query {
				posts {
					slug
				}
			}
		`,
	})

	return {
		paths: data.posts.map((post) => ({
			params: {
				slug: post.slug,
			},
		})),
		fallback: false,
	}
}

export async function getStaticProps({ params }) {
	const { data } = await client.query({
		query: gql`
			query GetPostsBySlug($slug: String) {
				posts(where: { slug: $slug }) {
					title
					content
					description
					published
					author {
						name
					}
					image {
						height
						width
						formats
						alternativeText
						url
					}
				}
			}
		`,
		variables: {
			slug: params.slug ? params.slug : '',
		},
	})

	return {
		props: { post: data.posts[0] },
		revalidate: 1,
	}
}

export default Post
