import { ReactElement, useState } from 'react'
import { PageLayout } from 'Components/PageLayout'
import { Button } from 'Components/Button'
import { Text } from 'Components/Text'
import { Space } from 'Components/Space'
import AppHeader from './AppHeader'
import { ReactComponent as IconPlus } from 'Icons/plus.svg'
import IndicatorsTypeSelector from './IndicatorsTypeSelector'
import IndicatorsTable from './IndicatorsTable'
import { processIndicators } from '../helpers'
import { NPF_RULES_TABLE_DATA } from '../fixtures'
import {
  TableColumnFiltersState,
  TableSortingState
} from '~/src/components/Table'

const IndicatorsPage = (): ReactElement => {
  const [filtersState, setFiltersState] = useState<TableColumnFiltersState>([])
  const [sortingState, setSortingState] = useState<TableSortingState>([])

  const data = processIndicators({
    indicators: NPF_RULES_TABLE_DATA,
    filters: filtersState,
    sorting: sortingState
  })

  return (
    <PageLayout>
      <PageLayout.Header containerSize="xxlarge">
        <AppHeader />
      </PageLayout.Header>
      <PageLayout.Body containerSize="xxlarge">
        <PageLayout.Content paddingTop="large">
          <Space gap="medium">
            <Space direction="horizontal" justify="space-between">
              <Text variant="heading-3">Показатели контроля</Text>
              <Button variant="primary" size="small" after={<IconPlus />}>
                Добавить показатель
              </Button>
            </Space>

            <IndicatorsTypeSelector />

            <IndicatorsTable
              indicators={data}
              sorting={sortingState}
              onSortingChange={setSortingState}
              filters={filtersState}
              onFiltersChange={setFiltersState}
            />
          </Space>
        </PageLayout.Content>
      </PageLayout.Body>
    </PageLayout>
  )
}

export default IndicatorsPage
