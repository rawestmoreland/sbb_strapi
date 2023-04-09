import NextImage from "next/legacy/image"

const Image = ({ media, ...props }) => {
	const { url, alternativeText, width, height } = media.data.attributes

	// const loader = ({ src }) => {
	// 	return getStrapiMedia(src)
	// }
	return (
		<NextImage
			// loader={loader()}
			layout='responsive'
			objectFit='contain'
			src={url}
			alt={alternativeText || ''}
			width={width}
			height={height}
		/>
	)
}

export default Image
