// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta, StoryObj } from '@storybook/react'
import { Breadcrumbs } from './index'
import { IBreadcrumbsItem } from './Breadcrumbs'
import { Link, LinkProps } from '../Link'

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

const breadcrumbItems: Array<IBreadcrumbsItem<typeof Link, LinkProps, 'a'>> = [
  {
    title: 'Главная',
    as: Link
  },
  {
    title: 'test',
    as: Link
  },
  {
    title: 'Хальмеев Александр',
    as: Link,
    href: 'https://specdep.ru'
  },
  {
    title: 'Леонид Хенкин',
    as: Link,
    href: 'https://specdep.ru'
  },
  { title: 'Александр Круглов', as: Link, href: 'https://specdep.ru' }
]

export const WithHiddenItems: StoryObj<typeof Breadcrumbs> = {
  render: (args) => {
    return <Breadcrumbs items={breadcrumbItems} maxVisibleCount={2} />
  }
}
