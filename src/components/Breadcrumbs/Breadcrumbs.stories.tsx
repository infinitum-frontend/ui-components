// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta, StoryObj } from '@storybook/react'
import { Breadcrumbs, useSplittedBreadcrumbs } from './index'
import { ElementType, Fragment } from 'react'
import { Link } from '../Link'
import { DropdownMenu } from '../DropdownMenu'

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

const breadcrumbItems: Array<{
  title: string
  href?: string
  as?: ElementType
}> = [
  {
    title: 'Главная',
    href: 'https://specdep.ru',
    as: 'a'
  },
  {
    title: 'Проверяемые лица',
    href: 'https://specdep.ru',
    as: Link
  },
  {
    title: 'Хальмеев Александр'
  },
  {
    title: 'Леонид Хенкин'
  },
  { title: 'Александр Круглов' }
]

export const WithHiddenItems: StoryObj<typeof Breadcrumbs> = {
  render: (args) => {
    const { hasHiddenItems, firstItem, hiddenItems, lastItems } =
      useSplittedBreadcrumbs(breadcrumbItems, 2)

    return (
      <Breadcrumbs>
        {hasHiddenItems ? (
          <>
            <Breadcrumbs.Item as={firstItem.as} href={firstItem.href}>
              {firstItem.title}
            </Breadcrumbs.Item>
            <Breadcrumbs.Separator />
            <DropdownMenu>
              <DropdownMenu.Trigger>
                <Breadcrumbs.ShowMoreButton />
              </DropdownMenu.Trigger>

              <DropdownMenu.Content>
                {hiddenItems.map((item) => (
                  <DropdownMenu.Item key={item.title}>
                    {item.title}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu>
            <Breadcrumbs.Separator />
            {lastItems.map((item, index) => (
              <Fragment key={item.title}>
                <Breadcrumbs.Item>{item.title}</Breadcrumbs.Item>
                {index !== lastItems.length - 1 && <Breadcrumbs.Separator />}
              </Fragment>
            ))}
          </>
        ) : (
          breadcrumbItems.map((item) => (
            <Breadcrumbs.Item key={item.title} href={item.href} as={item.as}>
              {item.title}
            </Breadcrumbs.Item>
          ))
        )}
      </Breadcrumbs>
    )
  }
}
