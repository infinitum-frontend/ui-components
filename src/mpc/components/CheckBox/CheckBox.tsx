import React, { MouseEvent } from 'react'
import styles from './CheckBox.module.css'
import cn from 'classnames'

export type TCheckBoxStatus = 'checked' | 'unchecked' | 'indeterminate'

export interface ICheckBoxProps {
  status?: TCheckBoxStatus
  disabled?: boolean
  onClick?: () => void
  className?: string
}

export default function CheckBox(props: ICheckBoxProps): React.ReactElement {
  const {
    status = 'unchecked',
    disabled = false,
    onClick = () => {
      /* default func */
    },
    className
  } = props

  const onClickWithoutPropagation = (
    event: MouseEvent<HTMLDivElement>
  ): void => {
    event.stopPropagation()
    if (disabled) return
    onClick()
  }

  const classNames = cn(
    styles.checkBox,
    {
      [styles.unchecked]: status === 'unchecked',
      [styles.checked]: status === 'checked',
      [styles.indeterminate]: status === 'indeterminate',
      [styles.disabled]: disabled
    },
    className
  )

  return (
    <div
      className={classNames}
      role="checkbox"
      onClick={onClickWithoutPropagation}
    />
  )
}
