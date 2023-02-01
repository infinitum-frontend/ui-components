import { StoryFn, Meta } from '@storybook/react'
import { Tab } from './index'
import { Space } from '../Space'

const meta: Meta<typeof Tab> = {
  title: 'Tabs',
  component: Tab
}

export default meta

const Template: StoryFn<typeof Tab.Group> = (args) => {
  const handleChange = (value: number): void => {
    console.log(value)
  }

  return (
    <Tab.Group selectedIndex={1} onChange={handleChange} {...args}>
      <Tab.List>
        <Tab>Контроль структуры</Tab>
        <Tab>Статистический</Tab>
        <Tab>Состава по доле владения</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          2311. Имущество, составляющее фонд, может быть инвестировано в
          облигации юридических лиц
        </Tab.Panel>
        <Tab.Panel>
          4545. В отношении которых не зарегистрирован проспект ценных бумаг
        </Tab.Panel>
        <Tab.Panel>
          6263. Если более 20% размещенных акций указанных лиц составляют активы
          фонда
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}

export const Playground = Template.bind({})

export const AllVariants: StoryFn<typeof Tab.Group> = (args) => {
  return (
    <Space gap={'xlarge'}>
      <div>
        <code>default</code>
        <Tab.Group variant={'default'}>
          <Tab.List>
            <Tab>Контроль структуры</Tab>
            <Tab>Статистический</Tab>
            <Tab>Состава по доле владения</Tab>
          </Tab.List>
        </Tab.Group>
      </div>
      <div>
        <code>underline</code>
        <Tab.Group variant={'underline'}>
          <Tab.List>
            <Tab>Контроль структуры</Tab>
            <Tab>Статистический</Tab>
            <Tab>Состава по доле владения</Tab>
          </Tab.List>
        </Tab.Group>
      </div>
      <div>
        <code>uppercase</code>
        <Tab.Group variant={'uppercase'}>
          <Tab.List>
            <Tab>Контроль структуры</Tab>
            <Tab>Статистический</Tab>
            <Tab>Состава по доле владения</Tab>
          </Tab.List>
        </Tab.Group>
      </div>
    </Space>
  )
}

export const Disabled: StoryFn<typeof Tab.Group> = (args) => {
  return (
    <Space gap={'xlarge'}>
      <div>
        <code>default</code>
        <Tab.Group variant={'default'}>
          <Tab.List>
            <Tab disabled={true}>Контроль структуры</Tab>
            <Tab disabled={true}>Статистический</Tab>
          </Tab.List>
        </Tab.Group>
      </div>
      <div>
        <code>underline</code>
        <Tab.Group variant={'underline'}>
          <Tab.List>
            <Tab disabled={true}>Контроль структуры</Tab>
            <Tab disabled={true}>Статистический</Tab>
          </Tab.List>
        </Tab.Group>
      </div>
      <div>
        <code>uppercase</code>
        <Tab.Group variant={'uppercase'}>
          <Tab.List>
            <Tab disabled={true}>Контроль структуры</Tab>
            <Tab disabled={true}>Статистический</Tab>
          </Tab.List>
        </Tab.Group>
      </div>
    </Space>
  )
}

export const WithBadge: StoryFn<typeof Tab.Group> = (args) => {
  return (
    <Space gap={'xlarge'}>
      <Tab.Group variant={'default'}>
        <Tab.List>
          <Tab badge={8} disabled={true}>
            Контроль структуры
          </Tab>
          <Tab badge={'+2'} disabled={true}>
            Статистический
          </Tab>
          <Tab badge={'Важно!'}>Состава по доле владения</Tab>
        </Tab.List>
      </Tab.Group>
      <Tab.Group variant={'underline'}>
        <Tab.List>
          <Tab badge={8} disabled={true} type={'reset'}>
            Контроль структуры
          </Tab>
          <Tab badge={'+2'} disabled={true}>
            Статистический
          </Tab>
          <Tab badge={'Важно!'}>Состава по доле владения</Tab>
        </Tab.List>
      </Tab.Group>
      <Tab.Group variant={'uppercase'}>
        <Tab.List>
          <Tab badge={8} disabled={true}>
            Контроль структуры
          </Tab>
          <Tab badge={'+2'} disabled={true}>
            Статистический
          </Tab>
          <Tab badge={'Важно!'}>Состава по доле владения</Tab>
        </Tab.List>
      </Tab.Group>
    </Space>
  )
}
