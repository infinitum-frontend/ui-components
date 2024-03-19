// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Button } from '../components/Button'
import { Space } from '../components/Space'
import { Text } from '../components/Text'
// import { Heading } from '../components/Heading'
// import { Input } from '../components/Input'
// import { Divider } from '../components/Divider'
import { PageLayout } from '../components/PageLayout'
import { HeaderNav } from '../components/HeaderNav'
import { Logo } from '../components/Logo'
import { Form } from '../components/Form'
import { Input } from '../components/Input'
// import { Textarea } from '../components/Textarea'
// import { Divider } from '../components/Divider'
import { Alert } from '../components/Alert'
// import { Link } from '../components/Link'
import { Select } from '../components/Select'
import { Grid } from '../components/Grid'
import { Popover } from '../components/Popover'
// import { ReactComponent as ArrowDownIcon } from 'Icons/chevron-down.svg'
import { ReactComponent as IconPlus } from 'Icons/plus.svg'
// import { Link } from '../components/Link'
// import { Modal } from '../components/Modal'
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
import { Card } from '../components/Card'
import { DatePicker } from '../components/DatePicker'

const ComponentMeta: Meta<typeof Button> = {
  title: 'Demo/Design System'
}

export default ComponentMeta

export const DesignSystem: StoryObj = {
  render: () => {
    // const [isModalOpen, setIsModalOpen] = React.useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false)
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
        <PageLayout.Header>
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'grid',
              gridTemplateColumns: '300px 1fr auto',
              alignItems: 'center'
            }}
          >
            <Logo style={{ width: '140px' }} />

            <HeaderNav>
              <HeaderNav.Item active>Пункт меню 1</HeaderNav.Item>
              <HeaderNav.Item>Пункт меню 2</HeaderNav.Item>
              <HeaderNav.Item>Пункт меню 3</HeaderNav.Item>
            </HeaderNav>

            <Popover open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
              <Popover.Trigger onClick={() => setIsUserMenuOpen((v) => !v)}>
                <Button variant="secondary" square>
                  КИ
                </Button>
              </Popover.Trigger>
              <Popover.Content>
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
            </Popover>
          </div>
        </PageLayout.Header>

        <PageLayout.Body>
          <PageLayout.Content>
            <Space gap="large">
              <Text variant="heading-2">Отчет по портфелю</Text>
              <Card>
                <Form>
                  <Space gap="large">
                    <Grid gap="medium" templateColumns="repeat(4, 1fr)">
                      <Form.Group required>
                        <Form.Label>Период проверки</Form.Label>
                        <DatePicker placeholder="Дата" />
                      </Form.Group>
                      <Form.Group required>
                        <Form.Label>Инвестиционные портфель</Form.Label>
                        <Select
                          options={[
                            { value: '1', label: '1' },
                            { value: '2', label: '2' }
                          ]}
                        />
                      </Form.Group>
                      <Form.Group required>
                        <Form.Label>Имя</Form.Label>
                        <Input placeholder="Введите имя" />
                      </Form.Group>
                    </Grid>

                    <Space direction="horizontal" justify="space-between">
                      <Space direction="horizontal">
                        <Button variant="primary" type="submit">
                          Показать результаты
                        </Button>
                        <Button variant="ghost">Сбросить фильтры</Button>
                      </Space>
                      <Button variant="secondary">Скачать результаты</Button>
                    </Space>
                  </Space>
                </Form>
              </Card>

              <Space gap="medium">
                <Space
                  direction="horizontal"
                  justify="space-between"
                  align="center"
                >
                  <Text variant="subtitle-1">Найдено 1981 лицо</Text>
                  <Space direction="horizontal" gap="small">
                    <Button variant="secondary" icon={<IconPlus />} />
                    <Button variant="secondary" icon={<IconPlus />} />
                    <Button variant="secondary" icon={<IconPlus />} />
                  </Space>
                </Space>

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

              <div style={{ height: '1000px' }} />

              <Space>
                <Button onClick={() => notify('Сообщение 1')}>Notify 1</Button>
                <Button>Notify 1</Button>
                <Button>Notify 1</Button>
                <Button>Notify 1</Button>
                <Button>Notify 1</Button>
              </Space>

              <Space>
                <Alert variant="neutral">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corporis, delectus?
                </Alert>
                <Alert variant="info">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corporis, delectus?
                </Alert>
                <Alert variant="error">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corporis, delectus?
                </Alert>
                <Alert variant="success">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corporis, delectus?
                </Alert>
                <Alert variant="warning">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corporis, delectus?
                </Alert>
                <Alert variant="violet">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corporis, delectus?
                </Alert>
                <Alert variant="teal">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corporis, delectus?
                </Alert>
              </Space>
            </Space>

            {/* <Space gap="large">


              <Divider />

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
            </Space> */}
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

        <PageLayout.Footer>
          <Space direction="horizontal" justify="space-between">
            <Text variant="body-1" color="secondary">
              © 2006–2024 «ИНФИНИТУМ»
            </Text>
            <Space direction="horizontal">
              <Text variant="body-1" color="secondary">
                8 800 800 80 80
              </Text>
              <Text variant="body-1" color="secondary">
                sd@specdep.ru
              </Text>
            </Space>
          </Space>
        </PageLayout.Footer>
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
