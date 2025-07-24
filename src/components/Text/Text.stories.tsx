// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Text, TextProps } from './index'
import { StoryObj, Meta, StoryFn } from '@storybook/react'
import { Space } from '../Space'

const ComponentMeta: Meta<typeof Text> = {
  title: 'Typography/Text',
  component: Text,
  args: {
    children: 'Съешь ещё этих мягких французских булок, да выпей чаю',
    as: 'div'
  }
}

export default ComponentMeta

const Template: StoryFn<typeof Text> = ({ ...args }) => <Text {...args} />

export const Playground = {
  render: Template
}

export const Variants: StoryObj<typeof Text> = {
  render: ({ ...args }) => {
    const variants: Array<TextProps['variant']> = [
      'heading-1',
      'heading-2',
      'heading-3',
      'heading-4',
      'subtitle-1',
      'subtitle-2',
      'subtitle-3',
      'body-1',
      'body-2',
      'body-3',
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
    const variants: Array<TextProps['color']> = [
      'primary',
      'secondary',
      'tertiary',
      'success',
      'error',
      'warning',
      'inverse',
      'violet',
      'info'
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
    const alignments: Array<TextProps['alignment']> = [
      'left',
      'center',
      'right',
      'justify'
    ]
    return (
      <>
        {alignments.map((alignment) => (
          <Text key={alignment} alignment={alignment}>
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

export const Nowrap = {
  render: () => (
    <div style={{ maxWidth: '700px' }}>
      <Text>
        Обычный текст с переносом строки: Съешь ещё этих мягких французских
        булок, да выпей чаю Съешь ещё этих мягких французских булок, да выпей
        чаю
      </Text>
      <br />
      <Text nowrap>
        Текст без переноса строки (nowrap): Съешь ещё этих мягких французских
        булок, да выпей чаю Съешь ещё этих мягких французских булок, да выпей
        чаю
      </Text>
    </div>
  )
}

export const Inherit = {
  render: () => (
    <Space>
      <div
        style={{
          font: "20px 'Times New Roman', serif"
        }}
      >
        <Text variant="inherit">
          Этот текст обёрнут в div с кастомным стилем font &quot;20px Times New
          Roman, serif&quot;, которые наследуются по параметру font.
        </Text>
      </div>
      <div
        style={{
          fontSize: '25px'
        }}
      >
        <Text variant="inherit">
          Этот текст обёрнут в div с кастомным стилем fontSize 25px, который
          наследуется по параметру font.
        </Text>
      </div>
      <div
        style={{
          fontFamily: "'Times New Roman', serif"
        }}
      >
        <Text variant="inherit">
          Этот текст обёрнут в div с кастомным стилем fontFamily &quot;20px
          Times New Roman, serif&quot;, который наследуется по параметру font.
        </Text>
      </div>
      <div
        style={{
          color: 'blue'
        }}
      >
        <Text color="inherit">
          Этот текст обёрнут в div с кастомным стилем color blue, который
          наследуется по параметру color.
        </Text>
      </div>
    </Space>
  )
}
