import { StoryFn, Meta } from '@storybook/react'
import { Tabs } from './index'
import { Space } from '../Space'
import { useState } from 'react'

const meta: Meta<typeof Tabs> = {
  title: 'Tabs',
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
  const handleChange = (value: number): void => {
    console.log('handleChange', value)
  }

  return (
    <Tabs {...args} onChange={handleChange}>
      <Tabs.List>
        <Tabs.Tab>Контроль структуры</Tabs.Tab>
        <Tabs.Tab>Статистический</Tabs.Tab>
        <Tabs.Tab>Состава по доле владения</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
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

export const Playground = Template.bind({})

export const ManualActiveHandling: StoryFn<typeof Tabs> = (args) => {
  const [active, setActive] = useState(1)

  return (
    <Tabs onChange={(value) => setActive(value)}>
      <Tabs.List>
        <Tabs.Tab active={active === 0}>Контроль структуры</Tabs.Tab>
        <Tabs.Tab active={active === 1}>Статистический</Tabs.Tab>
        <Tabs.Tab active={active === 2}>Состава по доле владения</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  )
}

export const AllVariants: StoryFn<typeof Tabs> = (args) => {
  return (
    <Space gap={'xlarge'}>
      <div>
        <code>default</code>
        <Tabs variant={'default'}>
          <Tabs.List>
            <Tabs.Tab>Контроль структуры</Tabs.Tab>
            <Tabs.Tab>Статистический</Tabs.Tab>
            <Tabs.Tab>Состава по доле владения</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </div>
      <div>
        <code>underline</code>
        <Tabs variant={'underline'}>
          <Tabs.List>
            <Tabs.Tab>Контроль структуры</Tabs.Tab>
            <Tabs.Tab>Статистический</Tabs.Tab>
            <Tabs.Tab>Состава по доле владения</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </div>
      <div>
        <code>uppercase</code>
        <Tabs variant={'uppercase'}>
          <Tabs.List>
            <Tabs.Tab>Контроль структуры</Tabs.Tab>
            <Tabs.Tab>Статистический</Tabs.Tab>
            <Tabs.Tab>Состава по доле владения</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </div>
    </Space>
  )
}

export const Disabled: StoryFn<typeof Tabs> = (args) => {
  return (
    <Space gap={'xlarge'}>
      <div>
        <code>default</code>
        <Tabs variant={'default'}>
          <Tabs.List>
            <Tabs.Tab disabled={true}>Контроль структуры</Tabs.Tab>
            <Tabs.Tab disabled={true}>Статистический</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </div>
      <div>
        <code>underline</code>
        <Tabs variant={'underline'}>
          <Tabs.List>
            <Tabs.Tab disabled={true}>Контроль структуры</Tabs.Tab>
            <Tabs.Tab disabled={true}>Статистический</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </div>
      <div>
        <code>uppercase</code>
        <Tabs variant={'uppercase'}>
          <Tabs.List>
            <Tabs.Tab disabled={true}>Контроль структуры</Tabs.Tab>
            <Tabs.Tab disabled={true}>Статистический</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </div>
    </Space>
  )
}

export const WithBadge: StoryFn<typeof Tabs> = (args) => {
  return (
    <Space gap={'xlarge'}>
      <Tabs variant={'default'}>
        <Tabs.List>
          <Tabs.Tab badge={8} disabled={true}>
            Контроль структуры
          </Tabs.Tab>
          <Tabs.Tab badge={'+2'} disabled={true}>
            Статистический
          </Tabs.Tab>
          <Tabs.Tab badge={'Важно!'}>Состава по доле владения</Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <Tabs variant={'underline'}>
        <Tabs.List>
          <Tabs.Tab badge={8} disabled={true} type={'reset'}>
            Контроль структуры
          </Tabs.Tab>
          <Tabs.Tab badge={'+2'} disabled={true}>
            Статистический
          </Tabs.Tab>
          <Tabs.Tab badge={'Важно!'}>Состава по доле владения</Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <Tabs variant={'uppercase'}>
        <Tabs.List>
          <Tabs.Tab badge={8} disabled={true}>
            Контроль структуры
          </Tabs.Tab>
          <Tabs.Tab badge={'+2'} disabled={true}>
            Статистический
          </Tabs.Tab>
          <Tabs.Tab badge={'Важно!'}>Состава по доле владения</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </Space>
  )
}
