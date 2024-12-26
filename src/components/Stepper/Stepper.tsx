// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import StepperItem, { StepperItemProps } from './components/StepperItem'
import cn from 'classnames'
import './Stepper.scss'

export interface StepperProps {
  /** Массив существующих этапов */
  steps: StepperItemProps[]
  direction?: 'vertical'
}

/** Визуальный индикатор пошагового прогресса */
const Stepper = ({
  steps = [],
  direction = 'vertical'
}: StepperProps): ReactElement => {
  const [items, setItems] = useState<HTMLCollection>()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      setItems(ref.current?.children)
    }
  }, [steps, ref.current])

  return (
    <div
      ref={ref}
      className={cn('inf-stepper', `inf-stepper--direction-${direction}`)}
    >
      {steps.map((step) => (
        <StepperItem
          key={step.id}
          {...step}
          stepsNodes={items}
          direction={direction}
          variant={step.variant}
        />
      ))}
    </div>
  )
}

export default Stepper
