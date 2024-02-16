// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta, StoryObj } from '@storybook/react'
import { Breadcrumbs } from './index'
import { IBreadcrumbsItem } from './Breadcrumbs'

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  args: {
    as: 'div'
  }
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

const breadcrumbItems: Array<IBreadcrumbsItem<'a'>> = [
  {
    title: 'Главная',
    as: 'a',
    href: 'https://specdep.ru'
  },
  {
    title: 'Прасс Павел',
    as: 'a',
    href: 'https://specdep.ru'
  },
  {
    title: 'Хальмеев Александр',
    as: 'a',
    href: 'https://specdep.ru'
  },
  {
    title: 'Леонид Хенкин',
    as: 'a',
    href: 'https://specdep.ru'
  },
  { title: 'Александр Круглов', as: 'a', href: 'https://specdep.ru' }
]

export const WithHiddenItems: StoryObj<typeof Breadcrumbs> = {
  render: (args) => {
    return <Breadcrumbs items={breadcrumbItems} maxVisibleCount={3} />
  }
}
