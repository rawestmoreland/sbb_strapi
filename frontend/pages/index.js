import Head from 'next/head'

export default function Home() {
	return <div>hello</div>
}

export async function getStaticProps() {
	// Run API calls in parallel
	const [articles, categories, homepage] = await Promise.all([
		fetchAPI('/articles'),
		fetchAPI('/categories'),
		fetchAPI('/homepage'),
	])

	return {
		props: { articles, categories, homepage },
		revalidate: 1,
	}
}
