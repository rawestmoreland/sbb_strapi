import { useMemo } from 'react'
import { useTable } from 'react-table'
import { format } from 'date-fns'

const BatchTable = ({ col_labels, batches }) => {
	console.log(batches)
	const data = batches.map((r) => {
		const shareLink = r._share
			? `https://share.brewfather.app/${r._share}`
			: ''
		return {
			col0: r.batchNo,
			col1: r.recipe.name,
			col2: format(new Date(r.brewDate), 'MM/dd/yyyy'),
			col3: shareLink,
		}
	})

	const columns = useMemo(
		() =>
			col_labels.map((el, idx) => {
				return {
					Header: el,
					accessor: `col${idx}`,
					Cell: (e) => {
						if (e.value.toString().startsWith('http')) {
							return (
								<a
									href={e.value}
									target='_blank'
									rel='noopener noreferrer'
									className='text-blue-400 cursor'
								>
									Recipe Link
								</a>
							)
						}
						return e.value.toString()
					},
				}
			}),
		[]
	)

	const tableInstance = useTable({ columns, data })

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = tableInstance

	return (
		<div className='mx-auto'>
			<table
				className='table-auto mx-auto border-collapse border border-gray-500'
				{...getTableProps()}
			>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th
									className='border border-gray-600 p-3 text-left'
									{...column.getHeaderProps()}
								>
									{column.render('Header')}
								</th>
							))}
						</tr>
					))}
				</thead>

				<tbody {...getTableBodyProps()}>
					{rows.map((row) => {
						prepareRow(row)
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td
											className='border border-gray-700 px-3 py-2'
											{...cell.getCellProps()}
										>
											{cell.render('Cell')}
										</td>
									)
								})}
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default BatchTable
