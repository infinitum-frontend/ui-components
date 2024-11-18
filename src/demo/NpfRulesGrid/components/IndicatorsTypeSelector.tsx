import { ReactElement } from 'react'
import { Tabs } from 'Components/Tabs'
import { Space } from 'Components/Space'
import { Text } from 'Components/Text'

const IndicatorsTypeSelector = (): ReactElement => {
  return (
    <Tabs>
      <Tabs.List>
        <Tabs.Tab>
          <Space direction="horizontal" gap="xsmall">
            Все показатели
            <Text variant="subtitle-2" color="tertiary">
              589
            </Text>
          </Space>
        </Tabs.Tab>
        <Tabs.Tab>
          <Space direction="horizontal" gap="xsmall">
            Контроль структуры
            <Text variant="subtitle-2" color="tertiary">
              45
            </Text>
          </Space>
        </Tabs.Tab>
        <Tabs.Tab>
          <Space direction="horizontal" gap="xsmall">
            Контроль состава
            <Text variant="subtitle-2" color="tertiary">
              24
            </Text>
          </Space>
        </Tabs.Tab>
        <Tabs.Tab>
          <Space direction="horizontal" gap="xsmall">
            Иной контроль
            <Text variant="subtitle-2" color="tertiary">
              16
            </Text>
          </Space>
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  )
}

export default IndicatorsTypeSelector
