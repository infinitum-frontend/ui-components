import { ReactElement } from 'react'
import { TableFilterDateOption } from 'Components/Table/types'
import { Space } from '~/src/components/Space'
import { DateRangeCalendar } from '~/src/components/DateRangeCalendar'
import { DateRangeCalendarValue } from '~/src/components/DateRangeCalendar/DateRangeCalendar'
import { Button } from '~/src/components/Button'
import { formatDateToISO, parseLocalDateString } from '~/src/utils/date'
import DateInput from '~/src/components/DateInput'

interface TableHeaderFilterDateRangeProps {
  value: TableFilterDateOption
  onChange: (value: TableFilterDateOption) => void
  onReset: () => void
}

// TODO: min, max, хуякс?
const TableHeaderFilterDateRange = ({
  value,
  onChange,
  onReset
}: TableHeaderFilterDateRangeProps): ReactElement => {
  const getValue = (): DateRangeCalendarValue => {
    const from = value.from ? new Date(value.from) : undefined
    const to = value.to ? new Date(value.to) : undefined
    return [from, to]
  }
  return (
    <Space>
      <Space direction="horizontal" gap="small">
        <DateInput
          placeholder="__.__.____"
          required
          clearable
          value={value.from}
          onClear={() => onChange({ ...value, from: '' })}
          onComplete={(date) => {
            const parsedDate = parseLocalDateString(date)
            if (parsedDate) {
              onChange({
                ...value,
                from: formatDateToISO(parsedDate)
              })
            }
          }}
        />
        -
        <DateInput
          placeholder="__.__.____"
          required
          value={value.to}
          clearable
          onClear={() => onChange({ ...value, to: '' })}
          onComplete={(date) => {
            const parsedDate = parseLocalDateString(date)
            if (parsedDate) {
              onChange({
                ...value,
                to: formatDateToISO(parsedDate)
              })
            }
          }}
        />
      </Space>

      <DateRangeCalendar
        value={getValue()}
        onChange={(dateArray) => {
          onChange({
            from: dateArray[0]?.toISOString(),
            to: dateArray[1]?.toISOString()
          })
        }}
      />
      <Space direction="horizontal" gap="small">
        <Button type="submit" variant="primary" size="small">
          Применить
        </Button>
        <Button type="button" variant="ghost" size="small" onClick={onReset}>
          Сбросить
        </Button>
      </Space>
    </Space>
  )
}

export default TableHeaderFilterDateRange
