import { ReactElement, ReactNode } from 'react'
import { ReactComponent as CircleIcon } from 'Icons/circle.svg'
import { ReactComponent as CircleOutlinedIcon } from 'Icons/circle-outlined.svg'
import './step.scss'
import cn from 'classnames'

export interface StepProps {
  status?: 'completed' | 'pending'
  direction?: 'vertical' | 'horizontal'
  id: string | number
  content: ReactNode
  clipped?: boolean
}

const Step = ({
  status,
  content,
  clipped,
  direction = 'vertical'
}: StepProps): ReactElement => {
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

export default Step
