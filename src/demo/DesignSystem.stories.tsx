// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Button } from '../components/Button'
import { Space } from '../components/Space'
import { Grid } from '../components/Grid'
import { Text } from '../components/Text'
import { UserMenu } from '../components/UserMenu'
import { Menu } from '../components/Menu'
import { Tabs } from '../components/Tabs'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { Card } from '../components/Card'
import { Modal } from '../components/Modal'
// import { Heading } from '../components/Heading'
// import { Input } from '../components/Input'
// import { Divider } from '../components/Divider'
import { PageLayout } from '../components/PageLayout'
import { HeaderNav } from '../components/HeaderNav'
import { Logo } from '../components/Logo'
import { Form } from '../components/Form'
import { Input } from '../components/Input'
import { Textarea } from '../components/Textarea'
import { Divider } from '../components/Divider'
import { Link } from '../components/Link'
// import { Link } from '../components/Link'
import { Box } from '../components/Box'
// import { Modal } from '../components/Modal'
import { ReactComponent as IconProfile } from 'Icons/user.svg'
import { ReactComponent as IconQuit } from 'Icons/sign-out.svg'
import {
  useNotification,
  NotificationContainer,
  NotificationProvider
} from '../components/Notification'
import { Meta, StoryObj } from '@storybook/react'
import { Table, TableRow } from '../components/Table'
import {
  TABLE_DATA,
  TYPE_FILTER_ITEMS,
  Portfolio
} from '../components/Table/fixtures'
import { ColumnDef } from '@tanstack/react-table'

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
    const [isModalOpen, setIsModalOpen] = React.useState(false)
    const [selection, setSelection] = React.useState<
      Array<TableRow<Portfolio>>
    >([])
    const [selected, setSelected] = React.useState('')

    const notify = useNotification()

    const handleChange = (data: Array<TableRow<Portfolio>>): void => {
      setSelection(data)
    }
    const handleRowClick = (row: TableRow<any>): void => {
      setSelected(row.id)
    }

    return (
      <PageLayout>
        <PageLayout.Header sticky containerSize="xxlarge">
          <Grid
            templateColumns="max-content 1fr max-content"
            gap="xlarge"
            alignItems="center"
          >
            <Logo prefix="МПК" />
            <HeaderNav>
              <HeaderNav.Item>Результаты контроля</HeaderNav.Item>
              <HeaderNav.Item>Уведомления</HeaderNav.Item>
              <HeaderNav.Item>Показатели контроля</HeaderNav.Item>
              <HeaderNav.Item active>Портфели</HeaderNav.Item>
            </HeaderNav>

            <UserMenu fullName="Иванов Константин Сергеевич" role="Инвестор">
              {({ close }) => (
                <Menu>
                  <Menu.Item as="a" href="https://ya.ru">
                    <Menu.Item.Icon>
                      <IconProfile />
                    </Menu.Item.Icon>
                    Профиль
                  </Menu.Item>

                  <Menu.Item
                    as="button"
                    onClick={() => {
                      close()
                    }}
                  >
                    <Menu.Item.Icon>
                      <IconQuit />
                    </Menu.Item.Icon>
                    Выйти из аккаунта
                  </Menu.Item>
                </Menu>
              )}
            </UserMenu>
          </Grid>

          {/* <Popover open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
              <Popover.Trigger onClick={() => setIsUserMenuOpen((v) => !v)}>
                <Button
                  variant="ghost"
                  after={
                    <ArrowDownIcon
                      style={{
                        transform: isUserMenuOpen ? 'rotate(180deg)' : ''
                      }}
                    />
                  }
                >
                  Константин Константинопольский
                </Button>
              </Popover.Trigger>
              <Popover.Content variant="inverse">
                <Space gap="small" style={{ width: '235px' }}>
                  <Space gap="xxsmall">
                    <Text variant="subtitle-2">Иван Иванов</Text>
                    <Text color="tertiary">Проверяющий портфели</Text>
                  </Space>
                  <Space gap="xxsmall">
                    <Text color="secondary">Логин</Text>
                    <Text>specdep/byndyusoft11</Text>
                  </Space>
                  <Space gap="xxsmall">
                    <Text color="secondary">E-mail</Text>
                    <Text>byndyusoft11@specdep.ru</Text>
                  </Space>
                  <Space gap="xxsmall">
                    <Text color="secondary">Телефон</Text>
                    <Text>+79999999999</Text>
                  </Space>
                </Space>
              </Popover.Content>
            </Popover> */}
        </PageLayout.Header>

        <PageLayout.Body containerSize="xxlarge">
          <PageLayout.Content>
            <Space gap="large">
              <Breadcrumbs>
                <Breadcrumbs.Item>Портфели</Breadcrumbs.Item>
                <Breadcrumbs.Item>НПФ «Будущее»</Breadcrumbs.Item>
              </Breadcrumbs>

              <Space direction="horizontal" justify="space-between">
                <Text variant="heading-2">Портфель «Другой»</Text>
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                  Добавить показатель в декларацию
                </Button>
                <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                  <Modal.Header>
                    <Modal.Title>Модальное окно</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Space gap="large">
                        <Form.Group required>
                          <Form.Label>Имя</Form.Label>
                          <Input placeholder="Введите имя" />
                        </Form.Group>
                        <Form.Group required>
                          <Form.Label>Фамилия</Form.Label>
                          <Input placeholder="Введите фамилию" status="error" />
                        </Form.Group>
                        <Form.Group required>
                          <Form.Label>Роль</Form.Label>
                          <Input disabled placeholder="Введите роль" />
                        </Form.Group>

                        <Space direction="horizontal" gap="large">
                          <Button variant="primary">Сохранить</Button>
                          <Button variant="ghost">Отменить</Button>
                        </Space>
                      </Space>
                    </Form>
                  </Modal.Body>
                </Modal>
              </Space>

              <Grid templateColumns="1fr 566px" gap="large">
                <Space gap="large">
                  <Tabs>
                    <Tabs.List>
                      <Tabs.Tab>Все</Tabs.Tab>
                      <Tabs.Tab>Активные</Tabs.Tab>
                      <Tabs.Tab>Деактивированные</Tabs.Tab>
                      <Tabs.Tab>Неактивированные</Tabs.Tab>
                    </Tabs.List>
                  </Tabs>

                  <Grid templateColumns="repeat(4, 1fr)">
                    <Input placeholder="ID или название" />
                    <Input />
                    <Input />
                    <Input />
                  </Grid>

                  <Table
                    columns={tableColumns}
                    rows={TABLE_DATA}
                    withRowSelection={true}
                    onChangeRowSelection={handleChange}
                    selectionState={selection}
                    selectedRow={selected}
                    onRowClick={handleRowClick}
                  />
                </Space>

                <Card variant="raised">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Soluta, reprehenderit!
                </Card>
              </Grid>

              <Space style={{ padding: '0 var(--inf-space-large)' }}>
                <Button
                  variant="secondary"
                  onClick={() => notify('Lorem ipsum dolor sit amet.')}
                >
                  Кнопка 1
                </Button>
                <Text>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Quod, molestias.{' '}
                  <Link as="a" href="javascript:void(0);">
                    Читать далее ...
                  </Link>
                </Text>
              </Space>

              <Divider />

              <Box paddingX="large" style={{ maxWidth: '400px' }}>
                <Form>
                  <Form.Group>
                    <Form.Label>Имя</Form.Label>
                    <Input />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Фамилия</Form.Label>
                    <Input status="error" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Отчество</Form.Label>
                    <Input disabled />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>О себе</Form.Label>
                    <Textarea />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>О них</Form.Label>
                    <Textarea status="error" />
                  </Form.Group>
                </Form>
              </Box>
            </Space>
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
                        <Text color={Text.color.Inverse}>
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

const tableColumns: Array<ColumnDef<Portfolio, any>> = [
  {
    header: 'Портфель',
    id: 'portfolio',
    accessorKey: 'portfolio',
    // для рендеринга html
    // cell: info => info.getValue(),
    // для фильтрации по тексту по вложенным реакт-элементам
    // filterFn: 'elIncludesString',
    meta: {
      filterType: 'input'
    }
  },
  {
    header: 'Показатель',
    id: 'mark',
    accessorKey: 'mark'
  },
  {
    header: 'Тип',
    id: 'type',
    accessorKey: 'type',
    meta: {
      filterType: 'select',
      filterItems: TYPE_FILTER_ITEMS
    }
  },
  {
    header: 'Статус',
    id: 'status',
    accessorKey: 'status',
    meta: {
      filterType: 'select'
    }
  },
  {
    header: 'Дата',
    id: 'date',
    accessorKey: 'date',
    meta: {
      filterType: 'date'
    }
  }
]
