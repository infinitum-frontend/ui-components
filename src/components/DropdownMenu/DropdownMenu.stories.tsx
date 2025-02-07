// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { DropdownMenu } from './index'
import { Button } from 'Components/Button'
import { Box } from 'Components/Box'
import IconDots from 'Icons/dots-vertical.svg?react'

const meta: Meta<typeof DropdownMenu> = {
  title: 'Overlay/DropdownMenu',
  component: DropdownMenu
}

export default meta

const Template: StoryFn<typeof DropdownMenu> = (args) => {
  const items = [
    'Посмотреть документы',
    'Переместить в неактуальные',
    'Редактировать',
    'Создать копию связи',
    'Удалить'
  ]
  return (
    <Box style={{ width: '300px', display: 'flex', justifyContent: 'end' }}>
      <DropdownMenu>
        <DropdownMenu.Trigger>
          <Button icon={<IconDots />} variant="ghost" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {items.map((item, index) => (
            <DropdownMenu.Item
              disabled={index === 3}
              key={item}
              onSelect={() => alert(`selected ${item}`)}
            >
              {item}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu>
    </Box>
  )
}

export const Playground = Template.bind({})
