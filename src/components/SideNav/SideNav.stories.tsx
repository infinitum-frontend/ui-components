// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { SideNav } from './index'
import { Menu } from '../Menu'

const meta: Meta<typeof SideNav> = {
  title: 'SideNav',
  component: SideNav
}

export default meta

const Template: StoryFn<typeof SideNav> = (args) => {
  return (
    <SideNav {...args}>
      <SideNav.Item active as="a" href="https://ya.ru" target="_blank">
        Входящие
      </SideNav.Item>
      <SideNav.Item as="a" href="https://ya.ru">
        Исходящие
      </SideNav.Item>
      <SideNav.Item as="a" href="https://ya.ru">
        Отчетность
      </SideNav.Item>
      <SideNav.Item as="a" href="https://ya.ru">
        Документы для отправки
      </SideNav.Item>
      <SideNav.Item as="a" href="https://ya.ru">
        Черновики
      </SideNav.Item>
      <SideNav.Item as="a" href="https://ya.ru">
        Локальный справочник контрагентов
      </SideNav.Item>
    </SideNav>
  )
}

export const Playground = {
  render: Template
}

export const WithMenu: StoryFn<typeof SideNav> = () => {
  return (
    <Menu as="nav">
      <Menu.Item as="a" href="https://ya.ru" target="_blank">
        Item 1
      </Menu.Item>
      <Menu.Item as="a" href="https://ya.ru" target="_blank">
        Item 2
      </Menu.Item>
      <Menu.Item as="a" href="https://ya.ru" target="_blank">
        Item 3
      </Menu.Item>
      <Menu.Item as="a" href="https://ya.ru" target="_blank">
        Item 4
      </Menu.Item>
    </Menu>
  )
}
