import React from 'react'
import styles from '../RadioGroup.module.css'

export interface IRadioData {
  id: string | number
  title: string
}

export default function RadioButton(props: {
  name: string
  isChecked?: boolean
  disabled?: boolean
  options: { id: number | string; title: string }
  onChange: (arg0: number | string) => void
}): React.ReactElement {
  const { name, isChecked, disabled = false, options, onChange } = props // fix css for disabled
  return (
    <label className={styles.radioLabel}>
      <input
        className={styles.radioInput}
        type="radio"
        disabled={disabled}
        value={options.id}
        name={name}
        onChange={() => onChange(options.id)}
        checked={isChecked}
      />
      <span
        className={disabled ? styles.radioTitleDisabled : styles.radioTitle}
      >
        {options.title}
      </span>
    </label>
  )
}
