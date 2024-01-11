import React, { ComponentPropsWithoutRef } from 'react'
import './Divider.scss'
import cn from 'classnames'
import { Text } from 'Components/Text'

export interface DividerProps extends ComponentPropsWithoutRef<'hr'> {
  className?: string
  orientation?: 'horizontal' | 'vertical'
}

/** Компонент для визуального разделения контента */
const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ className, children, orientation = 'horizontal', ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={cn(
          'inf-divider',
          className,
          [`inf-divider--orientation-${orientation}`],
          {
            'inf-divider--has-content': Boolean(children)
          }
        )}
        {...props}
      >
        {children && (
          <Text variant="body-1" color="secondary">
            {children}
          </Text>
        )}
      </div>
    )
  }
)

Divider.displayName = 'Divider'

export default Divider
