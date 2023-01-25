import { ReactElement } from 'react'
import Step, { StepProps } from './Step'
import cn from 'classnames'
import './index.scss'

export interface StepperProps {
  /** Массив существующих этапов */
  steps: StepProps[]
  /** Текущий шаг. Все предыдущие шаги считаются выполненными. status, указанный в элементе Step, имеет приоритет над этим свойством  */
  current?: number
  /** Урезанный вариант (отображается оборванный соединитель после завершающего элемента). Последний элемент при должнен быть завершенным. */
  clipped?: boolean
  direction?: 'vertical' | 'horizontal'
}

const getStatusByIndex = (
  current: number,
  index: number
): StepProps['status'] => {
  return current > index ? 'completed' : 'pending'
}

const Stepper = ({
  steps = [],
  current = 0,
  clipped = false,
  direction = 'vertical'
}: StepperProps): ReactElement => {
  return (
    <div className={cn('inf-stepper', `inf-stepper--direction-${direction}`)}>
      {steps.map((step, index) => (
        <Step
          key={step.id}
          {...step}
          direction={direction}
          status={step.status ? step.status : getStatusByIndex(current, index)}
          clipped={clipped && index === steps.length - 1}
        />
      ))}
    </div>
  )
}

export default Stepper
