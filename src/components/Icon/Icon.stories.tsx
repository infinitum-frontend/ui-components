// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Icon } from './index'
import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { ReactComponent as IconUser } from 'Icons/user.svg'
import { Space } from '../Space'

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
      <>
        <Icon {...args}>
          <IconUser width="80px" height="80px" />
        </Icon>
      </>
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
        <Icon color="error">
          <IconUser />
        </Icon>
        <Icon color="warning">
          <IconUser />
        </Icon>
        <Icon color="success">
          <IconUser />
        </Icon>
        <div style={{ background: 'black', display: 'flex' }}>
          <Icon color="inverse">
            <IconUser />
          </Icon>
        </div>
      </>
    )
  },
  decorators: [decorator]
}
