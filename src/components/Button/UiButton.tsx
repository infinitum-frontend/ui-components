import './index.scss'
import React, { ReactNode } from 'react'
import { TestSelectors } from '../../../test/selectors'

export interface IButtonProps {
  children?: ReactNode
  /* Цветовая тема */
  variant?: keyof typeof ButtonVariants
  onClick?: () => void
}

export enum ButtonVariants {
  red = 'red',
  blue = 'blue'
}

const UiButton = (props: IButtonProps): ReactNode => {
  const { children, variant = ButtonVariants.red, onClick } = props

  return (
    <button onClick={onClick}
            data-testid={TestSelectors.button.root}
            className={`ui-button ui-button--variant-${variant}`}>{children}<p>hello</p>
    </button>
  )
}

export default UiButton
