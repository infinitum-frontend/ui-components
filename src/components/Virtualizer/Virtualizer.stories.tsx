// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StoryObj, Meta } from '@storybook/react'
import { Text, TextProps } from '../Text'
import Virtualizer from './Virtualizer'

const ComponentMeta: Meta<typeof Virtualizer> = {
  title: 'components/Virtualizer',
  component: Virtualizer,
  parameters: {
    layout: 'fullscreen'
  }
}

export default ComponentMeta

const elements = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  name: `Element ${i}`,
  color: i % 2 === 0 ? 'success' : 'violet'
}))

export const Playground: StoryObj<typeof Virtualizer> = {
  render: ({ ...args }) => {
    return (
      <Virtualizer
        count={elements.length}
        estimateSize={() => 30}
        overscan={5}
        maxHeight="200px"
        renderRow={(virtualItem) => {
          const { index } = virtualItem
          return (
            <Text color={elements[index].color as TextProps['color']}>
              {elements[index].name}
            </Text>
          )
        }}
      />
    )
  }
}
