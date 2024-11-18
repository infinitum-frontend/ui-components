import { ReactElement } from 'react'
import { PageLayout } from 'Components/PageLayout'
import { Button } from 'Components/Button'
import { Text } from 'Components/Text'
import { Space } from 'Components/Space'
import AppHeader from './AppHeader'
import { ReactComponent as IconPlus } from 'Icons/plus.svg'
import IndicatorsTypeSelector from './IndicatorsTypeSelector'
import IndicatorsTable from './IndicatorsTable'

const IndicatorsPage = (): ReactElement => {
  return (
    <PageLayout>
      <PageLayout.Header>
        <AppHeader />
      </PageLayout.Header>
      <PageLayout.Body>
        <PageLayout.Content paddingTop="large">
          <Space gap="large">
            <Space direction="horizontal" justify="space-between">
              <Text variant="heading-3">Показатели контроля</Text>
              <Button variant="primary" size="small" after={<IconPlus />}>
                Добавить показатель
              </Button>
            </Space>

            <IndicatorsTypeSelector />

            <IndicatorsTable />
          </Space>
        </PageLayout.Content>
      </PageLayout.Body>
    </PageLayout>
  )
}

export default IndicatorsPage
