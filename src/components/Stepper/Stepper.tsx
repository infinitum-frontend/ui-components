// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement } from 'react'
import StepperItem, { StepperItemProps } from './components/StepperItem'
import cn from 'classnames'
import './Stepper.scss'

export interface StepperProps {
  /** Массив существующих этапов */
  steps: StepperItemProps[]
  /** Текущий шаг. Все предыдущие шаги считаются выполненными. status, указанный в элементе Step, имеет приоритет над этим свойством  */
  current?: number
  /** Урезанный вариант (отображается оборванный соединитель после завершающего элемента). Последний элемент при должнен быть завершенным. */
  clipped?: boolean
  direction?: 'vertical' | 'horizontal'
}

const getStatusByIndex = (
  current: number,
  index: number
): StepperItemProps['status'] => {
  return current > index ? 'completed' : 'pending'
}

/** Визуальный индикатор пошагового прогресса */
const Stepper = ({
  steps = [],
  current = 0,
  clipped = false,
  direction = 'vertical'
}: StepperProps): ReactElement => {
  return (
    <div className={cn('inf-stepper', `inf-stepper--direction-${direction}`)}>
      {steps.map((step, index) => (
        <StepperItem
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
