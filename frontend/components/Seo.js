import Head from 'next/head';
import { useContext } from 'react';
import { GlobalContext } from '../pages/_app';
import { getStrapiMedia } from '../lib/media';
import PropTypes from 'prop-types';

const SEO = ({ seo }) => {
	const { defaultSeo, siteName } = useContext(GlobalContext);
	const seoWithDefaults = {
		...defaultSeo,
		...seo,
	};
	console.log(seoWithDefaults);
	return <div></div>;
};

Seo.propTypes = {};

export default SEO;
