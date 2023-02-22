// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement } from 'react'
import { flexRender, Row } from '@tanstack/react-table'

export interface TableBodyProps {
  rows: Array<Row<any>>
  // columns?: Array<ColumnDef<any>>
  // grouping?: boolean
}

const TableBody = ({ rows }: TableBodyProps): ReactElement => {
  return (
    <tbody>
      {rows.map((row) => {
        return (
          <tr
            key={row.id}
            className={row.original.className}
            style={row.original.style}
          >
            {row.getVisibleCells().map((cell, index) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        )
      })}

      {/*  // return grouping ? ( */}
      {/*  //   <Fragment key={row.id}> */}
      {/*  //     <tr className={'inf-table__group-label'}> */}
      {/*  //       /!* TODO: тут нужно кастомное поле *!/ */}
      {/*  //       <td>{row.original.row}</td> */}
      {/*  //       {Array.from({ length: columns.length - 1 }).map((item, index) => ( */}
      {/*  //         <td key={row.id + String(index)} /> */}
      {/*  //       ))} */}
      {/*  //     </tr> */}
      {/*  // */}
      {/*  //     {row.subRows.map((subRow) => ( */}
      {/*  //       <tr key={subRow.id}> */}
      {/*  //         {Object.keys(subRow.original).map((key, index) => ( */}
      {/*  //           <td key={subRow.id + String(index)}> */}
      {/*  //             {subRow.original[key]} */}
      {/*  //           </td> */}
      {/*  //         ))} */}
      {/*  //       </tr> */}
      {/*  //     ))} */}
      {/*  //   </Fragment> */}
      {/*  // ) : ( */}
      {/*  //   <tr key={row.id}> */}
      {/*  //     {row.getVisibleCells().map((cell, index) => ( */}
      {/*  //       <td key={cell.id}> */}
      {/*  //         {flexRender(cell.column.columnDef.cell, cell.getContext())} */}
      {/*  //       </td> */}
      {/*  //     ))} */}
      {/*  //   </tr> */}
      {/*  // ) */}
      {/* // })} */}
    </tbody>
  )
}

export default TableBody
