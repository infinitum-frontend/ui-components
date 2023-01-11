import * as React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { InfSelect } from './index'
import { InfBox } from '../Box'
import { StandardizedListItem } from './interface'
import InfSelectExternal from './InfSelectExternal'
import InfSelectMpk from './InfSelectMpk'

const mockItems = [
  { text: 'Депозитарные услуги', value: 0, subtext: 'Дополнительный' },
  { text: 'Спецдепозитарные услуги', value: 1, subtext: 'Дополнительный текст' },
  { text: 'Консалтинг и аутсорсинг', value: 2, subtext: 'Дополнительный текст' }
]

const meta: Meta<typeof InfSelect> = {
  title: 'Select',
  component: InfSelect,
  args: {
    items: mockItems
  }
}

export default meta

const Template: StoryFn<typeof InfSelect> = (args) => {
  const handleSubmit: (item: StandardizedListItem<Record<string, any>>) => void = (item) => {
    console.log(item)
  }

  return (
    <InfBox style={{ width: '300px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <InfSelect {...args} onSubmit={handleSubmit} />
    </InfBox>
  )
}

export const Playground = Template.bind({})

export const AllVariants: StoryFn<typeof InfSelect> = (args) => {
  return (
    <InfBox style={{ width: '600px', height: '100px', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', padding: '12px' }}>
      <div>
        <code style={{ color: 'darkred' }}>split</code>
        <InfSelect {...args} variant={'split'} />
      </div>
      <div>
        <code style={{ color: 'darkred' }}>stuck</code>
        <InfSelect {...args} variant={'stuck'} />
      </div>
    </InfBox>
  )
}

export const AutoFocus = Template.bind({})
AutoFocus.args = {
  autoFocus: true
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true
}

export const FromHeadless: StoryFn<typeof InfSelectExternal> = (args) => {
  const [selected, setSelected] = useState<Record<string, any>>({ id: 2, name: 'Kenton Towne', unavailable: false })
  const people = [
    { id: 1, name: 'Durward Reynolds', unavailable: false },
    { id: 2, name: 'Kenton Towne', unavailable: false },
    { id: 3, name: 'Therese Wunsch', unavailable: false },
    { id: 4, name: 'Benedict Kessler', unavailable: true },
    { id: 5, name: 'Katelyn Rohan', unavailable: false }
  ]

  const handleChange = (val: Record<string, any>): void => {
    setSelected(val)
  }

  return (
    <InfSelectExternal
      style={{ width: '200px' }}
      items={people}
      selected={selected}
      onChange={handleChange}
      {...args}>
      <InfSelectExternal.Button>{selected.name}</InfSelectExternal.Button>
      <InfSelectExternal.Options className={'inf-select-external__options'}>
        {people.map((item) => (
          <InfSelectExternal.Option
            value={item}
            key={item.id}>
            { item.name}
          </InfSelectExternal.Option>
        ))}
      </InfSelectExternal.Options>
    </InfSelectExternal>
  )
}

export const FromMpk: StoryFn<typeof InfSelectMpk> = (args) => {
  const [selected, setSelected] = useState<string>('')
  const people = [
    { id: '1', value: 'Durward Reynolds' },
    { id: '2', value: 'Kenton Towne' },
    { id: '3', value: 'Therese Wunsch' },
    { id: '4', value: 'Benedict Kessler' },
    { id: '5', value: 'Katelyn Rohan' }
  ]

  const handleChange = (value: string): void => {
    setSelected(value)
  }
  return (
    <InfSelectMpk
      {...args}
      chosenId={selected}
      data={people}
      onChange={handleChange} />
  )
}
