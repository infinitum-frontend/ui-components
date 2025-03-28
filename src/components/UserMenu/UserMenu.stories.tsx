// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, ReactElement, useRef } from 'react'
import { StoryObj, Meta } from '@storybook/react'
import { UserMenu } from './index'
import { PageLayout } from '../PageLayout'
import { Space } from '../Space'
import { Logo } from '../Logo'
import { Menu } from '../Menu'
// @ts-expect-error
import IconProfile from 'Icons/user.svg?react'
// @ts-expect-error
import IconQuit from 'Icons/sign-out.svg?react'

const ComponentMeta: Meta<typeof UserMenu> = {
  title: 'complex/UserMenu',
  component: UserMenu,
  parameters: {
    docs: {
      source: {
        excludeDecorators: true
      }
    },
    layout: 'fullscreen'
  }
}

const decorator = (Story): ReactElement => (
  <PageLayout>
    <PageLayout.Header>
      <Space direction="horizontal" align="center" justify="space-between">
        <Logo />
        {Story()}
      </Space>
    </PageLayout.Header>
  </PageLayout>
)

export default ComponentMeta

export const Playground: StoryObj<typeof UserMenu> = {
  render: ({ ...args }) => {
    return <UserMenu {...args} />
  },
  decorators: [decorator],
  args: {
    fullName: 'Яндиев Руслан Асхабович',
    role: 'Разработчик интерфейсов'
  }
}

export const WithNameOnly: StoryObj<typeof UserMenu> = {
  render: ({ ...args }) => {
    return <UserMenu {...args} />
  },
  decorators: [decorator],
  args: {
    fullName: 'Яндиев Руслан Асхабович'
  }
}

export const WithLongName: StoryObj<typeof UserMenu> = {
  render: ({ ...args }) => {
    return <UserMenu {...args} />
  },
  decorators: [decorator],
  args: {
    fullName: 'Константинапооооольский Константин Константинович'
  }
}

export const WithMenu: StoryObj<typeof UserMenu> = {
  render: ({ ...args }) => {
    return (
      <UserMenu {...args}>
        {({ close }) => (
          <Menu>
            <Menu.Item as="a" href="https://ya.ru">
              <Menu.Item.Icon>
                <IconProfile />
              </Menu.Item.Icon>
              Профиль
            </Menu.Item>

            <Menu.Item
              as="button"
              onClick={() => {
                close()
              }}
            >
              <Menu.Item.Icon>
                <IconQuit />
              </Menu.Item.Icon>
              Выйти из аккаунта
            </Menu.Item>
          </Menu>
        )}
      </UserMenu>
    )
  },
  decorators: [decorator],
  args: {
    fullName: 'Яндиев Руслан Асхабович',
    role: 'Разработчик интерфейсов'
  }
}
