import Image from 'next/image'
import PropTypes from 'prop-types'
import { getStrapiMedia } from '../utils/api-helpers'

const NextImage = ({ media, ...props }) => {
	const { url, alternativeText } = media

	const loader = ({ src }) => {
		return getStrapiMedia(src)
	}

	if (props.width && props.height) {
		return (
			<Image
				loader={loader}
				src={url}
				alt={alternativeText || ''}
				width={props.width}
				height={props.height}
			/>
		)
	}

	if (url.startsWith('https://res.cloudinary.com')) {
		return (
			<Image
				layout='responsive'
				width={media.width}
				height={media.height}
				objectFit='contain'
				src={url}
				alt={alternativeText || ''}
			/>
		)
	}

	return (
		<Image
			loader={loader}
			layout='responsive'
			width={media.width}
			height={media.height}
			objectFit='contain'
			src={url}
			alt={alternativeText || ''}
		/>
	)
}

Image.propTypes = {
	className: PropTypes.string,
}

export default NextImage
