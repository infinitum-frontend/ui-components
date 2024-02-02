import { StoryObj, StoryFn, Meta } from '@storybook/react'
import { Tabs } from './index'
import { Space } from 'Components/Space'
import { useState } from 'react'
import { ReactComponent as DownloadIcon } from 'Icons/download.svg'
import { ReactComponent as FilterIcon } from 'Icons/filter.svg'
import { Badge } from '../Badge'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  subcomponents: {
    'Tabs.Tab': Tabs.Tab,
    'Tabs.List': Tabs.List,
    'Tabs.Panels': Tabs.Panels,
    'Tabs.Panel': Tabs.Panel
  }
}

export default meta

const Template: StoryFn<typeof Tabs> = (args) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const handleChange = (index: number): void => {
    setSelectedIndex(index)
  }

  return (
    <Tabs {...args} selectedIndex={selectedIndex} onChange={handleChange}>
      <Tabs.List>
        <Tabs.Tab>Контроль структуры</Tabs.Tab>
        <Tabs.Tab>Статистический</Tabs.Tab>
        <Tabs.Tab disabled>Состава по доле владения</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels style={{ padding: '16px 8px' }}>
        <Tabs.Panel>
          2311. Имущество, составляющее фонд, может быть инвестировано в
          облигации юридических лиц
        </Tabs.Panel>
        <Tabs.Panel>
          4545. В отношении которых не зарегистрирован проспект ценных бумаг
        </Tabs.Panel>
        <Tabs.Panel>
          6263. Если более 20% размещенных акций указанных лиц составляют активы
          фонда
        </Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  )
}

export const Playground = {
  render: Template
}

export const ManualActiveHandling: StoryObj<typeof Tabs> = {
  render: (args) => {
    const [active, setActive] = useState(1)

    return (
      <Tabs {...args} onChange={(value) => setActive(value)}>
        <Tabs.List>
          <Tabs.Tab active={active === 0}>Контроль структуры</Tabs.Tab>
          <Tabs.Tab active={active === 1}>Статистический</Tabs.Tab>
          <Tabs.Tab active={active === 2}>Состава по доле владения</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    )
  }
}

export const WithBadge: StoryObj<typeof Tabs> = {
  render: (args) => {
    return (
      <Tabs {...args}>
        <Tabs.List>
          <Tabs.Tab>Контроль структуры {<Badge count={8} />}</Tabs.Tab>
          <Tabs.Tab>
            Состава по доле владения {<Badge count="Важно" />}
          </Tabs.Tab>
          <Tabs.Tab disabled>
            Статистический <Badge count="+2" />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
    )
  }
}

export const WithIcon: StoryObj<typeof Tabs> = {
  render: (args) => {
    return (
      <Tabs {...args}>
        <Tabs.List>
          <Tabs.Tab icon={<FilterIcon />}>Контроль структуры</Tabs.Tab>
          <Tabs.Tab icon={<DownloadIcon />}>Состава по доле владения</Tabs.Tab>
          <Tabs.Tab disabled>Статистический</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    )
  }
}

export const IconOnly: StoryObj<typeof Tabs> = {
  render: (args) => {
    return (
      <Tabs {...args}>
        <Tabs.List>
          <Tabs.Tab icon={<FilterIcon />} />
          <Tabs.Tab icon={<DownloadIcon />} />
          <Tabs.Tab icon={<DownloadIcon />} disabled />
        </Tabs.List>
      </Tabs>
    )
  }
}

export const Sizes: StoryObj<typeof Tabs> = {
  render: (args) => {
    return (
      <Space>
        <Tabs size="medium">
          <Tabs.List>
            <Tabs.Tab>Контроль структуры</Tabs.Tab>
            <Tabs.Tab>Статистический</Tabs.Tab>
            <Tabs.Tab disabled>Состава по доле владения</Tabs.Tab>
          </Tabs.List>
        </Tabs>
        <Tabs size="small">
          <Tabs.List>
            <Tabs.Tab>Контроль структуры</Tabs.Tab>
            <Tabs.Tab>Статистический</Tabs.Tab>
            <Tabs.Tab disabled>Состава по доле владения</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </Space>
    )
  }
}
