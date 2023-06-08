// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Text } from './index'
import { StoryObj, Meta, StoryFn } from '@storybook/react'

const ComponentMeta: Meta<typeof Text> = {
  title: 'Typography/Text',
  component: Text,
  args: {
    children: 'Съешь ещё этих мягких французских булок, да выпей чаю'
  }
}

export default ComponentMeta

const Template: StoryFn<typeof Text> = ({ ...args }) => <Text {...args} />

export const Playground = {
  render: Template
}

export const Variants: StoryObj<typeof Text> = {
  render: ({ ...args }) => {
    const variants = [
      'heading-1',
      'heading-2',
      'heading-3',
      'heading-4',
      'subtitle-1',
      'subtitle-2',
      'subtitle-3',
      'body-1',
      'body-2',
      'overline'
    ]
    return (
      <>
        {variants.map((variant) => (
          <Text key={variant} variant={variant}>
            {variant} - Съешь ещё этих мягких французских булок, да выпей чаю
          </Text>
        ))}
      </>
    )
  },

  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Story />
      </div>
    )
  ]
}

export const Colors: StoryObj<typeof Text> = {
  render: ({ ...args }) => {
    const variants = [
      'primary',
      'secondary',
      'tertiary',
      'success',
      'danger',
      'warning',
      'inverse'
    ]
    return (
      <>
        {variants.map((color) => (
          <Text
            key={color}
            color={color}
            style={{ backgroundColor: color === 'inverse' ? 'black' : 'none' }}
          >
            {color} - Съешь ещё этих мягких французских булок, да выпей чаю
          </Text>
        ))}
      </>
    )
  },

  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Story />
      </div>
    )
  ]
}

export const Alignment: StoryObj<typeof Text> = {
  render: ({ ...args }) => {
    const alignments = ['left', 'center', 'right', 'justify']
    return (
      <>
        {alignments.map((alignment) => (
          <Text key={alignment} align={alignment}>
            <Text variant="heading-4">{alignment}</Text>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi
            doloribus, excepturi cupiditate quos porro recusandae sed iure ut
            nam nulla modi beatae nobis distinctio, tenetur, pariatur eos
            adipisci odit vitae veniam delectus quidem reiciendis voluptates
            exercitationem voluptatum. Obcaecati itaque libero in ipsum alias
            dolores praesentium soluta eum vitae tenetur impedit voluptatem
            earum doloremque, fugit eos quia cum quo necessitatibus voluptatibus
            et asperiores? Maiores, nisi! Magnam, dolores vitae? Unde deleniti
            autem consequatur dolore voluptatum quisquam, magni quia vel
            reiciendis pariatur quod aliquam iusto tenetur incidunt fugit
            exercitationem quos sed eius itaque laboriosam? Dolor nihil itaque
            iusto eum ad sapiente eligendi eos.
          </Text>
        ))}
      </>
    )
  },

  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Story />
      </div>
    )
  ]
}

export const Truncated = {
  render: () => (
    <div style={{ maxWidth: '700px' }}>
      <Text truncated>
        Съешь ещё этих мягких французских булок, да выпей чаю Съешь ещё этих
        мягких французских булок, да выпей чаю Съешь ещё этих мягких французских
        булок, да выпей чаю Съешь ещё этих мягких французских булок, да выпей
        чаю
      </Text>
    </div>
  )
}
