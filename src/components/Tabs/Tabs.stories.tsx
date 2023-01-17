import { StoryFn, Meta } from '@storybook/react'
import { Tab } from './index'

const meta: Meta<typeof Tab> = {
  title: 'Tabs',
  component: Tab
}

export default meta

const Template: StoryFn<typeof Tab> = (args) => {
  const handleChange = (value: number): void => {
    console.log(value)
  }

  return (
    <Tab.Group selectedIndex={1} onChange={handleChange}>
      <Tab.List>
        <Tab badge={8}>Оповещения</Tab>
        <Tab>Настройки</Tab>
        <Tab>Еще какой-то таб</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>Content1</Tab.Panel>
        <Tab.Panel>Content2</Tab.Panel>
        <Tab.Panel>Content3</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}

export const Playground = Template.bind({})
