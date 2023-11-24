import { ComponentPropsWithoutRef, ReactElement, MouseEvent } from 'react'
import { useAutocompleteContext } from 'Components/Autocomplete/context'
import { FloatingPortal } from '@floating-ui/react'
import cn from 'classnames'
import './AutocompleteDropdown.scss'

export interface AutocompleteDropdownProps
  extends ComponentPropsWithoutRef<'div'> {}

/** Компонент-обертка для выпадающего контента */
const AutocompleteDropdown = ({
  children,
  className,
  style,
  onClick,
  ...props
}: AutocompleteDropdownProps): ReactElement => {
  const context = useAutocompleteContext()

  return (
    <FloatingPortal>
      {context?.open && (
        <div
          className={cn('inf-autocomplete-dropdown', className)}
          ref={context?.dropdownRef}
          {...(context?.getFloatingProps
            ? context?.getFloatingProps({
                onClick(e) {
                  e.stopPropagation()
                  if (onClick) {
                    onClick(e as MouseEvent<HTMLDivElement>)
                  }
                }
              })
            : {})}
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
