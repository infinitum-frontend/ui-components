// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement, ReactNode } from 'react'
import { ReactComponent as CircleIcon } from 'Icons/circle.svg'
import { ReactComponent as CircleOutlinedIcon } from 'Icons/circle-outlined.svg'
import './StepperItem.scss'
import cn from 'classnames'

export interface StepperItemProps {
  status?: 'completed' | 'pending'
  direction?: 'vertical' | 'horizontal'
  id: string | number
  content: ReactNode
  clipped?: boolean
}

const StepperItem = ({
  status,
  content,
  clipped,
  direction = 'vertical'
}: StepperItemProps): ReactElement => {
  if (clipped && status !== 'completed') {
    console.error(`Stepper: Последний элемент должнен иметь статус completed`)
  }
  return (
    <div
      className={cn('inf-step', `inf-step--direction-${direction}`, {
        'inf-step--clipped': clipped
      })}
    >
      <span className={'inf-step__indicator'}>
        {status === 'completed' ? <CircleIcon /> : <CircleOutlinedIcon />}
      </span>
      {content}
    </div>
  )
}

export default StepperItem
