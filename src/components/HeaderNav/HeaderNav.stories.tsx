// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { Container } from 'Components/Container'
import { Logo } from 'Components/Logo'
import { Space } from 'Components/Space'
import { Menu } from '../Menu'
import { PageLayout } from '../PageLayout'
import { HeaderNav } from './index'

const meta: Meta<typeof HeaderNav> = {
  title: 'Components/HeaderNav',
  component: HeaderNav
}

export default meta

const Template: StoryFn<typeof HeaderNav> = (args) => {
  return (
    <div>
      <HeaderNav {...args}>
        <HeaderNav.Item as="a" href="javascript:void(0);">
          Главная
        </HeaderNav.Item>
        <HeaderNav.Item as="a" href="javascript:void(0);">
          Пайщики
        </HeaderNav.Item>
        <HeaderNav.Item active>Морозов Виталий Владимирович</HeaderNav.Item>
      </HeaderNav>
    </div>
  )
}

export const Playground = {
  render: Template
}

export const InLayout: StoryObj<typeof HeaderNav> = {
  render: (args) => {
    return (
      <PageLayout>
        <PageLayout.Header>
          <Space direction="horizontal" gap="xxlarge" align="center">
            <Logo style={{ width: '126px' }} />
            <HeaderNav>
              <HeaderNav.Item>Последующий контроль</HeaderNav.Item>
              <HeaderNav.Item active>Показатели контроля</HeaderNav.Item>
              <HeaderNav.Item>Сотрудники</HeaderNav.Item>
              <HeaderNav.Item>Портфели</HeaderNav.Item>
            </HeaderNav>
          </Space>
        </PageLayout.Header>
        <PageLayout.Body>
          <Container>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            recusandae ab nisi, quasi atque perferendis ex itaque. Molestiae ut,
            consequatur neque ea facere sed. Consectetur impedit laboriosam rem
            maxime velit ducimus voluptates ullam, ab voluptatem at minus
            inventore, dolorem fugit perferendis non rerum a molestiae qui illum
            libero iure nulla itaque. Quasi atque numquam tempora qui inventore
            iste esse est dolorum excepturi, repudiandae facere laboriosam alias
            voluptates, pariatur soluta! Voluptatem repudiandae placeat sed
            aspernatur quisquam ipsam atque, eum voluptate reprehenderit minima
            unde id reiciendis eos a dolore blanditiis odit ut, quasi dolorum
            modi enim temporibus facilis, distinctio dignissimos! Magnam,
            deserunt.
          </Container>
        </PageLayout.Body>
      </PageLayout>
    )
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'light' }
  }
}

export const WithSubmenu: StoryObj<typeof HeaderNav> = {
  render: (args) => {
    return (
      <PageLayout>
        <PageLayout.Header>
          <Space direction="horizontal" gap="xxlarge" align="center">
            <Logo style={{ width: '126px' }} />
            <HeaderNav {...args}>
              <HeaderNav.Item as="a" href="https://specdep.ru/" target="_blank">
                Главная
              </HeaderNav.Item>
              <HeaderNav.Item
                active
                submenu={({ close }) => (
                  <Menu>
                    <Menu.Item
                      active
                      as="a"
                      href="https://specdep.ru/"
                      onClick={close}
                    >
                      Активная ссылка
                    </Menu.Item>
                    <Menu.Item
                      as="a"
                      href="https://specdep.ru/kontakty/"
                      onClick={close}
                      disabled
                    >
                      Заблокированный пункт
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => {
                        close()
                        alert('клик не по ссылке')
                      }}
                    >
                      Не ссылка, а кнопка
                    </Menu.Item>
                    <Menu.Item>
                      Очень очень очень очень очень очень длинный текст
                    </Menu.Item>
                  </Menu>
                )}
              >
                Второстепенная
              </HeaderNav.Item>
              <HeaderNav.Item>Еще второстепенная</HeaderNav.Item>
              <HeaderNav.Item
                submenu={({ close }) => (
                  <Menu maxHeight={200}>
                    <Menu.Item>Один</Menu.Item>
                    <Menu.Item>Два</Menu.Item>
                    <Menu.Item>Три</Menu.Item>
                    <Menu.Item>Четыре</Menu.Item>
                    <Menu.Item>Пять</Menu.Item>
                    <Menu.Item>Шесть</Menu.Item>
                    <Menu.Item>Семь</Menu.Item>
                    <Menu.Item>Восемь</Menu.Item>
                    <Menu.Item>Девять</Menu.Item>
                    <Menu.Item>Десять</Menu.Item>
                  </Menu>
                )}
              >
                Много пунктов меню
              </HeaderNav.Item>
            </HeaderNav>
          </Space>
        </PageLayout.Header>
      </PageLayout>
    )
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'light' }
  }
}
