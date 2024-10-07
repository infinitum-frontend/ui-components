// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, ReactElement, ReactNode } from 'react'
import cn from 'classnames'
import { Popover } from '../Popover'
import { Box } from '../Box'
import { Space } from '../Space'
import { Text } from '../Text'
import { Button } from '../Button'
import getNameInitials from './helpers/getNameInitials'
import './UserMenu.scss'
import { Divider } from '../Divider'

interface RenderChildrenProps {
  close: () => void
}

export interface UserMenuProps {
  fullName: string
  role?: string
  className?: string
  children?: ReactNode | ((props: RenderChildrenProps) => ReactNode)
}

/** Меню пользователя для отображения в хедере страницы */
const UserMenu = ({
  fullName,
  role,
  className,
  children,
  ...props
}: UserMenuProps): ReactElement => {
  const [isOpen, setOpen] = useState(false)

  const close = (): void => {
    setOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setOpen} placement="bottom-end">
      <Popover.Trigger>
        <Button
          className={cn('inf-user-menu__button', className, {
            'inf-user-menu__button--active': isOpen
          })}
          {...props}
          onClick={() => setOpen(!isOpen)}
        >
          {getNameInitials(fullName)}
        </Button>
      </Popover.Trigger>

      <Popover.Content hasPadding={false} width="220px">
        <Box padding="medium">
          <Space gap="xxsmall">
            <Text
              className="inf-user-menu__full-name"
              variant="heading-4"
              alignment="center"
            >
              {fullName}
            </Text>
            {role && (
              <Text
                className="inf-user-menu__role"
                variant="body-1"
                color="secondary"
                alignment="center"
              >
                {role}
              </Text>
            )}
          </Space>
        </Box>

        {children && (
          <>
            <Divider />
            {typeof children === 'function' ? children({ close }) : children}
          </>
        )}
      </Popover.Content>
    </Popover>
  )
}

UserMenu.displayName = 'UserMenu'

export default UserMenu
