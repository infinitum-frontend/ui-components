import { ComponentPropsWithoutRef, ReactElement } from 'react'
import { Menu, MenuProps } from 'Components/Menu'
import cn from 'classnames'
import { useAutocompleteContext } from 'Components/Autocomplete/context'
import './AutocompleteOptions.scss'

export type AutocompleteOptionsProps = MenuProps &
  ComponentPropsWithoutRef<'div'>

const AutocompleteOptions = ({
  children,
  className,
  ...props
}: AutocompleteOptionsProps): ReactElement => {
  const context = useAutocompleteContext()
  return (
    <Menu
      as={'div'}
      className={cn('inf-autocomplete-options', className)}
      maxHeight={context?.maxHeight}
      {...props}
    >
      {children}
    </Menu>
  )
}

export default AutocompleteOptions
