import { ComponentPropsWithoutRef, ReactElement } from 'react'
import { Menu } from '~/src/components/Menu'
import { ReactComponent as IconTick } from 'Icons/tick.svg'
import { Icon } from '~/src/components/Icon'
import { Checkbox } from '~/src/components/Checkbox'

interface SelectOptionProps extends ComponentPropsWithoutRef<'li'> {
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
  return (
    <Menu.Item
      as="li"
      highlighted={active}
      onClick={() => onSelect()}
      {...props}
    >
      {selectionIndicator === 'checkbox' && (
        <Menu.Item.Icon>
          <Checkbox checked={selected} onChange={() => onSelect()} />
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
