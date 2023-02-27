import { ComponentPropsWithoutRef, ReactElement } from 'react'
import Menu, { MenuProps } from 'Components/Menu/components/Menu'

export type AutocompleteOptionsProps = MenuProps &
  ComponentPropsWithoutRef<'div'>

const AutocompleteOptions = ({
  children,
  className,
  ...props
}: AutocompleteOptionsProps): ReactElement => {
  return (
    <Menu as={'div'} className={'inf-autocomplete-options'} {...props}>
      {children}
    </Menu>
  )
}

export default AutocompleteOptions
