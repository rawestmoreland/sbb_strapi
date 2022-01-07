import Layout from '../../components/Layout'
import BatchTable from '../../components/BatchTable'
import { useRouter } from 'next/router'

const BatchList = ({ batches, page }) => {
	const router = useRouter()
	const changePage = (e) => {
		router.push({
			pathname: '/recipes',
			query: {
				page: parseInt(page) + 1,
			},
		})
	}
	return (
		<Layout>
			<BatchTable
				batches={batches}
				col_labels={['Batch Number', 'Recipe Name']}
			/>
			<button className='border rounded p-2' onClick={() => changePage()}>
				Next Page
			</button>
		</Layout>
	)
}

export const getServerSideProps = async ({ query }) => {
	const page = query.page || 1
	const offset = page * 10 - 10
	const limit = 10

	const res = await fetch(`http://localhost:8888/api/batches`, {
		method: 'POST',
		body: JSON.stringify({
			page,
			offset,
			limit,
		}),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	})

	const batches = await res.json()

	return {
		props: {
			batches,
			page,
		},
	}
}

export default BatchList
