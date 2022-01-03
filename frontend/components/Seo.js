import PropTypes from 'prop-types'
import { mediaPropTypes } from '../utils/types'
import { NextSeo } from 'next-seo'
import { useContext } from 'react'
import { GlobalContext } from '../pages/_app'
import { getStrapiMedia } from '../utils/api-helpers'

const Seo = ({ seo }) => {
	const { metadata, siteName } = useContext(GlobalContext)
	const seoWithDefaults = {
		...metadata,
		...seo,
	}
	const fullSeo = {
		...seoWithDefaults,
		metaTitle: `${
			seoWithDefaults.metaTitle === siteName
				? siteName + ' | ' + seoWithDefaults.metaDescription
				: seoWithDefaults.metaTitle + ' | ' + siteName
		}`,
		shareImage: seoWithDefaults.shareImage || null,
	}

	return (
		<NextSeo
			title={fullSeo.metaTitle || ''}
			description={fullSeo.metaDescription || ''}
			openGraph={{
				// Title and description are mandatory
				title: fullSeo.metaTitle || '',
				description: fullSeo.metaDescription || '',
				// Only include OG image if we have it
				// Careful: if you disable image optimization in Strapi, this will break
				...(fullSeo.shareImage && {
					images: Object.values(fullSeo.shareImage.formats).map(
						(image) => {
							return {
								url: getStrapiMedia(image.url),
								width: image.width,
								height: image.height,
							}
						}
					),
				}),
			}}
			// Only included Twitter data if we have it
			twitter={{
				...(fullSeo.twitterCardType && {
					cardType: fullSeo.twitterCardType,
				}),
				// Handle is the twitter username of the content creator
				...(fullSeo.twitterUsername && {
					handle: fullSeo.twitterUsername,
				}),
			}}
		/>
	)
}

Seo.propTypes = {
	metadata: PropTypes.shape({
		metaTitle: PropTypes.string.isRequired,
		metaDescription: PropTypes.string.isRequired,
		shareImage: mediaPropTypes,
		twitterCardType: PropTypes.string,
		twitterUsername: PropTypes.string,
	}),
}

export default Seo
