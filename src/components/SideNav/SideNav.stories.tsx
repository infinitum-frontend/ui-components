// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { SideNav } from './index'

const meta: Meta<typeof SideNav> = {
  title: 'SideNav',
  component: SideNav
}

export default meta

const Template: StoryFn<typeof SideNav> = (args) => {
  return (
    <SideNav {...args}>
      <SideNav.Item as="a" href="https://ya.ru">
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

export const Playground = Template.bind({})
