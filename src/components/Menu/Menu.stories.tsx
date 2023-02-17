// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactNode, useState } from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { Menu } from './index'
import { Checkbox } from '../Checkbox'
// @ts-expect-error
import { ReactComponent as PortfolioIcon } from 'Icons/portfolio.svg'
// @ts-expect-error
import { ReactComponent as ClearIcon } from 'Icons/cross.svg'
import { Space } from '../Space'
import { Text } from '../Text'
import { Popover } from '../Popover'
import { Button } from '../Button'
import { Layout } from '../Layout'
import { Page } from '../Page'
import { ReactComponent as ArrowDownIcon } from 'Icons/chevron-down.svg'
import {
  BaseMenuLong,
  MenuBase,
  MenuWithNestedSelection,
  MenuWithStatuses
} from './example'
import { TextProps } from '../Text/Text'

const meta: Meta<typeof Menu> = {
  title: 'Menu',
  component: Menu,
  subcomponents: {
    'Menu.Item': Menu.Item,
    'Menu.Item.Icon': Menu.Item.Icon,
    'Menu.Item.Content': Menu.Item.Content,
    'Menu.Item.Button': Menu.Item.Button
  }
}

export default meta

const Template: StoryFn<typeof Menu> = (args) => {
  return (
    <Menu {...args}>
      {MenuBase.map((item, index) => (
        <Menu.Item key={index}>{item.text}</Menu.Item>
      ))}
    </Menu>
  )
}

export const Playground = Template.bind({})

export const WithActionButton: StoryFn<typeof Menu> = (args) => {
  return (
    <Menu style={{ width: '350px' }}>
      {MenuBase.map((item) => (
        <Menu.Item key={item.text}>
          <Menu.Item.Content>
            <Text size={'small'}>{item.text}</Text>
          </Menu.Item.Content>
          <Menu.Item.Button>
            <ClearIcon style={{ color: '#F53A3A' }} />
          </Menu.Item.Button>
        </Menu.Item>
      ))}
    </Menu>
  )
}

export const WithIcon: StoryFn<typeof Menu> = (args) => {
  const getTextToneByStatus = (status: string): TextProps['tone'] => {
    switch (status) {
      case 'error':
        return 'danger'
      case 'success':
        return 'success'
      default:
        return 'quaternary'
    }
  }
  return (
    <Menu>
      {MenuWithStatuses.map((item) => (
        <Menu.Item disabled={Boolean(item.disabled)} key={item.statusText}>
          <Menu.Item.Icon>
            <PortfolioIcon />
          </Menu.Item.Icon>
          <Menu.Item.Content>
            <Space gap={'xxsmall'}>
              <Text size={'small'}>{item.name}</Text>
              <Space gap={'xxsmall'} direction={'horizontal'}>
                <Text tone={getTextToneByStatus(item.status)}>
                  {item.statusText}
                </Text>
                {item.additionalInfo && (
                  <Text tone={'secondary'}>{item.additionalInfo}</Text>
                )}
              </Space>
            </Space>
          </Menu.Item.Content>
        </Menu.Item>
      ))}
    </Menu>
  )
}

export const Nested: StoryFn<typeof Menu> = (args) => {
  const getCollapsedContent = (
    item: (typeof MenuWithNestedSelection)[0]
  ): ReactNode => {
    return (
      Boolean(item.subitems) && (
        <Menu nested={true}>
          {item.subitems?.map((subitem) => (
            <Menu.Item key={subitem.text}>
              <Menu.Item.Content>{subitem.text}</Menu.Item.Content>
              <Menu.Item.Button>
                <Checkbox checked={subitem.selected} />
              </Menu.Item.Button>
            </Menu.Item>
          ))}
        </Menu>
      )
    )
  }
  return (
    <Menu style={{ width: '450px' }}>
      {MenuWithNestedSelection.map((item, key) => (
        <Menu.Item
          key={key}
          collapsible={true}
          collapsedContent={getCollapsedContent(item)}
        >
          <Menu.Item.Content>{item.text}</Menu.Item.Content>
          <Menu.Item.Button>
            <Checkbox
              checked={item.selected}
              indeterminate={Boolean(
                item.subitems?.find((item) => item.selected)
              )}
            />
          </Menu.Item.Button>
        </Menu.Item>
      ))}
    </Menu>
  )
}

export const Scrollable: StoryFn<typeof Menu> = (args) => {
  return (
    <Menu maxHeight={150}>
      {BaseMenuLong.map((item) => (
        <Menu.Item key={item.text}>{item.text}</Menu.Item>
      ))}
    </Menu>
  )
}

export const InPopover: StoryFn<typeof Menu> = (args) => {
  const [isOpen, setIsOpen] = useState(true)

  function onExitClick(): void {
    alert('Выйти')
  }

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
      placement="bottom-end"
      offset={{ mainAxis: 5, crossAxis: -15 }}
    >
      <Popover.Trigger onClick={() => setIsOpen((v) => !v)}>
        <Button variant="ghost" after={<ArrowDownIcon />}>
          Константин Константинопольский
        </Button>
      </Popover.Trigger>
      <Popover.Content hasPadding={false} style={{ width: '150px' }}>
        <Menu borderRadius="regular">
          <Menu.Item as="a" target="_blank" href="https://ya.ru">
            Настройки
          </Menu.Item>
          <Menu.Item as="button" onClick={onExitClick}>
            Выйти
          </Menu.Item>
        </Menu>
      </Popover.Content>
    </Popover>
  )
}

export const FotonSideNav: StoryFn<typeof Menu> = (args) => {
  return (
    <Layout>
      <Layout.Header>Header</Layout.Header>
      <Layout.Body>
        <Page>
          <Page.Header>Page Header</Page.Header>
          <Page.Aside>
            <Menu as="nav">
              <Menu.Item as="a" href="https://ya.ru">
                Совет директоров
              </Menu.Item>
              <Menu.Item as="a" href="https://ya.ru">
                Входящие
              </Menu.Item>
              <Menu.Item as="a" href="https://ya.ru">
                Исходящие
              </Menu.Item>
              <Menu.Item as="a" href="https://ya.ru">
                Отчетность
              </Menu.Item>
              <Menu.Item as="a" href="https://ya.ru">
                Документы для отправки
              </Menu.Item>
            </Menu>
          </Page.Aside>
          <Page.Body>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias
            ducimus tenetur cum harum expedita, maiores voluptate quod
            temporibus incidunt neque distinctio magni inventore consequatur hic
            pariatur. Fuga officia incidunt, voluptate accusamus, natus minus
            eos assumenda dolor, autem recusandae delectus magni laudantium
            culpa eum! Nisi, nostrum provident. Tenetur illo numquam molestiae?
          </Page.Body>
        </Page>
      </Layout.Body>
    </Layout>
  )
}
