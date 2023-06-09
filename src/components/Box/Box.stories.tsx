// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Box } from './index'
import { Button } from 'Components/Button'
import { StoryObj, Meta, StoryFn } from '@storybook/react'

const ComponentMeta: Meta<typeof Box> = {
  title: 'Layout/Box',
  component: Box,
  args: {
    as: 'div',
    children: 'Съешь ещё этих мягких французских булок, да выпей чаю'
  }
}

export default ComponentMeta

const Template: StoryFn<typeof Box> = ({ ...args }) => <Box {...args} />

export const Playground = {
  render: Template
}

export const ModalCard: StoryObj<typeof Box> = {
  render: () => {
    return (
      <Box
        background="default"
        borderWidth="default"
        borderColor="default"
        borderRadius="medium"
        overflow="hidden"
        style={{ maxWidth: '600px' }}
      >
        <Box paddingX="xlarge" paddingY="large">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          reprehenderit sint ratione, magnam ab assumenda earum culpa, alias ex
          odio quam beatae velit cum modi a, incidunt numquam. Pariatur qui
          maiores dolore atque temporibus explicabo debitis. Laborum vero sunt
          eligendi enim laudantium in! Aspernatur suscipit fugit similique, ab
          quasi excepturi perferendis earum, consequatur, delectus optio
          cupiditate? Quae velit sed esse corporis perspiciatis doloremque
          temporibus tenetur! Eveniet similique neque doloribus, dolorem
          accusamus aperiam impedit facere asperiores laboriosam, obcaecati
          maxime quibusdam sint error consequuntur officiis placeat sapiente
          totam quia vero. Necessitatibus itaque quasi, inventore ad voluptates
          deleniti iste ex minus doloremque facere.
        </Box>

        <div style={{ overflow: 'hidden' }} />
        <Box background="secondary" paddingX="xlarge" paddingY="medium">
          <Button variant="secondary">Запустить контроль</Button>
        </Box>
      </Box>
    )
  }
}

export const PopoverInverse: StoryObj<typeof Box> = {
  render: () => {
    return (
      <Box
        background="inverse"
        color="inverse"
        borderWidth="default"
        borderColor="default"
        borderRadius="medium"
        padding="medium"
        boxShadow="medium"
        style={{ maxWidth: '300px' }}
      >
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto,
        tempora?
      </Box>
    )
  },

  decorators: [
    (Story) => <div style={{ display: 'flex', gap: '24px' }}>{Story()}</div>
  ]
}
