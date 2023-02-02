import { StoryFn, Meta } from '@storybook/react'
import { Collapse } from './index'
import Text from '../Text/Text'
import Button from '../Button/Button'
import { useState } from 'react'

const meta: Meta<typeof Collapse> = {
  title: 'Collapse',
  component: Collapse,
  args: {
    collapsed: true
  }
}

export default meta

const Template: StoryFn<typeof Collapse> = (args) => {
  const [collapsed, setCollapsed] = useState(args.collapsed)
  return (
    <>
      <Button onClick={() => setCollapsed((prev) => !prev)}>
        Предоставляемые услуги
      </Button>
      <Collapse {...args} collapsed={collapsed} style={{ marginTop: '12px' }}>
        <Text>Депозитарные услуги</Text>
        <Text>Спецдепозитарные услуги</Text>
        <Text>Консалтинг и аутсорсинг</Text>
      </Collapse>
    </>
  )
}
export const Playground = Template.bind({})
