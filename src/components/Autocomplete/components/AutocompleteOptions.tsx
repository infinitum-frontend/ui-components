import { ComponentPropsWithoutRef, ReactElement } from 'react'
import { Menu, MenuProps } from 'Components/Menu'
import cn from 'classnames'

export type AutocompleteOptionsProps = MenuProps &
  ComponentPropsWithoutRef<'div'>

const AutocompleteOptions = ({
  children,
  className,
  ...props
}: AutocompleteOptionsProps): ReactElement => {
  return (
    <Menu
      as={'div'}
      className={cn('inf-autocomplete-options', className)}
      {...props}
    >
      {children}
    </Menu>
  )
}

export default AutocompleteOptions
