import IconTick from 'Icons/tick.svg?react'
import { ComponentPropsWithoutRef, ReactElement } from 'react'
import { Checkbox } from '~/src/components/Checkbox'
import { Icon } from '~/src/components/Icon'
import { Menu } from '~/src/components/Menu'

interface SelectOptionProps extends ComponentPropsWithoutRef<'div'> {
  selected: boolean
  disabled?: boolean
  active?: boolean
  onSelect: () => void
  selectionIndicator: 'checkbox' | 'tick'
}

const SelectOption = ({
  selected,
  disabled,
  active,
  onSelect,
  selectionIndicator = 'tick',
  children,
  ...props
}: SelectOptionProps): ReactElement => {
  const isCheckbox = selectionIndicator === 'checkbox'
  return (
    <Menu.Item
      as={isCheckbox ? 'label' : 'div'}
      highlighted={active}
      onClick={() => {
        // если checkbox, то слушаем onChange, а не click
        if (!isCheckbox) {
          onSelect()
        }
      }}
      {...props}
    >
      {selectionIndicator === 'checkbox' && (
        <Menu.Item.Icon>
          <Checkbox
            checked={selected}
            onChange={() => {
              // если checkbox, то слушаем onChange, а не click
              if (isCheckbox) {
                onSelect()
              }
            }}
          />
        </Menu.Item.Icon>
      )}

      <Menu.Item.Content>{children}</Menu.Item.Content>

      {selected && selectionIndicator === 'tick' && (
        <Menu.Item.Button>
          <Icon color="secondary">
            <IconTick />
          </Icon>
        </Menu.Item.Button>
      )}
    </Menu.Item>
  )
}

export default SelectOption
