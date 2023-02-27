import { ComponentPropsWithoutRef, ReactElement } from 'react'
import { useAutocompleteContext } from 'Components/Autocomplete/context'
import { FloatingPortal } from '@floating-ui/react'
import cn from 'classnames'
import '../style/dropdown.scss'

export interface AutocompleteDropdownProps
  extends ComponentPropsWithoutRef<'div'> {}

const AutocompleteDropdown = ({
  children,
  className,
  style,
  ...props
}: AutocompleteDropdownProps): ReactElement => {
  const context = useAutocompleteContext()

  return (
    <FloatingPortal>
      {context?.open && (
        <div
          className={cn('inf-autocomplete-dropdown', className)}
          ref={context?.dropdownRef}
          {...context?.getFloatingProps()}
          style={{
            ...style,
            position: 'absolute',
            top: context?.y ?? 0,
            left: context?.x ?? 0
          }}
          {...props}
        >
          {children}
        </div>
      )}
    </FloatingPortal>
  )
}

export default AutocompleteDropdown
