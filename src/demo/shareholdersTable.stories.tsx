import { ReactElement, useState } from 'react'
import {
  Table,
  TableRowData,
  ColumnDef,
  TableColumnFiltersState
} from '../components/Table'
import { Meta } from '@storybook/react'
import { SearchInput } from '../components/Input'
import { Space } from '../components/Space'
import { Link } from '../components/Link'
import { Button } from '../components/Button'
import { Divider } from '../components/Divider'
// @ts-expect-error
import { ReactComponent as PadlockIcon } from 'Icons/padlock.svg'

const meta: Meta = {
  title: 'Demo/ShareholdersTable'
}

export default meta

export const ShareholdersTableStories = (): ReactElement => {
  interface Data {
    fio: string
    address: string
    passport: string
    nationality: string
    email: string
  }

  const columns: Array<ColumnDef<Data>> = [
    {
      id: 'icon',
      cell: (cell) => {
        return cell.row.original.nationality !== 'Россия' ? (
          <PadlockIcon style={{ color: 'red' }} />
        ) : null
      }
    },
    {
      header: 'ФИО',
      id: 'fio',
      size: 25,
      accessorKey: 'fio',
      cell: (cell) => <Link>{cell.getValue() as string}</Link>
    },
    {
      header: 'Документ о регистрации',
      id: 'passport',
      size: 25,
      accessorKey: 'passport'
    },
    {
      header: 'Адрес регистрации',
      id: 'address',
      size: 25,
      accessorKey: 'address'
    },
    {
      header: 'Гражданство',
      id: 'nationality',
      accessorKey: 'nationality'
    },
    {
      header: 'Email',
      id: 'email',
      accessorKey: 'email',
      cell: (cell) => cell.getValue()
    }
  ]
  const data: Array<TableRowData<Data>> = [
    {
      fio: 'София Алексеева',
      passport: '88e122bf',
      address:
        '622031, Нижегородская область, город Дмитров, въезд Сталина, 95',
      nationality: 'Россия',
      email: 'ananij.efremov@orehov.org'
    },
    {
      fio: 'Илья Соколов',
      passport: 'dea813b0',
      address: '620178, Амурская область, город Лотошино, бульвар Гоголя, 54',
      nationality: 'Казахстан',
      className: 'custom-class',
      style: { backgroundColor: '#E9EBED' },
      email: 'gennadij71@abramova.ru'
    },
    {
      fio: 'Александра Смирнова',
      passport: 'fb1cb0ee',
      address:
        '412184, Воронежская область, город Балашиха, пл. Домодедовская, 18',
      nationality: 'Россия',
      email: 'trofimov.inna@kuznecov.ru'
    },
    {
      fio: 'Инга Семёнова',
      passport: 'c0165f57',
      address: '156947, Мурманская область, город Люберцы, ул. Ленина, 52',
      nationality: 'Россия',
      email: 'mlavrenteva@rambler.ru'
    },
    {
      fio: 'Захар Макаров',
      passport: '34057201',
      address:
        '565820, Архангельская область, город Наро-Фоминск, спуск 1905 года, 50',
      nationality: 'Россия',
      email: 'simonova.artemij@yandex.ru'
    },
    {
      fio: 'Аркадий Филиппов',
      passport: 'f344c8a6',
      address:
        '206960, Саратовская область, город Павловский Посад, бульвар Будапештсткая, 56',
      nationality: 'Россия',
      email: 'lusa.fomiceva@rambler.ru'
    },
    {
      fio: 'Сергей Медведев',
      passport: 'e3108d47',
      address:
        '635791, Саратовская область, город Домодедово, пер. Гагарина, 57',
      nationality: 'Россия',
      email: 'alena.visnakova@yandex.ru'
    },
    {
      fio: 'Майя Лебедева',
      passport: '4cfe6fbf',
      address: '538973, Тверская область, город Солнечногорск, пр. Славы, 07',
      nationality: 'Россия',
      email: 'boris33@ermakov.ru'
    },
    {
      fio: 'Оксана Алексеева',
      passport: '900d3ed0',
      address: '230828, Тверская область, город Красногорск, наб. Сталина, 48',
      nationality: 'Россия',
      email: 'ekaterina.lapin@bk.ru'
    },
    {
      fio: 'Август Сорокин',
      passport: 'ba946059',
      address: '645984, Тверская область, город Истра, пер. Гагарина, 43',
      nationality: 'Россия',
      email: 'timofej38@narod.ru'
    },
    {
      fio: 'Степан Соловьев',
      passport: '5da267dc',
      address:
        '485534, Ленинградская область, город Раменское, ул. Ломоносова, 86',
      nationality: 'Россия',
      email: 'emilia.melnikov@lazareva.ru'
    },
    {
      fio: 'Денис Богданов',
      passport: '2c045a38',
      address: '801206, Кировская область, город Серпухов, проезд Косиора, 93',
      nationality: 'Россия',
      email: 'valeria13@inbox.ru'
    },
    {
      fio: 'Артемий Смирнов',
      passport: 'edb2d141',
      address: '588905, Псковская область, город Видное, шоссе Сталина, 82',
      nationality: 'Россия',
      email: 'petr.blinova@inbox.ru'
    }
  ]

  const [rows, setRows] = useState(data)
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const [filters, setFilters] = useState<TableColumnFiltersState>([])

  const applyFilters = (): void => {
    let result = data
    filters.forEach((filter) => {
      result = result.filter((item) =>
        // @ts-expect-error
        item[filter.id].match(filter.value)
      )
    })

    setRows(result)
  }

  const resetFilters = (): void => {
    setValue1('')
    setValue2('')
    setRows(data)
  }

  const handleInput1 = (value: string): void => {
    setValue1(value)
    setFilters((prev) => [
      ...prev.filter((item) => item.id !== 'fio'),
      { id: 'fio', value, filterType: 'input' }
    ])
  }

  const handleInput2 = (value: string): void => {
    setValue2(value)
    setFilters((prev) => [
      ...prev.filter((item) => item.id !== 'email'),
      { id: 'email', value, filterType: 'input' }
    ])
  }

  return (
    <Space>
      <Space direction={'horizontal'}>
        <SearchInput
          placeholder={'Пайщик'}
          allowClear={true}
          style={{ width: 'max-content' }}
          value={value1}
          onInput={handleInput1}
        />
        <SearchInput
          placeholder={'Email'}
          allowClear={true}
          style={{ width: 'max-content' }}
          value={value2}
          onInput={handleInput2}
        />
        <Button variant={'secondary'} onClick={applyFilters}>
          Найти
        </Button>
        <Button variant={'secondary'} onClick={resetFilters}>
          Сбросить
        </Button>
      </Space>
      <Divider variant="secondary" />
      <Table columns={columns} rows={rows} maxLength={25} />
    </Space>
  )
}
