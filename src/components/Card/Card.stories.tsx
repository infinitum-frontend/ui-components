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

export const Sizes: StoryObj<typeof Card> = {
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

export const HoverableLink: StoryObj<typeof Card> = {
  render: (args) => (
    <Card
      {...args}
      style={{ maxWidth: '400px' }}
      as="a"
      href="https://specdep.ru"
      target="blank"
      hoverable
    >
      Card - ссылка
      <br />
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio iste
      assumenda, ullam cum iusto harum rem porro beatae earum ab.
    </Card>
  )
}

export const Disabled = {
  render: Template,
  args: {
    disabled: true,
    hoverable: true
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
