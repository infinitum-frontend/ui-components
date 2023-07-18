// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { Label, LabelProps } from './index'
import { Space } from '../Space'
import { ReactComponent as IconInfo } from 'Icons/info.svg'

const variants = ['info', 'danger', 'success', 'warning', 'neutral'] as Array<
  LabelProps['variant']
>

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label
}

export default meta

const Template: StoryFn<typeof Label> = (args) => <Label {...args} />

export const Playground = {
  render: Template,

  args: {
    children: 'Состояние контроля'
  }
}

export const Variants = {
  render: () => {
    return (
      <Space>
        {variants.map((variant, index) => (
          <Label variant={variant} key={index} before={<IconInfo />}>
            {variant}
          </Label>
        ))}
      </Space>
    )
  }
}
