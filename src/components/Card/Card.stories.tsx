// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Card } from './index'
import { Button } from 'Components/Button'
import { Text } from 'Components/Text'
import { Space } from 'Components/Space'
import { Meta, StoryFn } from '@storybook/react'

const ComponentMeta: Meta<typeof Card> = {
  title: 'Layout/Card',
  component: Card
}

export default ComponentMeta

const Template: StoryFn<typeof Card> = ({ ...args }) => (
  <Card {...args}>
    <Space>
      <Text variant="subtitle-1">Заголовок</Text>
      <Text variant="body-1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
        nihil.
      </Text>
      <Button>Кнопка</Button>
    </Space>
  </Card>
)

export const Playground = {
  render: Template
}

export const Large = {
  render: Template,
  args: {
    size: 'large'
  }
}

export const Shadow = {
  render: Template,
  args: {
    variant: 'shadow'
  }
}

export const OutlineDanger = {
  render: Template,
  args: {
    outlineVariant: 'danger',
    variant: 'shadown'
  }
}
