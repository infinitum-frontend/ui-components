// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { DropdownMenu } from './index'

const meta: Meta<typeof DropdownMenu> = {
  title: 'Overlay/DropdownMenu',
  component: DropdownMenu
}

export default meta

export const Playground: StoryFn<typeof DropdownMenu> = (args) => {
  return (
    <DropdownMenu label="Edit">
      <DropdownMenu.Item label="Undo" onClick={() => alert('Undo')} />
      <DropdownMenu.Item label="Redo" disabled />
      <DropdownMenu.Item label="Cut" />
      <DropdownMenu label="Copy as">
        <DropdownMenu.Item label="Text" />
        <DropdownMenu.Item label="Video" />
        <DropdownMenu label="Image">
          <DropdownMenu.Item label=".png" />
          <DropdownMenu.Item label=".jpg" />
          <DropdownMenu.Item label=".svg" />
          <DropdownMenu.Item label=".gif" />
        </DropdownMenu>
        <DropdownMenu.Item label="Audio" />
      </DropdownMenu>
      <DropdownMenu label="Share">
        <DropdownMenu.Item label="Mail" />
        <DropdownMenu.Item label="Instagram" />
      </DropdownMenu>
    </DropdownMenu>
  )
}
