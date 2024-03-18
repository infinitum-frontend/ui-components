// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Card } from './index'
import { Button } from 'Components/Button'
import { Text } from 'Components/Text'
import { Space } from 'Components/Space'
import { Meta, StoryFn, StoryObj } from '@storybook/react'

const ComponentMeta: Meta<typeof Card> = {
  title: 'Layout/Card',
  component: Card
}

export default ComponentMeta

const Template: StoryFn<typeof Card> = ({ ...args }) => (
  <Card style={{ maxWidth: '400px' }} {...args}>
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

export const Sizes: StoryObj<typeof Button> = {
  render: (args) => (
    <>
      <Card {...args} size="small">
        small - Lorem ipsum dolor sit amet consectetur adipisicing elit. In,
        consectetur!
      </Card>
      <Card {...args} size="medium">
        medium - Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
        eum?
      </Card>
      <Card {...args} size="large">
        large - Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Explicabo, illo.
      </Card>
    </>
  ),

  decorators: [
    (Story) => <Space style={{ maxWidth: '400px' }}>{Story()}</Space>
  ]
}

export const Hoverable = {
  render: Template,
  args: {
    hoverable: true,
    as: 'button'
  }
}

export const Disabled = {
  render: Template,
  args: {
    disabled: true
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
    variant: 'shadow'
  }
}
