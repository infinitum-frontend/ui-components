import { ReactElement } from 'react'
import { Button, Grid, Space } from '~/src'
import IconArrowLeft from 'Icons/arrow-left.svg?react'
import IconArrowRight from 'Icons/arrow-right.svg?react'
import { capitalize } from 'Utils/helpers'
import { oneMonthAhead } from '~/src/utils/date'

export interface DateRangeCalendarHeaderProps {
  onArrowLeftClick: () => void
  onArrowRightClick: () => void
  date: Date
}

const DateRangeCalendarHeader = ({
  onArrowLeftClick,
  onArrowRightClick,
  date
}: DateRangeCalendarHeaderProps): ReactElement => {
  const nextMonthDate = oneMonthAhead(date)
  return (
    <Grid templateColumns="1fr 1fr">
      <Space direction="horizontal" align="center" gap="xxlarge">
        <Button
          variant="ghost"
          size="small"
          icon={<IconArrowLeft />}
          onClick={onArrowLeftClick}
        />

        <Space direction="horizontal" align="center" gap="xsmall">
          <span>
            {capitalize(date.toLocaleDateString('ru-Ru', { month: 'long' }))}
          </span>

          <span>{date.toLocaleDateString('ru-Ru', { year: 'numeric' })}</span>
        </Space>
      </Space>

      <Space
        direction="horizontal"
        align="center"
        gap="xxlarge"
        style={{ justifySelf: 'end' }}
      >
        <Space direction="horizontal" align="center" gap="xsmall">
          <span>
            {capitalize(
              nextMonthDate.toLocaleDateString('ru-Ru', { month: 'long' })
            )}
          </span>
          <span>
            {nextMonthDate.toLocaleDateString('ru-Ru', { year: 'numeric' })}
          </span>
        </Space>

        <Button
          variant="ghost"
          size="small"
          icon={<IconArrowRight />}
          onClick={onArrowRightClick}
        />
      </Space>
    </Grid>
  )
}

export default DateRangeCalendarHeader
