import { gql } from 'graphql-tag'

export const GET_POST_BY_SLUG = gql`
	query GetPostsBySlug($slug: String) {
		posts(filters: { slug: { eq: $slug } }) {
			data {
				attributes {
					title
					content
					description
					published
					authors {
						data {
							attributes {
								name
							}
						}
					}
					image {
						data {
							attributes {
								height
								width
								formats
								alternativeText
								url
							}
						}
					}
				}
			}
		}
	}
`

export const GET_POSTS = gql`
	# Write your query or mutation here
	query GetPosts {
		posts(sort: "published:desc") {
			data {
				attributes {
					title
					content
					description
					published
					authors {
						data {
							attributes {
								name
							}
						}
					}
					image {
						data {
							attributes {
								height
								width
								formats
								alternativeText
								url
							}
						}
					}
				}
			}
		}
	}
`

export const GET_CATEGORIES = gql`
	query GetCategories {
		categories {
			data {
				attributes {
					name
					slug
					posts {
						data {
							attributes {
								title
							}
						}
					}
				}
			}
		}
	}
`

export const GET_ALL_THINGS = gql`
	query GetAllThings {
		posts(sort: "published:desc", pagination: { page: 1, pageSize: 100 }) {
			data {
				id
				attributes {
					title
					content
					description
					authors {
						data {
							attributes {
								name
							}
						}
					}
					published
					slug
					image {
						data {
							attributes {
								width
								height
								url
								formats
							}
						}
					}
				}
			}
		}
		categories {
			data {
				id
				attributes {
					name
					posts {
						data {
							id
							attributes {
								title
							}
						}
					}
				}
			}
		}
		homepage {
			data {
				attributes {
					Hero {
						title
					}
					seo {
						metaTitle
						metaDescription
						twitterUsername
						twitterCardType
						shareImage {
							data {
								attributes {
									formats
									height
									width
									url
								}
							}
						}
					}
				}
			}
		}
	}
`
