// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import Menu from './Menu'
import MenuButton from './MenuButton'
import MenuList from './MenuList'
import MenuItem from './MenuItem'

const meta: Meta<typeof Menu> = {
  title: 'Menu',
  component: Menu
}

export default meta

export const Playground: StoryFn<typeof Menu> = (args) => {
  return (
    <Menu>
      <MenuButton>Клик</MenuButton>
      <MenuList>
        <MenuItem>One</MenuItem>
        <MenuItem>Two</MenuItem>
        <MenuItem>Three</MenuItem>
      </MenuList>
    </Menu>
  )
}
