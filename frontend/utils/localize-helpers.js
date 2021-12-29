export const formatSlug = (slug, locale, defaultLocale) => {
	return locale === defaultLocale ? `/${slug}` : `/${locale}/${slug}`
}

export const getLocalizedPaths = (pageContext) => {
	const { locales, defaultLocale, localizations, slug } = pageContext
	const paths = locales.map((locale) => {
		// map through all locales enabled in next.config.js ['en', 'es', 'de']
		if (localizations.length === 0)
			return {
				// if there is no localizations array provided by Strapi, we just return the defaultLocale page for all locales
				locale,
				href: formatSlug(slug, locale, defaultLocale), // format href so that it does not prepend /es or /de to the page
			}
		return {
			// if localizations array provided by Strapi return an object with locale and formatted href
			locale,
			href: localizePath({ ...pageContext, locale }), // object assign using spread which overrides locale in pageContext to mapped locale from next.config.js, which in our case will be either of 'es', 'en' or 'de'
		}
	})
	return paths
}

export const localizePath = (pageContext) => {
	// This will be called 3 times for 'es', 'en' and 'de'.
	// Let's say for this function call, it is called with pageContext.locale = 'de'
	const { locale, defaultLocale, localizations, slug } = pageContext
	let localeFound = localizations.find((a) => a.locale === locale) // it will look in the localizations array of the 'primera-pagina' page
	if (localeFound) return formatSlug(localeFound.slug, locale, defaultLocale)
	// if a 'de' version of the page is found, it will call formatSlug with the 'de' slug which is 'erste-seite'
	else return formatSlug(slug, locale, defaultLocale) // otherwise just return the default 'en' page
}
