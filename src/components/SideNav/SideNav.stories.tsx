// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { SideNav } from './index'

const meta: Meta<typeof SideNav> = {
  title: 'Components/SideNav',
  component: SideNav
}

export default meta

const Template: StoryFn<typeof SideNav> = (args) => {
  return (
    <SideNav {...args}>
      <SideNav.Item active as="a" href="https://specdep.ru/" target="_blank">
        Входящие
      </SideNav.Item>
      <SideNav.Item as="a" href="https://specdep.ru/">
        Исходящие
      </SideNav.Item>
      <SideNav.Item as="a" href="https://specdep.ru/">
        Отчетность
      </SideNav.Item>
      <SideNav.Item as="a" href="https://specdep.ru/">
        Документы для отправки
      </SideNav.Item>
      <SideNav.Item as="a" href="https://specdep.ru/">
        Черновики
      </SideNav.Item>
      <SideNav.Item as="a" href="https://specdep.ru/">
        Локальный справочник контрагентов
      </SideNav.Item>
    </SideNav>
  )
}

export const Playground = {
  render: Template
}
