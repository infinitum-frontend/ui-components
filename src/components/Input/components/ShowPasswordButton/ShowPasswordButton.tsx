import { ComponentPropsWithoutRef, ReactElement } from 'react'
import { Icon } from 'Components/Icon'
import { ReactComponent as OpenEyeIcon } from 'Icons/open-eye.svg'
import { ReactComponent as HideEyeIcon } from 'Icons/hide-eye.svg'
import './ShowPasswordButton.scss'
import cn from 'classnames'

export interface ShowPasswordButtonProps
  extends ComponentPropsWithoutRef<'button'> {
  shown: boolean
  className?: string
}

const ShowPasswordButton = ({
  shown,
  className,
  ...restProps
}: ShowPasswordButtonProps): ReactElement => {
  const label = shown ? 'Скрыть текст пароля' : 'Показать текст пароль'

  return (
    <button
      className={cn('inf-show-password-button', className)}
      type="button"
      title={label}
      aria-label={label}
      {...restProps}
    >
      <Icon color="primary" size="medium">
        {shown ? <HideEyeIcon /> : <OpenEyeIcon />}
      </Icon>
    </button>
  )
}

export default ShowPasswordButton
