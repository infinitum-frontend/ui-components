// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Button } from '../components/Button'
import { Space } from '../components/Space'
// import { Text } from '../components/Text'
// import { Heading } from '../components/Heading'
// import { Input } from '../components/Input'
// import { Divider } from '../components/Divider'
import { PageLayout } from '../components/PageLayout'
import { HeaderNav } from '../components/HeaderNav'
import { Logo } from '../components/Logo'
// import { Link } from '../components/Link'
// import { Box } from '../components/Box'
// import { Modal } from '../components/Modal'
import {
  // useNotification,
  NotificationContainer,
  NotificationProvider
} from '../components/Notification'
import { SideNav } from '../components/SideNav'
import { Meta, StoryObj } from '@storybook/react'

const ComponentMeta: Meta<typeof Button> = {
  title: 'Demo/Design System',
  parameters: {
    themes: {
      default: 'light',
      list: [
        { name: 'light', class: 'inf-ui-theme-light' },
        { name: 'dark', class: 'inf-ui-theme-dark' }
      ]
    }
  }
}

export default ComponentMeta

export const DesignSystem: StoryObj = {
  render: () => {
    // const [isModalOpen, setIsModalOpen] = React.useState(false)
    // const notify = useNotification()

    return (
      <PageLayout>
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
          <PageLayout.Aside>
            <SideNav>
              <SideNav.Item>Входящие</SideNav.Item>
              <SideNav.Item active>Исходящие</SideNav.Item>
              <SideNav.Item>Отчетность</SideNav.Item>
              <SideNav.Item>Документы для отправки</SideNav.Item>
              <SideNav.Item>Черновики</SideNav.Item>
              <SideNav.Item>Локальный справочник контрагентов</SideNav.Item>
            </SideNav>
          </PageLayout.Aside>

          <PageLayout.Content>
            {/* <Box padding="large">
              <Space>
                <Space>
                  <Text size="large" weight="bold">
                    Типографика
                  </Text>
                  <Heading level={Heading.Level.H1}>Heading 1</Heading>
                  <Heading level={Heading.Level.H2}>Heading 2</Heading>
                  <Heading level={Heading.Level.H3}>Heading 3</Heading>
                  <Heading level={Heading.Level.H4}>Heading 4</Heading>
                  <Text size={Text.Size.Large} weight={Text.Weight.Bold}>
                    Subtitle 1
                  </Text>
                  <Text size={Text.Size.Medium} weight={Text.Weight.Bold}>
                    Subtitle 2
                  </Text>
                  <Text size={Text.Size.Small} weight={Text.Weight.Bold}>
                    Subtitle 3
                  </Text>
                  <Text size={Text.Size.Medium} weight={Text.Weight.Bold}>
                    Body 1
                  </Text>
                  <Text size={Text.Size.Small} weight={Text.Weight.Bold}>
                    Body 2
                  </Text>
                  <Text
                    size={Text.Size.XSmall}
                    weight={Text.Weight.Bold}
                    uppercase
                  >
                    Overline 1
                  </Text>
                </Space>

                <Divider />

                <Space>
                  <Text size={Text.Size.Large} weight={Text.Weight.Bold}>
                    Кнопки
                  </Text>
                  <Space>
                    <Button
                      variant={Button.Variant.Primary}
                      onClick={() => setIsModalOpen(true)}
                    >
                      Открыть модальное окно
                    </Button>
                    <Modal
                      open={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                    >
                      <Modal.Header>
                        <Modal.Title>Модальное окно</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Eum voluptatem nostrum modi quasi atque, eius
                        animi deserunt veniam voluptatibus qui.
                      </Modal.Body>
                      <Modal.Footer>
                        <Space direction={Space.Direction.Horizontal}>
                          <Button
                            variant={Button.Variant.Secondary}
                            onClick={() =>
                              notify('Lorem ipsum dolor sit amet.')
                            }
                          >
                            Кнопка 1
                          </Button>
                          <Button variant={Button.Variant.Tertiary}>
                            Кнопка 2
                          </Button>
                          <Button variant={Button.Variant.Ghost}>
                            Кнопка 3
                          </Button>
                        </Space>
                      </Modal.Footer>
                    </Modal>
                    <Button variant={Button.Variant.Secondary}>
                      Скорректировать результат проверки
                    </Button>
                    <Button variant={Button.Variant.Tertiary}>
                      Прикрепить файлы...
                    </Button>
                  </Space>
                </Space>

                <Divider />

                <Space>
                  <Text size={Text.Size.Large} weight={Text.Weight.Bold}>
                    Ссылка
                  </Text>
                  <Space>
                    <Link>Ссылка</Link>
                  </Space>
                </Space>

                <Divider />

                <Space>
                  <Text size={Text.Size.Large} weight={Text.Weight.Bold}>
                    Box
                  </Text>
                  <Space direction={Space.Direction.Horizontal}>
                    <Box
                      background={Box.Background.Secondary}
                      padding={Box.Padding.Medium}
                      borderRadius={Box.BorderRadius.Medium}
                    >
                      <Space>
                        <Text>
                          it amet consectetur adipisicing elit. Ut, facere
                          alias. Est atque unde maxime molestias quas excepturi
                          assumenda. Modi?
                        </Text>
                        <Space direction={Space.Direction.Horizontal}>
                          <Button variant={Button.Variant.Primary}>
                            Кнопка
                          </Button>
                          <Button variant={Button.Variant.Secondary}>
                            Кнопка
                          </Button>
                          <Button variant={Button.Variant.Tertiary}>
                            Кнопка
                          </Button>
                          <Button variant={Button.Variant.Ghost}>Кнопка</Button>
                        </Space>
                      </Space>
                    </Box>
                    <Box
                      background={Box.Background.Inverse}
                      padding={Box.Padding.Medium}
                      borderRadius={Box.BorderRadius.Medium}
                    >
                      <Space>
                        <Text tone={Text.Tone.Inverse}>
                          it amet consectetur adipisicing elit. Ut, facere
                          alias. Est atque unde maxime molestias quas excepturi
                          assumenda. Modi?
                        </Text>
                        <Space direction={Space.Direction.Horizontal}>
                          <Button variant={Button.Variant.Primary}>
                            Кнопка
                          </Button>
                          <Button variant={Button.Variant.Secondary}>
                            Кнопка
                          </Button>
                          <Button variant={Button.Variant.Tertiary}>
                            Кнопка
                          </Button>
                          <Button variant={Button.Variant.Ghost}>Кнопка</Button>
                        </Space>
                      </Space>
                    </Box>
                  </Space>
                </Space>

                <Divider />

                <Space>
                  <Text size={Text.Size.Large} weight={Text.Weight.Bold}>
                    Form
                  </Text>
                  <Space>
                    <Input />
                    <Input status="error" />
                  </Space>
                </Space>
              </Space>
            </Box> */}
          </PageLayout.Content>
        </PageLayout.Body>
      </PageLayout>
    )
  },

  decorators: [
    (Story) => {
      return (
        <NotificationProvider>
          <Story />
          <NotificationContainer />
        </NotificationProvider>
      )
    }
  ],

  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'light' }
  }
}
