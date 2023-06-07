// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Link } from './index'
import { Meta, StoryFn } from '@storybook/react'

const ComponentMeta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  args: {
    children: 'Ссылка',
    as: 'a'
  }
}

export default ComponentMeta

const Template: StoryFn<typeof Link> = ({ ...args }) => <Link {...args} />

export const Playground = {
  render: Template
}
