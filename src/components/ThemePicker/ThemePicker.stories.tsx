// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react'
import { StoryObj, Meta } from '@storybook/react'
import { PageLayout } from '../PageLayout'
import { Space } from '../Space'
import { HeaderNav } from '../HeaderNav'
import { Logo } from '../Logo'
import { Text } from '../Text'
import { Tabs } from '../Tabs'
import { Input } from '../Input'
import { Box } from '../Box'
import { Label, LabelProps } from '../Label'
import { InfinitumUIProvider } from '../InfinitumUIProvider'
import { Table, TableColumnDef, TableSortingState } from '../Table'
import SearchIcon from 'Icons/search.svg?react'
import ThemePicker from './ThemePicker'

const ComponentMeta: Meta = {
  title: 'Components/ThemePicker',
  component: ThemePicker,
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
      <InfinitumUIProvider>
        <PageLayout>
          <PageLayout.Header containerWidth="medium">
            <Space direction="horizontal" align="center" gap="xxlarge">
              <Logo prefix="ЛКИ" />
              <HeaderNav style={{ flex: 1 }}>
                <HeaderNav.Item>Инвесторы</HeaderNav.Item>
                <HeaderNav.Item active>Собрания</HeaderNav.Item>
              </HeaderNav>
              <ThemePicker />
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
      </InfinitumUIProvider>
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
