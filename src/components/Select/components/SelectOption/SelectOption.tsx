import React, { ComponentPropsWithoutRef } from 'react'
import { Checkbox } from '~/src/components/Checkbox'
import { Menu } from '~/src/components/Menu'
import { Icon } from '~/src/components/Icon'
import IconTick from 'Icons/tick.svg?react'
import './SelectOption.scss'

export interface SelectOptionProps extends ComponentPropsWithoutRef<'li'> {
  selected: boolean
  disabled?: boolean
  active?: boolean
  onSelect: () => void
  selectionIndicator: 'checkbox' | 'tick'
}

const SelectOption = React.forwardRef<HTMLDivElement, SelectOptionProps>(
  (
    {
      selected,
      disabled,
      active,
      onSelect,
      selectionIndicator = 'tick',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Menu.Item
        ref={ref}
        as="li"
        active={active}
        data-selected={selected}
        onClick={onSelect}
        {...props}
      >
        {selectionIndicator === 'checkbox' && (
          <Menu.Item.Icon>
            <Checkbox
              checked={selected}
              onClick={(e) => {
                e.preventDefault()
              }}
            />
          </Menu.Item.Icon>
        )}

        <Menu.Item.Content>{children}</Menu.Item.Content>

        {selected && selectionIndicator === 'tick' && (
          <Menu.Item.Button>
            <Icon data-testid="check-icon" color="secondary">
              <IconTick />
            </Icon>
          </Menu.Item.Button>
        )}
      </Menu.Item>
    )
  }
)

SelectOption.displayName = 'SelectOption'

export default SelectOption
