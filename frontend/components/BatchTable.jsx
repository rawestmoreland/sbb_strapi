import { useMemo } from 'react'
import { useTable } from 'react-table'

const BatchTable = ({ col_labels, batches }) => {
	const data = batches.map((r) => {
		return {
			col0: r.batchNo,
			col1: r.recipe.name,
		}
	})

	const columns = useMemo(
		() =>
			col_labels.map((el, idx) => {
				return {
					Header: el,
					accessor: `col${idx}`,
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
		<table {...getTableProps()}>
			<thead>
				{headerGroups.map((headerGroup) => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<th {...column.getHeaderProps()}>
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
									<td {...cell.getCellProps()}>
										{cell.render('Cell')}
									</td>
								)
							})}
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}

export default BatchTable
