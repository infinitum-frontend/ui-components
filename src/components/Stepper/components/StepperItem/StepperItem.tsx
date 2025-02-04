// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement, ReactNode } from 'react'
import { ReactComponent as CircleIcon } from 'Icons/circle.svg'
import './StepperItem.scss'
import cn from 'classnames'
import { Icon } from '~/src/components/Icon'

export interface StepperItemProps {
  variant?: 'success' | 'secondary'
  direction?: 'vertical' | 'horizontal'
  id: string | number
  content: ReactNode
  index: number
  stepsNodes?: HTMLCollection
}

const StepperItem = ({
  variant = 'secondary',
  content,
  direction = 'vertical',
  index,
  stepsNodes
}: StepperItemProps): ReactElement => {
  const currentItemHeight = stepsNodes?.item(index)?.clientHeight || 20
  const nextItemHeight = stepsNodes?.item(index + 1)?.clientHeight || 20

  return (
    <div
      style={{
        '--itemHeight': `${currentItemHeight}px`,
        '--nextItemHeight': `${nextItemHeight}px`
      }}
      className={cn(
        'inf-step',
        `inf-step--direction-${direction}`,
        `inf-step--variant-${variant}`
      )}
    >
      <Icon
        size="large"
        color={variant === 'secondary' ? 'primary-disabled' : variant}
      >
        <CircleIcon />
      </Icon>
      {content}
    </div>
  )
}

export default StepperItem
