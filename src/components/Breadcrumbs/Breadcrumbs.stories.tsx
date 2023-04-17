// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { Breadcrumbs } from './index'

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Breadcrumbs',
  component: Breadcrumbs
}

export default meta

const Template: StoryFn<typeof Breadcrumbs> = (args) => {
  return (
    <Breadcrumbs {...args}>
      <Breadcrumbs.Item as="a" href="https://specdep.ru/">
        Главная
      </Breadcrumbs.Item>
      <Breadcrumbs.Item as="a" href="https://specdep.ru/" target="_blank">
        Пайщики
      </Breadcrumbs.Item>
      <Breadcrumbs.Item>Морозов Виталий Владимирович</Breadcrumbs.Item>
    </Breadcrumbs>
  )
}
export const Playground = {
  render: Template
}
