// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { Alert, AlertProps } from './index'
import { Space } from '../Space'

const variants = [
  'info',
  'error',
  'success',
  'warning',
  'neutral',
  'violet',
  'teal'
] as Array<AlertProps['variant']>

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert
}

export default meta

const Template: StoryFn<typeof Alert> = (args) => <Alert {...args} />

export const Playground = {
  render: Template,

  args: {
    children: 'Alert'
  }
}

export const Variants = {
  render: () => {
    return (
      <Space>
        {variants.map((variant, index) => (
          <Alert variant={variant} key={index}>
            Alert {variant}
          </Alert>
        ))}
      </Space>
    )
  }
}
