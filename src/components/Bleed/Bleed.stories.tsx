// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Meta, StoryFn } from '@storybook/react'
import { Button } from '../Button'
import { Card } from '../Card'
import { Text } from '../Text'
import { Bleed } from './index'

const ComponentMeta: Meta<typeof Bleed> = {
  title: 'Layout/Bleed',
  component: Bleed,
  parameters: {
    docs: {
      source: {
        excludeDecorators: true
      }
    }
  },
  args: {
    as: 'div',
    offsetX: 'large'
  }
}

export default ComponentMeta

const Template: StoryFn<typeof Bleed> = ({ ...args }) => (
  <Card>
    <Text>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, dolor.
    </Text>
    <Bleed {...args}>
      <div style={{ background: '#fbaaaa', height: '200px' }}>
        Bleed Content
      </div>
    </Bleed>
    <Button>Кнопка</Button>
  </Card>
)

export const Playground = {
  render: Template
}
