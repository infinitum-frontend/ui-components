import React from 'react'
import styles from './CheckBoxList.module.css'
import { Checkbox } from '../CheckBox'

export interface ICheckBoxListOption {
  id: number
  title: string
}

const ListItem = (props: {
  option: ICheckBoxListOption
  selectedOptions: ICheckBoxListOption[]
  onChange: (arg0: ICheckBoxListOption[]) => void
}): React.ReactElement => {
  const { option, selectedOptions, onChange } = props
  const isChecked = selectedOptions.includes(option)

  const handleChange = (): void => {
    const nextSelectedOptions = isChecked
      ? selectedOptions.filter(
          (selectedOption) => selectedOption.id !== option.id
        )
      : [...selectedOptions, option]
    onChange(nextSelectedOptions)
  }

  return (
    <div className={styles.listItem} role="checkbox">
      <Checkbox
        onClick={handleChange}
        className={styles.checkBox}
        status={isChecked ? 'checked' : 'unchecked'}
      />
      <div className={styles.itemTitle} onClick={handleChange}>
        {option.title}
      </div>
    </div>
  )
}

export interface ICheckBoxListProps {
  selectedOptions: ICheckBoxListOption[]
  data: ICheckBoxListOption[]
  onChange: (arg0: ICheckBoxListOption[]) => void
  className?: string
}

export default function CheckBoxList(
  props: ICheckBoxListProps
): React.ReactElement {
  const { selectedOptions, data, onChange, className = '' } = props

  return (
    <div className={className}>
      {data.map((option) => (
        <ListItem
          key={option.id}
          option={option}
          selectedOptions={selectedOptions}
          onChange={onChange}
        />
      ))}
    </div>
  )
}
