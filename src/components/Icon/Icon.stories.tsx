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
    icon: <IconUser />
  }
}

export const Sizes: StoryObj<typeof Icon> = {
  render: () => {
    return (
      <>
        <Icon icon={<IconUser />} size="small" />
        <Icon icon={<IconUser />} size="medium" />
        <Icon icon={<IconUser />} size="large" />
        <Icon icon={<IconUser />} size="80px" />
      </>
    )
  },
  decorators: [decorator]
}

export const Colors: StoryObj<typeof Icon> = {
  render: () => {
    return (
      <>
        <Icon icon={<IconUser />} color="primary" />
        <Icon icon={<IconUser />} color="secondary" />
        <Icon icon={<IconUser />} color="error" />
        <Icon icon={<IconUser />} color="warning" />
        <Icon icon={<IconUser />} color="success" />
        <Icon icon={<IconUser />} color="info" />
        <div style={{ background: 'black', display: 'flex' }}>
          <Icon icon={<IconUser />} color="inverse" />
        </div>
      </>
    )
  },
  decorators: [decorator]
}
