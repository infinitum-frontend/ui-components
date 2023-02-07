import { StoryFn, Meta } from '@storybook/react'
import { Table } from './index'
import { ColumnDef } from '@tanstack/react-table'

const meta: Meta<typeof Table> = {
  title: 'Table',
  component: Table
}

interface Portfolio {
  portfolio: string
  mark: string
  type: string
  status: string
}
const columns: Array<ColumnDef<Portfolio, any>> = [
  {
    header: 'Портфель',
    id: 'portfolio',
    accessorKey: 'portfolio'
    // для рендеринга html
    // cell: info => info.getValue(),
    // для фильтрации по тексту по вложенным реакт-элементам
    // filterFn: 'elIncludesString',
    // meta: {
    //   filterType: 'input'
    // }
  },
  {
    header: 'Показатель',
    id: 'mark',
    accessorKey: 'mark'
    // meta: {
    //   filterType: 'input'
    // }
  },
  {
    header: 'Тип',
    id: 'type',
    accessorKey: 'type'
    // meta: {
    //   filterType: 'select'
    // }
  },
  {
    header: 'Статус',
    id: 'status',
    accessorKey: 'status'
    // meta: {
    //   filterType: 'select'
    // }
  }
]
const data: Portfolio[] = [
  {
    portfolio: 'ОПИФ Открытие — Telecommunicaton Index',
    mark: '2335',
    type: 'УВНР',
    status: 'Сформировано'
  },
  {
    portfolio: 'ОПИФ И Открытие — ИММВБ — высокая капитализация',
    mark: '2206',
    type: 'УВУН',
    status: 'Сформировано'
  },
  {
    portfolio: 'ОПИФ Открытие — Telecommunicaton Index',
    mark: '2206',
    type: 'УВУН',
    status: 'Сформировано'
  },
  {
    portfolio: 'ОПИФ И Открытие — ИММВБ — машиностроение',
    mark: '2206',
    type: 'УВНУ',
    status: 'На согласовании'
  }
]

export default meta

export const Base: StoryFn<typeof Table> = (args) => {
  return <Table {...args} columns={columns} rows={data} />
}

// export const Selection: StoryFn<typeof Table> = (args) => {
//   const handleChange: OnChangeFn<RowSelectionState> = (data) => {
//     console.log('handleChange', data)
//   }
//
//   return (
//     <Table
//       columns={columns}
//       rows={data}
//       withRowSelection={true}
//       onChangeRowSelection={handleChange}
//     />
//   )
// }

// export const GroupSeparators: StoryFn<typeof Table> = (args) => {
//   const groupedByDate = [
//     {
//       row: '25.01 Среда',
//       subRows: [
//         {
//           portfolio: 'ОПИФ Открытие — Telecommunicaton Index',
//           mark: '2335',
//           type: 'УВНР',
//           status: 'Сформировано'
//         }
//       ]
//     },
//     {
//       row: '22.01 Воскресенье',
//       subRows: [
//         {
//           portfolio: 'ОПИФ И Открытие — ИММВБ — высокая капитализация',
//           mark: '2206',
//           type: 'УВУН',
//           status: 'Сформировано'
//         },
//         {
//           portfolio: 'ОПИФ И Открытие — ИММВБ — машиностроение',
//           mark: '2206',
//           type: 'УВНУ',
//           status: 'На согласовании'
//         }
//       ]
//     },
//     {
//       row: '24.01 Вторник',
//       subRows: [
//         {
//           portfolio: 'ОПИФ Открытие — Telecommunicaton Index',
//           mark: '2206',
//           type: 'УВУН',
//           status: 'Сформировано'
//         }
//       ]
//     }
//   ]
//   return (
//     <Table
//       {...args}
//       columns={columns}
//       data={groupedByDate}
//       enableGrouping={true}
//     />
//   )
// }

// export const Sorting = Base.bind({})
// Sorting.args = { withSorting: true }
//
// export const Filtering: StoryFn<typeof Table> = (args) => {
//   const [resData, setResData] = useState(data)
//
//   const handleFiltersChange = (state: ColumnFiltersState): void => {
//     let result = data
//     state.forEach((pos) => {
//       result = result.filter((item) => {
//         return Boolean(
//           item[pos.id as keyof typeof item].match(pos.value as string)
//         )
//       })
//     })
//
//     setResData(result)
//   }
//   return (
//     <div>
//       <Table
//         {...args}
//         columns={columns}
//         rows={resData}
//         withFiltering={true}
//         onFiltersChange={handleFiltersChange}
//       />
//     </div>
//   )
// }
// Filtering.args = { withFiltering: true }
