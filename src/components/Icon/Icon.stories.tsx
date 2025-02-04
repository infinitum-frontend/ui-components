// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Icon } from './index'
import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { ReactComponent as IconUser } from 'Icons/user.svg'
import { Space } from '../Space'
import { Tooltip } from '../Tooltip'

const ComponentMeta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon
}

const decorator = (Story): React.ReactElement => (
  <Space direction="horizontal">{Story()}</Space>
)

export default ComponentMeta

const Template: StoryFn<typeof Icon> = ({ ...args }) => <Icon {...args} />

export const Playground = {
  render: Template,
  args: {
    children: <IconUser />
  }
}

export const Sizes: StoryObj<typeof Icon> = {
  render: () => {
    return (
      <>
        <Icon size="small">
          <IconUser />
        </Icon>
        <Icon size="medium">
          <IconUser />
        </Icon>
        <Icon size="large">
          <IconUser />
        </Icon>
      </>
    )
  },
  decorators: [decorator]
}

export const CustomSize: StoryObj<typeof Icon> = {
  render: (args) => {
    return (
      <Icon {...args}>
        <IconUser width="80px" height="80px" />
      </Icon>
    )
  }
}

export const Colors: StoryObj<typeof Icon> = {
  render: () => {
    return (
      <>
        <Icon color="primary">
          <IconUser />
        </Icon>
        <Icon color="secondary">
          <IconUser />
        </Icon>
        <Icon color="primary-hover">
          <IconUser />
        </Icon>
        <Icon color="primary-disabled">
          <IconUser />
        </Icon>
        <div style={{ background: 'black', display: 'flex' }}>
          <Icon color="inverse">
            <IconUser />
          </Icon>
        </div>
        <div style={{ background: 'red', display: 'flex' }}>
          <Icon color="on-color">
            <IconUser />
          </Icon>
        </div>
        <Icon color="brand">
          <IconUser />
        </Icon>
        <Icon color="brand-secondary">
          <IconUser />
        </Icon>
        <Icon color="error">
          <IconUser />
        </Icon>
        <Icon color="warning">
          <IconUser />
        </Icon>
        <Icon color="success">
          <IconUser />
        </Icon>
        <Icon color="info">
          <IconUser />
        </Icon>
        <Icon color="info-disabled">
          <IconUser />
        </Icon>
        <Icon color="violet">
          <IconUser />
        </Icon>
        <Icon color="teal">
          <IconUser />
        </Icon>
      </>
    )
  },
  decorators: [decorator]
}

export const WithTooltip: StoryObj<typeof Icon> = {
  render: (args) => {
    return (
      <Tooltip content="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, id.">
        <Icon {...args}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.8332 5.16699H6.83323V0.166992H5.16657V5.16699H0.166565V6.83366H5.16657V11.8337H6.83323V6.83366H11.8332V5.16699Z"
              fill="currentColor"
            />
          </svg>
        </Icon>
      </Tooltip>
    )
  }
}

export const PrimaryHoverable: StoryObj<typeof Icon> = {
  render: (args) => {
    return (
      <Icon {...args}>
        <IconUser width="80px" height="80px" />
      </Icon>
    )
  },
  args: {
    color: 'primary',
    hoverable: true
  }
}
