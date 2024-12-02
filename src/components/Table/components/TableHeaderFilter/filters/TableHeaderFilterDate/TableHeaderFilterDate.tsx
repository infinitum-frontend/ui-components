// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement } from 'react'
import { Button } from 'Components/Button'
import { Space } from '~/src/components/Space'
import { DatePickerInline, DatePickerProps } from '~/src/components/DatePicker'

interface TableHeaderFilterDateProps {
  value?: DatePickerProps['value']
  onChange?: DatePickerProps['onChange']
  onReset: () => void
}

const TableHeaderFilterDate = ({
  value,
  onChange,
  onReset
}: TableHeaderFilterDateProps): ReactElement => {
  return (
    <Space className="inf-table-header-filter-date" gap="small">
      <DatePickerInline value={value} onChange={onChange} />
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

export default TableHeaderFilterDate
