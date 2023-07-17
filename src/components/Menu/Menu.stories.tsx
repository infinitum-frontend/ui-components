// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactNode, useState } from 'react'
import { StoryObj, StoryFn, Meta } from '@storybook/react'
import { Menu } from './index'
import { Checkbox } from '../Checkbox'
// @ts-expect-error
import { ReactComponent as PortfolioIcon } from 'Icons/portfolio.svg'
// @ts-expect-error
import { ReactComponent as ClearIcon } from 'Icons/cross.svg'
import { Space } from '../Space'
import { Text } from '../Text'
import { Popover } from '../Popover'
import { Button } from '../Button'
import { ReactComponent as ArrowDownIcon } from 'Icons/chevron-down.svg'
import {
  BaseMenuLong,
  MenuBase,
  MenuWithNestedSelection,
  MenuWithStatuses
} from './fixtures'
import { TextProps } from '../Text/Text'

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  subcomponents: {
    'Menu.Item': Menu.Item,
    'Menu.Item.Icon': Menu.Item.Icon,
    'Menu.Item.Content': Menu.Item.Content,
    'Menu.Item.Button': Menu.Item.Button
  }
}

export default meta

const Template: StoryFn<typeof Menu> = (args) => {
  return (
    <Menu {...args}>
      {MenuBase.map((item, index) => (
        <Menu.Item key={index}>{item.text}</Menu.Item>
      ))}
    </Menu>
  )
}

export const Playground = {
  render: Template
}

export const WithActionButton: StoryObj<typeof Menu> = {
  render: (args) => {
    return (
      <Menu style={{ width: '350px' }}>
        {MenuBase.map((item) => (
          <Menu.Item key={item.text}>
            <Menu.Item.Content>
              <Text size={'small'}>{item.text}</Text>
            </Menu.Item.Content>
            <Menu.Item.Button>
              <ClearIcon style={{ color: '#F53A3A' }} />
            </Menu.Item.Button>
          </Menu.Item>
        ))}
      </Menu>
    )
  }
}

export const WithIcon: StoryObj<typeof Menu> = {
  render: (args) => {
    const getTextToneByStatus = (status: string): TextProps['tone'] => {
      switch (status) {
        case 'error':
          return 'danger'
        case 'success':
          return 'success'
        default:
          return 'quaternary'
      }
    }
    return (
      <Menu>
        {MenuWithStatuses.map((item) => (
          <Menu.Item disabled={Boolean(item.disabled)} key={item.statusText}>
            <Menu.Item.Icon>
              <PortfolioIcon />
            </Menu.Item.Icon>
            <Menu.Item.Content>
              <Space gap={'xxsmall'}>
                <Text size={'small'}>{item.name}</Text>
                <Space gap={'xxsmall'} direction={'horizontal'}>
                  <Text tone={getTextToneByStatus(item.status)}>
                    {item.statusText}
                  </Text>
                  {item.additionalInfo && (
                    <Text tone={'secondary'}>{item.additionalInfo}</Text>
                  )}
                </Space>
              </Space>
            </Menu.Item.Content>
          </Menu.Item>
        ))}
      </Menu>
    )
  }
}

export const Nested: StoryObj<typeof Menu> = {
  render: (args) => {
    const getCollapsedContent = (
      item: (typeof MenuWithNestedSelection)[0]
    ): ReactNode => {
      return (
        Boolean(item.subitems) && (
          <Menu nested={true}>
            {item.subitems?.map((subitem) => (
              <Menu.Item key={subitem.text}>
                <Menu.Item.Content>{subitem.text}</Menu.Item.Content>
                <Menu.Item.Button>
                  <Checkbox checked={subitem.selected} />
                </Menu.Item.Button>
              </Menu.Item>
            ))}
          </Menu>
        )
      )
    }
    return (
      <Menu style={{ width: '450px' }}>
        {MenuWithNestedSelection.map((item, key) => (
          <Menu.Item
            key={key}
            collapsible={true}
            collapsedContent={getCollapsedContent(item)}
          >
            <Menu.Item.Content>{item.text}</Menu.Item.Content>
            <Menu.Item.Button>
              <Checkbox
                checked={item.selected}
                indeterminate={Boolean(
                  item.subitems?.find((item) => item.selected)
                )}
              />
            </Menu.Item.Button>
          </Menu.Item>
        ))}
      </Menu>
    )
  }
}

export const Scrollable: StoryObj<typeof Menu> = {
  render: (args) => {
    return (
      <Menu maxHeight={150}>
        {BaseMenuLong.map((item) => (
          <Menu.Item key={item.text}>{item.text}</Menu.Item>
        ))}
      </Menu>
    )
  }
}

export const InPopover: StoryObj<typeof Menu> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true)

    function onExitClick(): void {
      alert('Выйти')
    }

    return (
      <Popover
        open={isOpen}
        onOpenChange={setIsOpen}
        placement="bottom-end"
        offset={{ mainAxis: 5, crossAxis: -15 }}
      >
        <Popover.Trigger onClick={() => setIsOpen((v) => !v)}>
          <Button variant="ghost" after={<ArrowDownIcon />}>
            Константин Константинопольский
          </Button>
        </Popover.Trigger>
        <Popover.Content hasPadding={false} style={{ width: '150px' }}>
          <Menu>
            <Menu.Item as="a" target="_blank" href="https://specdep.ru/">
              Настройки
            </Menu.Item>
            <Menu.Item as="button" onClick={onExitClick}>
              Выйти
            </Menu.Item>
          </Menu>
        </Popover.Content>
      </Popover>
    )
  }
}
