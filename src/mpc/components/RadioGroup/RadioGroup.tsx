import React from 'react'

import RadioButton, { IRadioData } from './components/RadioButton'

export default function RadioGroup(props: {
  data: IRadioData[]
  checkedId: string | number
  name: string
  onChange: (arg0: number | string) => void
  disabledIds?: Array<string | number>
}): React.ReactElement {
  const { data, checkedId, name, onChange, disabledIds = [] } = props
  return (
    <div>
      {data.map((option) => (
        <RadioButton
          key={option.id}
          name={name}
          options={option}
          onChange={onChange}
          isChecked={checkedId === option.id}
          disabled={disabledIds.includes(option.id)}
        />
      ))}
    </div>
  )
}
