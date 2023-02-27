import { StoryFn, Meta } from '@storybook/react'
import { Autocomplete } from './index'
import { useState } from 'react'

const meta: Meta<typeof Autocomplete> = {
  title: 'Autocomplete',
  component: Autocomplete
}

export default meta

const mockItems = [
  { label: 'Депозитарные услуги', value: 0 },
  { label: 'Спецдепозитарные услуги', value: 1 },
  { label: 'Консалтинг и аутсорсинг', value: 2 }
]

const Template: StoryFn<typeof Autocomplete> = (args) => {
  const [selectedItem, setSelectedItem] = useState<string | number>('')

  return (
    <Autocomplete
      onChange={(value) => setSelectedItem(value)}
      options={mockItems}
      selectedValue={selectedItem}
    />
  )
}

export const Playground = Template.bind({})
