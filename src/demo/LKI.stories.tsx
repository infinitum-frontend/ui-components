// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react'
import { StoryObj, Meta } from '@storybook/react'
import { PageLayout } from '../components/PageLayout'
import { Space } from '../components/Space'
import { HeaderNav } from '../components/HeaderNav'
import { Logo } from '../components/Logo'
import { Text } from '../components/Text'
import { Tabs } from '../components/Tabs'
import { Input } from '../components/Input'
import { Box } from '../components/Box'
import { Radio } from '../components/Radio'
import { Card } from '../components/Card'
import { File } from '../components/File'
import { Button } from '../components/Button'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { Label, LabelProps } from '../components/Label'
import { Table, TableColumnDef, TableSortingState } from '../components/Table'
import { ReactComponent as SearchIcon } from 'Icons/search.svg'

const ComponentMeta: Meta = {
  title: 'Demo/Личный кабинет инвестора',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'clean' }
  }
}

export default ComponentMeta

export const MeetingsList: StoryObj = {
  render: () => {
    const [selectedPageTab, setSelectedPageTab] = useState(0)
    const [searchQuery, setSearchQuery] = useState('')
    const showArchive = selectedPageTab === 1

    const handlePageTabChange = (index: number): void => {
      setSelectedPageTab(index)
      setMeetings(filterMeetings(TABLE_DATA, index === 1, searchQuery))
    }

    const handleSearchQueryChange = (query: string): void => {
      setSearchQuery(query)
      setMeetings(filterMeetings(TABLE_DATA, showArchive, query))
    }

    const defaultSorting = [{ id: 'name', desc: false }]
    const [meetings, setMeetings] = useState(() =>
      filterMeetings(TABLE_DATA, showArchive, searchQuery)
    )
    const [sorting, setSorting] = useState(defaultSorting)

    const handleSortingChange = (state: TableSortingState): void => {
      setSorting(state)
      if (!state.length) {
        setMeetings(() => filterMeetings(TABLE_DATA, showArchive, searchQuery))
      } else {
        setMeetings((prev) =>
          [...prev].sort((a, b) => {
            const { id, desc } = state[0]

            const compareResult = a[id as keyof Meeting].localeCompare(
              b[id as keyof Meeting]
            )
            return desc ? -compareResult : compareResult
          })
        )
      }
    }

    return (
      <PageLayout>
        <PageLayout.Header containerWidth="medium">
          <Space direction="horizontal" align="center" gap="xxlarge">
            <Logo prefix="ЛКИ" />
            <HeaderNav style={{ flex: 1 }}>
              <HeaderNav.Item>Инвесторы</HeaderNav.Item>
              <HeaderNav.Item active>Собрания</HeaderNav.Item>
            </HeaderNav>
            <div>User</div>
          </Space>
        </PageLayout.Header>

        <PageLayout.Body containerWidth="medium">
          <PageLayout.Content>
            <Box paddingTop="xxlarge">
              <Space gap="large">
                <Text variant="heading-2">Список собраний</Text>
                <Input
                  style={{ maxWidth: '275px' }}
                  value={searchQuery}
                  onChange={handleSearchQueryChange}
                  placeholder="Найти собрание или фонд"
                  type="search"
                  allowClear
                  postfix={<SearchIcon />}
                />
              </Space>
            </Box>

            <Box paddingY="large">
              <Space gap="large">
                <Tabs
                  selectedIndex={selectedPageTab}
                  onChange={handlePageTabChange}
                >
                  <Tabs.List>
                    <Tabs.Tab>Собрания</Tabs.Tab>
                    <Tabs.Tab>Архив</Tabs.Tab>
                  </Tabs.List>
                </Tabs>

                <Table
                  withSorting
                  sortingState={sorting}
                  onSortingChange={handleSortingChange}
                  columns={columns}
                  rows={meetings}
                />
              </Space>
            </Box>
          </PageLayout.Content>
        </PageLayout.Body>
      </PageLayout>
    )
  }
}

export const MeetingDetails: StoryObj = {
  render: () => {
    const [question1, setQuestion1] = useState<string>('')
    const [question2, setQuestion2] = useState<string>('')

    return (
      <PageLayout>
        <PageLayout.Header containerWidth="medium">
          <Space direction="horizontal" align="center" gap="xxlarge">
            <Logo prefix="ЛКИ" />
            <HeaderNav style={{ flex: 1 }}>
              <HeaderNav.Item>Инвесторы</HeaderNav.Item>
              <HeaderNav.Item active>Собрания</HeaderNav.Item>
            </HeaderNav>
            <div>User</div>
          </Space>
        </PageLayout.Header>

        <PageLayout.Body containerWidth="medium">
          <PageLayout.Content>
            <Box paddingTop="xxlarge">
              <Space gap="large">
                <Breadcrumbs>
                  <Breadcrumbs.Item>Собрания</Breadcrumbs.Item>
                  <Breadcrumbs.Item>Работа с населением</Breadcrumbs.Item>
                </Breadcrumbs>
                <Space
                  direction="horizontal"
                  justify="space-between"
                  align="center"
                >
                  <Text variant="heading-2">Работа с населением</Text>
                  <Label variant="success">Идет голосование</Label>
                </Space>
                <Tabs>
                  <Tabs.List>
                    <Tabs.Tab>Бюллетень</Tabs.Tab>
                    <Tabs.Tab>Итоги голосования</Tabs.Tab>
                    <Tabs.Tab badge={8}>Оповещения</Tabs.Tab>
                    <Tabs.Tab>Обратная связь</Tabs.Tab>
                  </Tabs.List>
                </Tabs>
              </Space>
            </Box>
            <Box paddingY="large">
              <Space gap="xxlarge">
                <Space gap="large">
                  <Space
                    direction="horizontal"
                    justify="space-between"
                    align="center"
                  >
                    <Text variant="subtitle-1">
                      Рекомендуем ознакомиться с документами
                    </Text>
                    <Button variant="secondary">Скачать все документы</Button>
                  </Space>
                  <Space direction="horizontal" gap="small" wrap>
                    {documents.map(({ name, extension, size }, index) => (
                      <File
                        key={index}
                        name={name}
                        extension={extension}
                        size={size}
                      />
                    ))}
                  </Space>
                </Space>

                <Space gap="large">
                  <Text variant="subtitle-1">Голосование</Text>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 'var(--inf-space-large)'
                    }}
                  >
                    <Card size="large">
                      <Space gap="large">
                        <Text variant="subtitle-1">Вопрос №1</Text>
                        <Text variant="body-1">
                          Готовы ли вы вести профилактическую работу с
                          населением по сохранению стабильной положительной
                          экологической ситуации в вашем прайоне?
                        </Text>
                        <Radio.Group
                          name={'question1'}
                          value={question1}
                          onChange={(value) => setQuestion1(value)}
                        >
                          <Box
                            as="label"
                            borderWidth="default"
                            borderColor="default"
                            borderRadius="small"
                            paddingX="medium"
                            paddingY="small"
                            cursor="pointer"
                          >
                            <Radio value="yes">За</Radio>
                          </Box>
                          <Box
                            as="label"
                            borderWidth="default"
                            borderColor="default"
                            borderRadius="small"
                            paddingX="medium"
                            paddingY="small"
                            cursor="pointer"
                          >
                            <Radio value="no">Против</Radio>
                          </Box>
                          <Box
                            as="label"
                            borderWidth="default"
                            borderColor="default"
                            borderRadius="small"
                            paddingX="medium"
                            paddingY="small"
                            cursor="pointer"
                          >
                            <Radio value="no-answer">Воздержусь</Radio>
                          </Box>
                        </Radio.Group>
                      </Space>
                    </Card>

                    <Card size="large" outlineVariant="danger">
                      <Space gap="large">
                        <Space direction="horizontal" justify="space-between">
                          <Text variant="subtitle-1">Вопрос №2</Text>
                          <Text variant="body-1" color="danger">
                            Необходимо проголосовать
                          </Text>
                        </Space>
                        <Text variant="body-1">
                          Готовы ли вы вести профилактическую работу с
                          населением по сохранению стабильной положительной
                          экологической ситуации в вашем прайоне?
                        </Text>
                        <Radio.Group
                          name={'question2'}
                          value={question2}
                          onChange={(value) => setQuestion2(value)}
                        >
                          <Box
                            as="label"
                            borderWidth="default"
                            borderColor="default"
                            borderRadius="small"
                            paddingX="medium"
                            paddingY="small"
                            cursor="pointer"
                          >
                            <Radio value="yes">За</Radio>
                          </Box>
                          <Box
                            as="label"
                            borderWidth="default"
                            borderColor="default"
                            borderRadius="small"
                            paddingX="medium"
                            paddingY="small"
                            cursor="pointer"
                          >
                            <Radio value="no">Против</Radio>
                          </Box>
                          <Box
                            as="label"
                            borderWidth="default"
                            borderColor="default"
                            borderRadius="small"
                            paddingX="medium"
                            paddingY="small"
                            cursor="pointer"
                          >
                            <Radio value="no-answer">Воздержусь</Radio>
                          </Box>
                        </Radio.Group>
                      </Space>
                    </Card>
                  </div>

                  <Space direction="horizontal" gap="medium">
                    <Button>Подписать и отправить</Button>
                    <Button variant="secondary">Скачать все бюллетени</Button>
                  </Space>

                  <div>
                    <div>Вопрос 1: {question1}</div>
                    <div>Вопрос 2: {question2}</div>
                  </div>
                </Space>
              </Space>
            </Box>
          </PageLayout.Content>
        </PageLayout.Body>
      </PageLayout>
    )
  }
}

interface Meeting {
  name: string
  fond: string
  endDate: string
  status: keyof typeof statusVariantMap
}

interface StatusMeta {
  label: string
  colorVariant: LabelProps['variant']
}

interface Document {
  name: string
  extension: string
  size: number
}

const documents: Document[] = [
  {
    name: 'Список участников ЭГ',
    extension: 'pdf',
    size: 14.5
  },
  {
    name: 'Важный документ',
    extension: 'pdf',
    size: 14.5
  },
  {
    name: 'Обычный файл',
    extension: 'pdf',
    size: 14.5
  },
  {
    name: 'Список участников ЭГ',
    extension: 'pdf',
    size: 14.5
  },
  {
    name: 'Инвестиционный комитет',
    extension: 'pdf',
    size: 14.5
  },
  {
    name: 'Важный документ',
    extension: 'pdf',
    size: 14.5
  },
  {
    name: 'Обычный файл',
    extension: 'pdf',
    size: 14.5
  },
  {
    name: 'Инвестиционный комитет',
    extension: 'pdf',
    size: 14.5
  },
  {
    name: 'Комитет',
    extension: 'pdf',
    size: 14.5
  }
]

const statusVariantMap: Record<string, StatusMeta> = {
  IN_PROGRESS: {
    label: 'Идет голосование',
    colorVariant: 'success'
  },
  PUBLISHED: {
    label: 'Опубликованы итоги',
    colorVariant: 'info'
  },
  FINISH: {
    label: 'Голосование завершено',
    colorVariant: 'neutral'
  },
  ARCHIVE: {
    label: 'Архив',
    colorVariant: 'neutral'
  }
}

const columns: Array<TableColumnDef<Meeting, any>> = [
  {
    header: 'Наименование',
    id: 'name',
    accessorKey: 'name'
  },
  {
    header: 'Фонд',
    id: 'fond',
    accessorKey: 'fond'
  },
  {
    header: 'Дата окончания',
    id: 'endDate',
    accessorKey: 'endDate'
  },
  {
    header: 'Статус',
    id: 'status',
    accessorKey: 'status',
    cell: (rowData) => {
      const { colorVariant, label } = statusVariantMap[rowData.getValue()]

      return <Label variant={colorVariant}>{label}</Label>
    }
  }
]

const TABLE_DATA: Meeting[] = [
  {
    name: 'Работа с населением',
    fond: 'Альфа капитал',
    endDate: '14.09.2023',
    status: 'IN_PROGRESS'
  },
  {
    name: 'Расширение совета директоров',
    fond: 'Альфа капитал',
    endDate: '01.10.2022',
    status: 'FINISH'
  },
  {
    name: 'Расширение совета директоров',
    fond: 'Тинькофф капитал',
    endDate: '01.10.2022',
    status: 'PUBLISHED'
  },
  {
    name: 'Ознакомление с изменениями в законодательстве',
    fond: 'Альфа капитал',
    endDate: '01.10.2022',
    status: 'ARCHIVE'
  },
  {
    name: 'Финансовые итоги года',
    fond: 'Сбербанк',
    endDate: '14.09.2023',
    status: 'ARCHIVE'
  }
]

function filterMeetings(
  meetings: Meeting[],
  showArchive: boolean,
  searchQuery: string
): Meeting[] {
  const filterMeetings: Meeting[] = []

  meetings.forEach((meeting) => {
    let shouldPush
    let hasSearchQueryInNameOrFond
    const isArchive = meeting.status === 'ARCHIVE'

    if (!searchQuery) {
      hasSearchQueryInNameOrFond = true
    } else {
      const searchQueryInLowerCase = searchQuery.toLowerCase()
      hasSearchQueryInNameOrFond =
        meeting.name.toLowerCase().includes(searchQueryInLowerCase) ||
        meeting.fond.toLowerCase().includes(searchQueryInLowerCase)
    }

    if (showArchive) {
      shouldPush = isArchive && hasSearchQueryInNameOrFond
    } else {
      shouldPush = !isArchive && hasSearchQueryInNameOrFond
    }

    if (shouldPush) {
      filterMeetings.push(meeting)
    }
  })

  return filterMeetings
}
