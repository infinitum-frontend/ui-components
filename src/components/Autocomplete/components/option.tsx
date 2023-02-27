import { ComponentPropsWithoutRef, ReactElement } from 'react'
import { useAutocompleteContext } from 'Components/Autocomplete/context'
import MenuItem, { MenuItemProps } from 'Components/Menu/components/MenuItem'
import { IAutocompleteOption } from 'Components/Autocomplete/typings'

export type AutocompleteOptionProps = ComponentPropsWithoutRef<'button'> &
  MenuItemProps & {
    value?: IAutocompleteOption['value']
    onClick?: () => void
  }

const AutocompleteOption = ({
  onClick,
  value = '',
  children,
  className,
  ...props
}: AutocompleteOptionProps): ReactElement => {
  const context = useAutocompleteContext()

  const handleClick = (): void => {
    if (onClick) {
      onClick()
      return
    }

    context?.handleOptionClick?.(value)
  }

  // const handleMouseOver = (): void => {
  //   context?.setActiveItem?.(value)
  // }

  return (
    <MenuItem
      as={'button'}
      onClick={handleClick}
      // onMouseOver={handleMouseOver}
      // className={cn('inf-autocomplete-option', {
      //   'inf-autocomplete-option--active': active
      // })}
      {...props}
    >
      {children}
    </MenuItem>
  )
}

export default AutocompleteOption
