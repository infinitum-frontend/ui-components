// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StoryFn, Meta } from '@storybook/react'
import { useState } from 'react'
import { DateCalendar } from './index'
import DateCalendarMonths from './DateCalendarMonths'
import DateCalendarYears from './DateCalendarYears'
import DateCalendarDays from './DateCalendarDays'
import { formatDateToISO } from '~/src/utils/date'

const meta: Meta<typeof DateCalendar> = {
  title: 'Components/DateCalendar',
  component: DateCalendar
}

export default meta

const Template: StoryFn<typeof DateCalendar> = ({ ...args }) => {
  const [value, setValue] = useState<Date>(new Date())

  return <DateCalendar {...args} value={value} onChange={setValue} />
}

export const Playground = {
  render: Template
}

// export const Days = {
//   render: () => {
//     const [value, setValue] = useState<Date>()
//
//     return (
//       <div style={{ width: '224px', height: '264px' }}>
//         <DateCalendarDays
//           value={value}
//           onChange={setValue}
//           displayValue={new Date()}
//         />
//       </div>
//     )
//   }
// }
//
export const Months = {
  render: () => {
    const [value, setValue] = useState<number>()

    return (
      <div style={{ width: '224px', height: '264px' }}>
        <DateCalendarMonths value={value} onChange={setValue} />
      </div>
    )
  }
}

export const Years = {
  render: () => {
    const [value, setValue] = useState<number>()

    return (
      <div style={{ width: '224px', height: '264px' }}>
        <DateCalendarYears value={value} onChange={setValue} />
      </div>
    )
  }
}

export const WithDisabledDays = {
  render: () => {
    const [value, setValue] = useState<Date>()

    return (
      <div style={{ width: '224px', height: '264px' }}>
        <DateCalendarDays
          value={value}
          onChange={setValue}
          displayValue={new Date()}
          min={formatDateToISO(new Date())}
        />
      </div>
    )
  }
}
