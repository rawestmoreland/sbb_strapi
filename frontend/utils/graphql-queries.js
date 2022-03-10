import { gql } from 'graphql-tag'

export const GET_POST_BY_SLUG = gql`
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
`

export const GET_POSTS = gql`
	query GetPosts {
		posts(sort: "published:desc") {
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
`

export const GET_CATEGORIES = gql`
	query GetCategories {
		categories {
			name
			slug
			posts {
				id
				title
			}
		}
	}
`

export const GET_ALL_THINGS = gql`
	query GetAllThings {
		posts(limit: 5, sort: "published:desc") {
			id
			title
			content
			description
			author {
				name
			}
			published
			slug
			image {
				width
				height
				url
				formats
			}
		}
		categories {
			id
			name
			posts {
				id
				title
			}
		}
		homepage {
			hero {
				title
			}
			seo {
				metaTitle
				metaDescription
				twitterUsername
				twitterCardType
				shareImage {
					formats
					height
					width
					url
				}
			}
		}
	}
`
