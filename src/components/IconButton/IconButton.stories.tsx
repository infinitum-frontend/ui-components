// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IconSetting02 } from '@infinitum-ui/icons'
import { IconButton } from './index'
import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { Space } from '../Space'

const ComponentMeta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  args: {
    children: <IconSetting02 />
  }
}

export default ComponentMeta

const Template: StoryFn<typeof IconButton> = (args) => <IconButton {...args} />

export const Playground = {
  render: Template
}

export const Colors: StoryObj<typeof IconButton> = {
  render: (args) => (
    <Space direction="vertical" gap="small">
      <Space direction="horizontal">
        <IconButton {...args} color="primary" />
        <span>Primary</span>
      </Space>
      <Space direction="horizontal">
        <IconButton {...args} color="info" />
        <span>Info</span>
      </Space>
      <Space direction="horizontal">
        <IconButton {...args} color="brand" />
        <span>Brand</span>
      </Space>
      <Space direction="horizontal">
        <IconButton {...args} color="error" />
        <span>Error</span>
      </Space>
      <Space direction="horizontal">
        <IconButton {...args} color="warning" />
        <span>Warning</span>
      </Space>
      <Space direction="horizontal">
        <IconButton {...args} color="success" />
        <span>Success</span>
      </Space>
      <Space direction="horizontal">
        <IconButton {...args} color="violet" />
        <span>Violet</span>
      </Space>
    </Space>
  )
}

export const Disabled = {
  render: Template,
  args: {
    disabled: true
  }
}

export const Sizes: StoryObj<typeof IconButton> = {
  render: (args) => (
    <Space direction="horizontal" gap="small">
      <Space direction="vertical" justify="space-between" align="center">
        <IconButton {...args} size="small" />
        <span>Small</span>
      </Space>
      <Space direction="vertical" justify="space-between" align="center">
        <IconButton {...args} size="medium" />
        <span>Medium</span>
      </Space>
      <Space direction="vertical" justify="space-between" align="center">
        <IconButton {...args} size="large" />
        <span>Large</span>
      </Space>
    </Space>
  )
}

export const Contained = {
  render: Template,
  args: {
    contained: true,
    size: 'large'
  }
}

export const ContainedDisabled = {
  render: Template,
  args: {
    contained: true,
    disabled: true,
    size: 'large'
  }
}

export const SizesContained: StoryObj<typeof IconButton> = {
  render: (args) => (
    <Space direction="horizontal" gap="small">
      <Space direction="vertical" justify="space-between" align="center">
        <IconButton {...args} size="small" contained />
        <span>Small</span>
      </Space>
      <Space direction="vertical" justify="space-between" align="center">
        <IconButton {...args} size="medium" contained />
        <span>Medium</span>
      </Space>
      <Space direction="vertical" justify="space-between" align="center">
        <IconButton {...args} size="large" contained />
        <span>Large</span>
      </Space>
    </Space>
  )
}
