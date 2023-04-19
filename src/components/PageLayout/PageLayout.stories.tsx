// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { PageLayout } from './index'
import { HeaderNav } from '../HeaderNav'
import { SideNav } from '../SideNav'
import { Logo } from '../Logo'
import { Space } from '../Space'

const meta: Meta<typeof PageLayout> = {
  title: 'Layout/PageLayout',
  component: PageLayout
}

export default meta

const Template: StoryFn<typeof PageLayout> = (args) => {
  return (
    <PageLayout {...args}>
      <PageLayout.Header sticky containerWidth="large">
        <Space direction="horizontal" gap="xlarge">
          <Logo style={{ width: '140px' }} />
          <HeaderNav>
            <HeaderNav.Item active>Пункт меню 1</HeaderNav.Item>
            <HeaderNav.Item>Пункт меню 2</HeaderNav.Item>
            <HeaderNav.Item>Пункт меню 3</HeaderNav.Item>
          </HeaderNav>
        </Space>
      </PageLayout.Header>
      <PageLayout.Body containerWidth="large">
        <PageLayout.Aside style={{ padding: '12px 0' }}>
          <SideNav>
            <SideNav.Item as="a" href="https://specdep.ru/" target="_blank">
              Входящие
            </SideNav.Item>
            <SideNav.Item active as="a" href="https://specdep.ru/">
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
        </PageLayout.Aside>
        <PageLayout.Content>
          <div
            style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            {Array.from({ length: 40 }, (_, i) => (
              <p key={i}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor
                ab veritatis dolorum accusantium, eius laudantium expedita fuga
                unde sed odit iure eligendi. Sapiente harum ex commodi aperiam
                dignissimos non expedita natus labore eius eligendi illum dolore
                laudantium, consequuntur similique nostrum.
              </p>
            ))}
          </div>
        </PageLayout.Content>
      </PageLayout.Body>
      {/* <PageLayout.BottomBar containerWidth="large">
        Bottom Bar
      </PageLayout.BottomBar> */}
    </PageLayout>
  )
}

export const Playground = {
  render: Template,

  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'light' }
  }
}
